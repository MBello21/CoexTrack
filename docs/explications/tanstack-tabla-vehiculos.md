# Explicación completa: Tabla de Vehículos con TanStack Table (v9)

Este documento explica **línea por línea y por conceptos** cómo funciona la tabla de vehículos
implementada con [TanStack Table](https://tanstack.com/table). El objetivo es que puedas entender
qué hace cada parte del código y por qué está escrito así, para poder mantenerlo sin depender del
"vibe coding".

Archivos involucrados:

| Archivo | Rol |
|---------|-----|
| `src/features/vehicles/hooks/useVehiclesTable.tsx` | **El cerebro**. Toda la lógica de la tabla (columnas, estado, filtros, orden, paginación). |
| `src/features/vehicles/VehiclesPage.tsx` | **La vista**. Renderiza el HTML de la tabla usando lo que expone el hook. |
| `src/features/vehicles/components/VehiclesToolbar.tsx` | Barra superior (tabs, buscador, select, contador). |
| `src/features/vehicles/types/table.types.ts` | Tipos auxiliares (`VehicleFilterStatus`, etc.). |

---

## 1. La idea general de TanStack Table

Lo más importante que hay que entender: **TanStack Table es "headless"** (sin cabeza).

Esto significa que la librería **NO pinta nada en pantalla**. No trae `<table>`, ni estilos, ni HTML.
Lo único que hace es:

1. Recibir tus **datos** (`data`) y la **definición de columnas** (`columns`).
2. Recibir el **estado** de la tabla (qué está ordenado, filtrado, qué página, etc.).
3. Devolverte un objeto `table` con **funciones y datos ya calculados** (filas ya filtradas, ya
   ordenadas, ya paginadas).

Tú te encargas de dibujar el HTML (`<table>`, `<tr>`, `<td>`...) usando esa información. Por eso
todo el JSX de la tabla vive en `VehiclesPage.tsx` y toda la lógica vive en el hook.

> **Analogía:** TanStack es como una calculadora. Tú le das los números y la operación, ella te da
> el resultado. Pero cómo lo muestras en pantalla (color, tamaño, formato) es cosa tuya.

---

## 2. El hook `useVehiclesTable` (el cerebro)

### 2.1 Declaración de *features* (novedad de la v9)

```ts
const features = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  rowSelectionFeature,
  rowPaginationFeature,
  columnVisibilityFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    basic: sortFn_basic,
  },
});
```

En la **versión 9** de TanStack Table cambió la forma de activar funcionalidades. Antes (v8) todo
venía activado y solo pasabas los "row models" como opciones. Ahora tienes que **declarar
explícitamente qué features quieres**. Esto hace que el bundle final sea más pequeño (solo cargas lo
que usas).

Cada `xxxFeature` activa una capacidad:

- `rowSortingFeature` → poder ordenar filas.
- `columnFilteringFeature` → filtros por columna (ej: filtrar por estado).
- `globalFilteringFeature` → un buscador global que aplica a toda la tabla.
- `rowSelectionFeature` → checkboxes para seleccionar filas.
- `rowPaginationFeature` → paginación.
- `columnVisibilityFeature` → ocultar/mostrar columnas.

Los **row models** (`createSortedRowModel`, etc.) son los "motores" que hacen el cálculo real:

- `createSortedRowModel()` → sabe **cómo** ordenar.
- `createFilteredRowModel()` → sabe **cómo** filtrar.
- `createPaginatedRowModel()` → sabe **cómo** cortar la lista en páginas.

Y `sortFns` son las funciones de comparación disponibles para ordenar (alfanumérica, texto, básica).

> **Clave:** activar el *feature* (`rowSortingFeature`) es dar el permiso; el *row model*
> (`createSortedRowModel`) es la maquinaria que ejecuta el trabajo. En la v9 necesitas ambos.

```ts
type Features = typeof features;
const columnHelper = createColumnHelper<Features, Vehicle>();
```

- `Features` es el "tipo" de la configuración que armaste arriba (TypeScript).
- `createColumnHelper<Features, Vehicle>()` crea un **ayudante tipado** para definir columnas de
  objetos `Vehicle`. Gracias a él, cuando escribas `columnHelper.accessor('device_id', ...)`,
  TypeScript sabe que `device_id` existe en `Vehicle` y te autocompleta / avisa de errores.

### 2.2 Funciones de filtrado personalizadas

```ts
const isRetired = (status: Vehicle['status']) =>
  status === 'no_signal' || status === 'ignition_off';
```

Regla de negocio: un vehículo está **"retirado"** si no tiene señal o el motor está apagado.
Cualquier otro estado se considera **"activo"**. Se extrae a una función para no repetir la lógica.

```ts
const statusFilterFn: FilterFn<Features, Vehicle> = (row, _columnId, filterValue) => {
  const value = filterValue as VehicleFilterStatus;
  if (!value || value === 'all') return true;
  return value === 'retired' ? isRetired(row.original.status) : !isRetired(row.original.status);
};
```

Este es un **filtro de columna** personalizado. TanStack lo llama por **cada fila** y espera un
`true` (la fila se muestra) o `false` (se oculta):

- `row` → la fila actual. `row.original` es el objeto `Vehicle` real.
- `_columnId` → el id de la columna (no se usa, por eso el guion bajo).
- `filterValue` → el valor que estamos filtrando (`'all'`, `'active'` o `'retired'`).

Lógica: si es `'all'` o no hay valor → muestra todo. Si es `'retired'` → solo retirados. Si es
`'active'` → todo lo que **no** sea retirado.

```ts
const searchFilterFn: FilterFn<Features, Vehicle> = (row, _columnId, filterValue) => {
  const query = String(filterValue ?? '').trim().toLowerCase();
  if (!query) return true;
  const { device_id, plate } = row.original;
  return (
    device_id.toLowerCase().includes(query) ||
    (plate?.toLowerCase().includes(query) ?? false)
  );
};
```

Este es el **filtro global** (el buscador). Se aplica a toda la tabla y busca coincidencias en el
código (`device_id`) **o** en la matrícula (`plate`). Normaliza a minúsculas para que la búsqueda no
distinga mayúsculas. Si no hay texto escrito, devuelve `true` (no filtra nada).

### 2.3 El estado de la tabla (React `useState`)

```ts
const [sorting, setSorting] = useState<SortingState>([]);
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
const [globalFilter, setGlobalFilter] = useState('');
const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({});
const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 8 });
```

Aquí está lo que se llama **"controlled state"** (estado controlado). TanStack **no guarda** su
propio estado internamente aquí; **tú** lo guardas en React con `useState` y se lo pasas. Ventajas:
puedes leerlo, modificarlo y reaccionar a él desde cualquier parte del componente.

Cada pieza de estado:

| Estado | Qué guarda |
|--------|-----------|
| `sorting` | Por qué columna y en qué dirección se está ordenando. |
| `columnFilters` | Filtros activos por columna (ej: `[{ id: 'status', value: 'active' }]`). |
| `globalFilter` | El texto del buscador. |
| `columnVisibility` | Qué columnas están ocultas/visibles. |
| `rowSelection` | Qué filas están seleccionadas (checkboxes). |
| `pagination` | Página actual (`pageIndex`) y cuántas filas por página (`pageSize: 8`). |

### 2.4 Definición de columnas

```ts
const columns = useMemo(
  () => columnHelper.columns([ ... ]),
  []
);
```

`useMemo` con `[]` (dependencias vacías) asegura que las columnas se creen **una sola vez** y no en
cada render. Esto es importante para el rendimiento: si las columnas se recrearan en cada render,
TanStack pensaría que son "nuevas" y recalcularía todo.

Hay **dos tipos** de columnas:

**a) `columnHelper.display(...)`** → columnas que **no** vienen de un dato del vehículo. Son "de
adorno" o interactivas. Necesitan un `id` propio.

```ts
columnHelper.display({
  id: 'select',
  header: ({ table }) => ( /* checkbox de "seleccionar todo" */ ),
  cell: ({ row }) => ( /* checkbox de la fila */ ),
  enableHiding: false,
}),
```

- La columna `select` (checkboxes). El `header` pinta el checkbox de "seleccionar toda la página" y
  cada `cell` pinta el checkbox de su fila.
  - `table.getIsAllPageRowsSelected()` → ¿están todas seleccionadas?
  - `table.getIsSomePageRowsSelected()` → ¿hay algunas? (se usa para el estado *indeterminate*, ese
    guioncito del checkbox a medias).
  - `enableHiding: false` → esta columna no se puede ocultar desde el gestor de columnas.
- Las columnas `groups` y `geofences` son placeholders que devuelven texto fijo (`'1'`,
  `'Geofences'`). Todavía no tienen datos reales.

**b) `columnHelper.accessor('campo', ...)`** → columnas que **sí** leen un dato del vehículo.

```ts
columnHelper.accessor('speed', {
  id: 'speed',
  header: 'Velocidad',
  cell: (info) => `${info.getValue() ?? 0} km/h`,
}),
```

- El primer argumento (`'speed'`) es el campo del objeto `Vehicle` de donde saca el valor.
- `header` es el texto de la cabecera.
- `cell` (opcional) personaliza cómo se muestra el valor. `info.getValue()` devuelve el dato crudo;
  aquí se le añade `" km/h"`. Si no defines `cell`, muestra el valor tal cual.
- El `?? '-'` o `?? 0` son valores por defecto cuando el dato viene `null`/`undefined`.

La columna `status` es especial porque lleva `filterFn: statusFilterFn` → le dice a TanStack que use
tu función personalizada para filtrar esta columna.

### 2.5 Creación de la tabla con `useTable`

```ts
const table = useTable({
  features,
  columns,
  data: vehicles,
  state: { sorting, columnFilters, globalFilter, columnVisibility, rowSelection, pagination },
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  onGlobalFilterChange: setGlobalFilter,
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  onPaginationChange: setPagination,
  globalFilterFn: searchFilterFn,
  enableRowSelection: true,
});
```

Aquí se conecta todo. Este es el corazón del hook:

- `features`, `columns`, `data` → lo que definimos antes.
- `state: { ... }` → le pasamos **nuestro** estado de React. TanStack lo lee para saber cómo
  presentar los datos.
- `onXxxChange: setXxx` → **el patrón clave del estado controlado**. Cuando el usuario hace algo
  (clic en ordenar, escribe en el buscador, cambia de página), TanStack **no** modifica nada por su
  cuenta: en su lugar **llama a tu función** `setXxx` con el nuevo valor. Esa función actualiza el
  `useState`, React re-renderiza, y TanStack recibe el estado nuevo. Es un círculo:

  ```
  Usuario hace clic → TanStack llama onSortingChange(nuevoValor)
                    → setSorting actualiza el useState
                    → React re-renderiza
                    → useTable recibe el nuevo `sorting`
                    → recalcula las filas ordenadas
  ```

- `globalFilterFn: searchFilterFn` → qué función usar para el buscador global.
- `enableRowSelection: true` → permite seleccionar filas.

### 2.6 Valores derivados y API que se expone

```ts
const filterStatus =
  (columnFilters.find((f) => f.id === 'status')?.value as VehicleFilterStatus) ?? 'all';
```

En vez de guardar el filtro de estado en un `useState` aparte (lo que duplicaría información),
se **deriva** del estado `columnFilters` de TanStack. Busca el filtro cuyo `id` sea `'status'` y
toma su valor; si no existe, es `'all'`. **Una sola fuente de verdad.**

```ts
const setFilterStatus = (status: VehicleFilterStatus) => {
  setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  setColumnFilters(status === 'all' ? [] : [{ id: 'status', value: status }]);
};
```

Cuando cambias el filtro de estado:
1. Vuelve a la **página 1** (`pageIndex: 0`). Si no, podrías quedar en una página que ya no existe
   tras filtrar.
2. Si es `'all'`, quita el filtro (`[]`); si no, pone el filtro sobre la columna `status`.

```ts
const setSearchQuery = (query: string) => {
  setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  setGlobalFilter(query);
};
```

Igual con el buscador: al escribir, resetea a la página 1 y actualiza el filtro global.

```ts
const selectedRows = useMemo(() => {
  const selected = new Set<string>();
  table.getSelectedRowModel().rows.forEach((row) => {
    selected.add(row.original.device_id);
  });
  return selected;
}, [table, rowSelection]);
```

Construye un `Set` con los `device_id` de las filas seleccionadas. `getSelectedRowModel()` te da solo
las filas marcadas. Depende de `rowSelection` para recalcularse cuando cambia la selección.

```ts
const filteredCount = table.getFilteredRowModel().rows.length;
```

Cuántas filas quedan **después de filtrar** (pero antes de paginar). Sirve para el contador y para
los rangos de paginación.

```ts
const toggleColumnVisibility = (columnId: string) => {
  table.getColumn(columnId)?.toggleVisibility();
};
```

Muestra/oculta una columna concreta. El `?.` es por si la columna no existe.

Finalmente el hook **devuelve** una API limpia y simple (`table`, `filterStatus`, `setFilterStatus`,
`searchQuery`, `setSearchQuery`, etc.), de modo que la página y el toolbar no necesitan conocer los
detalles internos de TanStack.

---

## 3. La vista `VehiclesPage.tsx`

```tsx
const vehicles = useVehicleContext();
const { table, filterStatus, setFilterStatus, ... } = useVehiclesTable(vehicles);
```

La página obtiene los vehículos del contexto y se los pasa al hook. Todo lo que necesita para pintar
viene de ese hook.

```tsx
const { pageIndex, pageSize } = table.state.pagination;
const rows = table.getRowModel().rows;
const leafColumns = table.getAllLeafColumns();
const rangeStart = filteredCount === 0 ? 0 : pageIndex * pageSize + 1;
const rangeEnd = Math.min((pageIndex + 1) * pageSize, filteredCount);
```

- `table.getRowModel().rows` → **las filas ya listas para pintar** (filtradas, ordenadas y
  paginadas). Es lo que recorres en el `<tbody>`.
- `getAllLeafColumns()` → todas las columnas finales (se usa para el `colSpan` cuando no hay datos).
- `rangeStart` / `rangeEnd` → calculan el texto tipo "1-8 de 24". `rangeEnd` usa `Math.min` para que
  la última página no muestre un número mayor que el total.

### 3.1 Cabeceras (`<thead>`)

```tsx
{table.getHeaderGroups().map((headerGroup) => (
  <tr key={headerGroup.id}>
    {headerGroup.headers.map((header) => {
      const canSort = header.column.getCanSort();
      const sorted = header.column.getIsSorted();
      ...
```

- `getHeaderGroups()` → devuelve las filas de cabecera (normalmente una; podría haber varias si
  hubiera columnas agrupadas).
- `getCanSort()` → ¿esta columna se puede ordenar?
- `getIsSorted()` → devuelve `'asc'`, `'desc'` o `false` según el orden actual.

```tsx
<div onClick={header.column.getToggleSortingHandler()}>
  {flexRender(header.column.columnDef.header, header.getContext())}
  {canSort && ( sorted === 'asc' ? <ChevronUp/> : sorted === 'desc' ? <ChevronDown/> : <ChevronsUpDown/> )}
</div>
```

- `getToggleSortingHandler()` → devuelve la función que cambia el orden al hacer clic (asc → desc →
  sin orden). No tienes que escribir tú la lógica.
- `flexRender(...)` → **función clave**. Renderiza el contenido de la cabecera/celda, tanto si es un
  string (`'Velocidad'`) como si es un componente JSX (el checkbox). Es la forma segura de pintar lo
  que definiste en `header`/`cell` de las columnas.
- Los iconos (`ChevronUp`/`Down`/`ChevronsUpDown`) muestran visualmente la dirección del orden.
- `header.isPlaceholder` → si es un hueco de cabecera vacío, no pinta nada.

### 3.2 Cuerpo (`<tbody>`)

```tsx
{rows.length > 0 ? (
  rows.map((row) => {
    const vehicle = row.original;
    return (
      <tr key={row.id} ...>
        {row.getVisibleCells().map((cell) => { ... })}
      </tr>
    );
  })
) : (
  <tr><td colSpan={leafColumns.length}>No hay vehículos disponibles</td></tr>
)}
```

- Si hay filas, las recorre; si no, muestra un mensaje que ocupa todas las columnas (`colSpan`).
- `row.original` → el objeto `Vehicle` real de esa fila.
- `row.getVisibleCells()` → solo las celdas de las columnas **visibles** (respeta el ocultar
  columnas).

Dentro de cada celda hay renderizado personalizado por columna:

```tsx
if (cell.column.id === 'device_id') { /* icono + código */ }
if (cell.column.id === 'status')    { /* <BadgeStatus/> */ }
return <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
```

- Para `device_id` pinta el `VehicleIcon` + el código.
- Para `status` pinta un `BadgeStatus` (etiqueta de color).
- Para el resto, usa `flexRender` con la definición `cell` de la columna (el caso genérico).

> **Nota de estilo:** este renderizado condicional por `id` funciona, pero una alternativa más
> "idiomática" sería mover ese JSX al `cell:` de cada columna en el hook. Así toda la definición de
> una columna vive en un solo sitio. No es un error, es una decisión de dónde poner el código.

### 3.3 Paginación (pie de tabla)

```tsx
<span>{`${rangeStart}-${rangeEnd} de ${filteredCount}`}</span>
...
<button onClick={() => table.firstPage()}    disabled={!table.getCanPreviousPage()}>...</button>
<button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>...</button>
<button onClick={() => table.nextPage()}     disabled={!table.getCanNextPage()}>...</button>
<button onClick={() => table.lastPage()}      disabled={!table.getCanNextPage()}>...</button>
```

TanStack ya te da todas las funciones de navegación hechas:

- `firstPage()`, `previousPage()`, `nextPage()`, `lastPage()` → mueven de página.
- `getCanPreviousPage()` / `getCanNextPage()` → devuelven `false` cuando ya estás en el primer/último
  extremo, y así los botones se **deshabilitan** solos (`disabled`).

No tienes que calcular índices ni límites a mano: la librería lo gestiona a partir del estado
`pagination` y del total de filas filtradas.

---

## 4. El `VehiclesToolbar` (barra superior)

El toolbar es un componente "tonto" (presentacional): recibe todo por props y solo dispara callbacks.

- Los tabs **Todos / Activos / Retirados** y el `<select>` llaman a `onFilterStatusChange`, que es el
  `setFilterStatus` del hook.
- El `<input>` de búsqueda llama a `onSearchChange` → `setSearchQuery`.
- Muestra `filteredCount` (total filtrado) y `selectedCount` (seleccionados).
- El `ColumnManager` usa `columnVisibility` + `onToggleColumn` para mostrar/ocultar columnas.

Toda su "inteligencia" vive en el hook; el toolbar solo pinta y avisa.

---

## 5. Resumen del flujo completo

```
                 ┌────────────────────────────────────────────┐
                 │            useVehiclesTable (hook)           │
                 │  - useState: sorting, filters, pagination…   │
                 │  - columns (useMemo)                         │
                 │  - useTable({ features, columns, data, ... })│
                 └────────────────────────────────────────────┘
                        ▲                          │
        callbacks       │                          │  expone { table, setFilterStatus… }
   (setFilterStatus,    │                          ▼
    setSearchQuery)     │            ┌──────────────────────────┐
                        │            │      VehiclesPage         │
                 ┌──────┴──────┐     │  - <thead> getHeaderGroups│
                 │  Toolbar    │◀────│  - <tbody> getRowModel    │
                 │ (tabs,      │     │  - paginación firstPage…  │
                 │  buscador)  │     └──────────────────────────┘
                 └─────────────┘
```

**En una frase:** el hook centraliza el estado y le pide a TanStack que calcule las filas ya
filtradas/ordenadas/paginadas; la página solo dibuja ese resultado y el toolbar solo dispara cambios
de estado.

---

## 6. Ejemplos y "capturas" del funcionamiento

Esta sección usa datos de ejemplo para que veas **exactamente** qué pasa dentro de la tabla en cada
acción. No son capturas reales de pantalla, sino representaciones (mockups) del resultado.

### 6.1 Datos de ejemplo

Supongamos que `useVehicleContext()` devuelve estos 5 vehículos (campos recortados a lo relevante):

```ts
const vehicles: Vehicle[] = [
  { device_id: 'GPS-001', plate: 'ABC-123', status: 'in_transit',   speed: 62,  engine_type: 'diesel',   last_address: 'Av. Reforma 100' },
  { device_id: 'GPS-002', plate: 'XYZ-987', status: 'ignition_off', speed: 0,   engine_type: 'gasolina', last_address: 'Calle 5 de Mayo' },
  { device_id: 'GPS-003', plate: null,      status: 'operating',    speed: 15,  engine_type: 'electrico',last_address: 'Blvd. Norte 42' },
  { device_id: 'GPS-004', plate: 'JKL-456', status: 'no_signal',    speed: 0,   engine_type: null,       last_address: 'Sin datos' },
  { device_id: 'GPS-005', plate: 'MNO-321', status: 'stationary',   speed: 0,   engine_type: 'diesel',   last_address: 'Parque Industrial' },
];
```

Según la regla `isRetired` (`no_signal` o `ignition_off` = retirado):

| device_id | status | ¿Retirado? |
|-----------|--------|:----------:|
| GPS-001 | in_transit | ❌ activo |
| GPS-002 | ignition_off | ✅ retirado |
| GPS-003 | operating | ❌ activo |
| GPS-004 | no_signal | ✅ retirado |
| GPS-005 | stationary | ❌ activo |

### 6.2 Captura: estado inicial (tab "Todos", sin filtros)

Con `pageSize: 8` y solo 5 vehículos, caben todos en una página:

```
┌────┬──────────┬───────────┬────────┬──────────────┬───────────┬───────────┬──────────────────────┐
│ ☐  │ CÓDIGO ⇅ │ MATRÍCULA │ GRUPOS │ ESTADO ⇅     │ TIPO MOTOR│ VELOCIDAD │ LOCALIZACIÓN         │
├────┼──────────┼───────────┼────────┼──────────────┼───────────┼───────────┼──────────────────────┤
│ ☐  │ 🚚 GPS-001│ ABC-123   │   1    │ [En tránsito]│ diesel    │ 62 km/h   │ Av. Reforma 100      │
│ ☐  │ 🚚 GPS-002│ XYZ-987   │   1    │ [Apagado]    │ gasolina  │ 0 km/h    │ Calle 5 de Mayo      │
│ ☐  │ 🚚 GPS-003│ -         │   1    │ [Operando]   │ electrico │ 15 km/h   │ Blvd. Norte 42       │
│ ☐  │ 🚚 GPS-004│ JKL-456   │   1    │ [Sin señal]  │ -         │ 0 km/h    │ Sin datos            │
│ ☐  │ 🚚 GPS-005│ MNO-321   │   1    │ [Detenido]   │ diesel    │ 0 km/h    │ Parque Industrial    │
└────┴──────────┴───────────┴────────┴──────────────┴───────────┴───────────┴──────────────────────┘
                                                                        1-5 de 5   |◀ ◀ ▶ ▶|
```

- Fíjate en `GPS-003`: su `plate` es `null`, por eso la celda muestra `-` (gracias a
  `info.getValue() ?? '-'`).
- `GPS-004` tiene `engine_type: null` → también muestra `-`.
- La velocidad siempre lleva `" km/h"` porque la columna lo formatea en su `cell`.
- Los botones `|◀ ◀` están **deshabilitados** (`getCanPreviousPage()` es `false`, estamos en la
  primera página) y `▶ ▶|` también (solo hay una página).

### 6.3 Captura: tab "Retirados"

Al pulsar **Retirados**, el toolbar llama a `setFilterStatus('retired')`, que ejecuta:

```ts
setPagination((prev) => ({ ...prev, pageIndex: 0 }));      // vuelve a la página 1
setColumnFilters([{ id: 'status', value: 'retired' }]);   // aplica el filtro
```

`statusFilterFn` deja pasar solo las filas donde `isRetired(...) === true`:

```
   Tabs:  [ Todos ]  [ Activos ]  [ RETIRADOS ]   ← subrayado azul
┌────┬──────────┬───────────┬────────┬─────────────┬───────────┬───────────┬──────────────────────┐
│ ☐  │ 🚚 GPS-002│ XYZ-987   │   1    │ [Apagado]   │ gasolina  │ 0 km/h    │ Calle 5 de Mayo      │
│ ☐  │ 🚚 GPS-004│ JKL-456   │   1    │ [Sin señal] │ -         │ 0 km/h    │ Sin datos            │
└────┴──────────┴───────────┴────────┴─────────────┴───────────┴───────────┴──────────────────────┘
                                                                        1-2 de 5   |◀ ◀ ▶ ▶|
```

- `filteredCount` ahora es **2**, pero el total sigue siendo 5. El contador dice `1-2 de 5`.
- El estado `columnFilters` vale `[{ id: 'status', value: 'retired' }]`, y `filterStatus` (derivado)
  vale `'retired'`, por eso el tab aparece resaltado.

### 6.4 Captura: buscador escribiendo "abc"

Al teclear en el buscador se llama a `setSearchQuery('abc')` → resetea página y hace
`setGlobalFilter('abc')`. La función `searchFilterFn` busca "abc" en `device_id` **o** en `plate`:

```
   Buscar: [ abc                    ]
┌────┬──────────┬───────────┬────────┬──────────────┬───────────┬───────────┬──────────────────────┐
│ ☐  │ 🚚 GPS-001│ ABC-123   │   1    │ [En tránsito]│ diesel    │ 62 km/h   │ Av. Reforma 100      │
└────┴──────────┴───────────┴────────┴──────────────┴───────────┴───────────┴──────────────────────┘
                                                                        1-1 de 5   |◀ ◀ ▶ ▶|
```

- Solo coincide `GPS-001` porque su matrícula `ABC-123` contiene "abc" (recuerda: se comparó en
  minúsculas con `.toLowerCase()`).

### 6.5 Captura: ordenar por Velocidad (clic en la cabecera)

Al hacer clic en **VELOCIDAD**, `getToggleSortingHandler()` cambia `sorting` a
`[{ id: 'speed', desc: false }]` (ascendente). `createSortedRowModel()` reordena las filas:

```
                                              VELOCIDAD ▲   ← icono ChevronUp = ascendente
┌────┬──────────┬───────────┬── … ──┬───────────┐
│ ☐  │ 🚚 GPS-002│ XYZ-987   │  …    │ 0 km/h    │
│ ☐  │ 🚚 GPS-004│ JKL-456   │  …    │ 0 km/h    │
│ ☐  │ 🚚 GPS-005│ MNO-321   │  …    │ 0 km/h    │
│ ☐  │ 🚚 GPS-003│ -         │  …    │ 15 km/h   │
│ ☐  │ 🚚 GPS-001│ ABC-123   │  …    │ 62 km/h   │
└────┴──────────┴───────────┴── … ──┴───────────┘
```

Un segundo clic → `desc: true` (icono ▼, de mayor a menor). Un tercer clic → sin orden (icono ⇅ tenue,
`ChevronsUpDown`). Ese ciclo asc → desc → ninguno lo gestiona TanStack solo.

### 6.6 Captura: selección de filas

Al marcar el checkbox de la cabecera, `getToggleAllPageRowsSelectedHandler()` selecciona todas las
filas de la página. `rowSelection` pasa a `{ '0': true, '1': true, ... }` y `selectedRows` se
recalcula al `Set` de sus `device_id`:

```
┌────┬──────────┬── … ──┐
│ ☑  │ 🚚 GPS-001│  …    │   selectedRows = Set {
│ ☑  │ 🚚 GPS-002│  …    │     'GPS-001', 'GPS-002',
│ ☑  │ 🚚 GPS-003│  …    │     'GPS-003', 'GPS-004',
│ ☑  │ 🚚 GPS-004│  …    │     'GPS-005'
│ ☑  │ 🚚 GPS-005│  …    │   }   → selectedCount = 5
└────┴──────────┴── … ──┘
```

Si marcas solo algunas, el checkbox de la cabecera muestra el estado *indeterminate* (un guion `–`)
gracias a `getIsSomePageRowsSelected()`. Con filas seleccionadas, el botón "Share Vehicle location"
del toolbar se **habilita** (antes estaba `disabled` porque `selectedCount === 0`).

### 6.7 Ejemplo de paginación con más datos

Si en vez de 5 hubiera **20** vehículos, con `pageSize: 8` habría 3 páginas:

| Página (`pageIndex`) | Filas mostradas | Contador | `getCanPreviousPage` | `getCanNextPage` |
|:--:|:--:|:--:|:--:|:--:|
| 0 | 1–8 | `1-8 de 20` | `false` (botones ◀ apagados) | `true` |
| 1 | 9–16 | `9-16 de 20` | `true` | `true` |
| 2 | 17–20 | `17-20 de 20` | `true` | `false` (botones ▶ apagados) |

Los cálculos de la página:

```ts
rangeStart = pageIndex * pageSize + 1;                  // pág 1 → 1*8+1 = 9
rangeEnd   = Math.min((pageIndex + 1) * pageSize, 20);  // pág 2 → min(24, 20) = 20
```

El `Math.min` es lo que evita que la última página diga "17-24 de 20".

---

## 7. Conceptos clave para recordar

1. **Headless** → TanStack calcula, tú pintas.
2. **Estado controlado** → tú guardas el estado con `useState`; TanStack te avisa de cambios vía
   `onXxxChange` y tú actualizas el estado.
3. **Features explícitas (v9)** → hay que activar cada capacidad + su row model.
4. **`columnHelper.accessor` vs `.display`** → accessor lee un dato del objeto; display es una columna
   sin dato (checkbox, placeholders).
5. **`flexRender`** → pinta de forma segura headers/celdas sean texto o JSX.
6. **Row models** → `getRowModel()` te da las filas finales listas para el `<tbody>`;
   `getFilteredRowModel()` las filtradas (para contar); `getSelectedRowModel()` las seleccionadas.
7. **Resetear a página 0** al filtrar/buscar para no quedarte en una página inexistente.
