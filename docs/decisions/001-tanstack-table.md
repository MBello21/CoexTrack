# 001 - Migración a TanStack React Table v9

## Contexto
La página de vehículos inicialmente utilizaba una tabla HTML básica sin características avanzadas. Se requería implementar funcionalidades complejas como filtrado, ordenamiento, selección de filas, y paginación usando TanStack React Table v9 (ya instalado en el proyecto).

## Decisión
Se implementó **TanStack React Table v9** (v9.2.4) usando la API real y tipada de la biblioteca, sin castings `as any`:
- `tableFeatures()` para **declarar explícitamente las features** que usa la tabla (obligatorio en v9). Los row models se registran como *slots* dentro de este objeto, no como opciones sueltas.
- `useTable()` hook, cuyos genéricos `<TFeatures, TData>` se infieren desde el campo `features`. Declarar las features es lo que hace que existan (con tipos) métodos como `getIsSelected`, `toggleSelected`, `getCanPreviousPage`, `getToggleSortingHandler`, etc.
- `createColumnHelper<typeof features, Vehicle>()` — en v9 requiere **dos** parámetros de tipo (features y data).
- `columnHelper.columns([...])` para envolver el array de columnas heterogéneas y preservar el tipado por tupla (evita el error de varianza de `ColumnDefTemplate` al mezclar columnas string/number/display).
- `flexRender()` para renderizar headers y cells dinámicamente.
- **Filtrado nativo de TanStack** (`getFilteredRowModel`) en vez de pre-filtrar el array manualmente:
  - Búsqueda por código/matrícula vía `globalFilter` + `globalFilterFn` custom.
  - Filtro de estado (activos/retirados) vía `columnFilters` + un `filterFn` custom en la columna `status`.

### Features declaradas
```tsx
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
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text, basic: sortFn_basic },
});
```

### Por qué NO se usa `as any`
La causa raíz de los castings del intento anterior era **no declarar las features**: sin `features`, TypeScript infería `TableFeatures` vacío, así que los métodos de selección/paginación/orden no existían en el tipo y había que castear. Al declarar las features correctamente, la API queda tipada de extremo a extremo.

## Requisitos Implementados

### 1. Filtrado y Búsqueda
- **Filtrado por Estado**: SELECT en toolbar con opciones: "Todos", "Activos", "Retirados"
  - Se aplica antes de pasar datos a TanStack
  - Estados: `no_signal` y `ignition_off` = Retirados; resto = Activos
- **Búsqueda Global**: INPUT que busca en campos `device_id` y `plate`
  - Búsqueda case-insensitive
  - Se aplica junto con el filtro de estado antes de la tabla

### 2. Ordenamiento
- Soportado a través de `createSortedRowModel()`
- Estado `sorting` controlado por TanStack
- Dinámico basado en clicks de header (infraestructura lista para UI)

### 3. Gestión de Columnas
- **Ocultar/Mostrar**: Menú desplegable en toolbar permite show/hide de columnas
- **Administrador de Columnas**: Componente `ColumnManager` con UI de checkboxes
- Estado `columnVisibility` gestionado en el hook y usado para renderizar solo columnas visibles

### 4. Selección de Filas
- **Primera Columna**: Input checkbox para seleccionar filas individuales
- **Select All**: Checkbox en header selecciona/deselecciona todas las filas de la página actual
- **Contador**: Muestra número de filas seleccionadas en toolbar
- Estado `rowSelection` sincronizado con `selectedRows` Set para acceso rápido por `device_id`

### 5. Paginación
- Máximo **8 filas por página** (configurable)
- Botones de navegación: Primera, Anterior, Siguiente, Última página
- Indicador de rango: "1-8 de 50"
- Botones deshabilitados dinámicamente según disponibilidad de páginas

## Arquitectura de Archivos

```
src/features/vehicles/
├── VehiclesPage.tsx                 # Página principal - renderización de tabla
├── components/
│   ├── VehiclesToolbar.tsx          # Toolbar con filtros y controles
│   ├── ColumnManager.tsx            # Gestor de visibilidad de columnas
│ └── types/
│    └── table.types.ts              # Tipos: VehicleFilterStatus
└── hooks/
    └── useVehiclesTable.tsx         # Hook con toda la lógica de TanStack
```

## API de TanStack Utilizada

### Hook Principal: `useTable()`
```tsx
const table = useTable({
  features,                   // features declaradas con tableFeatures()
  columns,                    // columnHelper.columns([...])
  data: vehicles,             // datos SIN pre-filtrar — TanStack filtra
  state: {
    sorting,                  // SortingState
    columnFilters,            // ColumnFiltersState (filtro de estado)
    globalFilter,             // string (búsqueda código/matrícula)
    columnVisibility,         // ColumnVisibilityState
    rowSelection,             // RowSelectionState
    pagination,               // PaginationState { pageIndex, pageSize: 8 }
  },
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  onGlobalFilterChange: setGlobalFilter,
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  onPaginationChange: setPagination,
  globalFilterFn: searchFilterFn,   // busca en device_id y plate
  enableRowSelection: true,
});
```

### Métodos de Tabla Usados (todos tipados, sin casts)
- `table.getHeaderGroups()` - grupos de headers para renderizar
- `table.getRowModel().rows` - filas paginadas/filtradas/ordenadas
- `table.getFilteredRowModel().rows.length` - total tras filtrar (para el contador y el rango de paginación)
- `table.getSelectedRowModel().rows` - solo filas seleccionadas
- `table.getAllLeafColumns()` - todas las columnas
- `table.state.pagination` - lectura del estado en render
- `table.firstPage/previousPage/nextPage/lastPage()` y `getCanPreviousPage/getCanNextPage()` - navegación de paginación
- `column.getToggleSortingHandler()`, `column.getIsSorted()`, `column.getCanSort()` - ordenamiento por header
- `column.toggleVisibility()` - visibilidad de columnas (usado por ColumnManager)
- `row.getIsSelected()`, `row.getToggleSelectedHandler()` - selección de fila
- `table.getIsAllPageRowsSelected()`, `table.getIsSomePageRowsSelected()`, `table.getToggleAllPageRowsSelectedHandler()` - checkbox "select all"

### Definición de Columnas
Usando `columnHelper` envuelto en `columnHelper.columns([...])`:
- `columnHelper.display()` - columnas derivadas (select, grupos, geofences)
- `columnHelper.accessor()` - columnas que mapean a propiedades del dato, con `cell()` para render personalizado
- La columna `status` lleva un `filterFn` custom para el filtro activos/retirados

### Renderización
- `flexRender(columnDef.header/cell, context)` - renderiza headers y cells dinámicamente
- `device_id` y `status` se renderizan con markup especial (`VehicleIcon`, `BadgeStatus`) interceptando por `cell.column.id`

## Flujo de Datos y Filtrado

Todo el pipeline lo gestiona TanStack a partir de `vehicles[]` sin pre-filtrado manual:

1. **Datos originales**: `vehicles[]` del contexto (se pasan tal cual a `useTable`)
2. **Filtrado (TanStack `getFilteredRowModel`)**:
   - `globalFilter` + `searchFilterFn`: busca en `device_id` y `plate`
   - `columnFilters` sobre `status` + `statusFilterFn`: todos/activos/retirados
3. **Ordenamiento** (`getSortedRowModel`): por click en header
4. **Visibilidad** (`columnVisibility`): ocultar/mostrar columnas
5. **Paginación** (`getPaginationRowModel`): 8 filas por página
6. **Selección** (`rowSelection`): filas marcadas con checkbox

El conteo del toolbar y el rango de paginación se leen de `table.getFilteredRowModel().rows.length`, no de un array paralelo.

## Manejo de Estados

| Estado | Tipo | Propósito | Control |
|--------|------|----------|---------|
| `sorting` | `SortingState` | Orden de columnas | Headers clickeables |
| `columnFilters` | `ColumnFiltersState` | Filtro de estado (activos/retirados) | SELECT toolbar |
| `globalFilter` | `string` | Búsqueda device_id/plate | INPUT toolbar |
| `columnVisibility` | `ColumnVisibilityState` | Columnas ocultas | ColumnManager |
| `rowSelection` | `RowSelectionState` | Filas seleccionadas | Checkboxes |
| `pagination` | `PaginationState` | Página actual (8 filas max) | Botones navegación |

`filterStatus` y `searchQuery` que expone el hook al toolbar se **derivan** de `columnFilters`/`globalFilter` — no son estado duplicado.

## Notas de Implementación

### Filtro de estado como columna
`statusFilterFn` interpreta el valor del filtro (`active`/`retired`) contra la regla de negocio: un vehículo está "retirado" si `status` es `no_signal` o `ignition_off`. Al cambiar el filtro o la búsqueda se resetea `pageIndex` a 0 para no quedar en una página vacía.

### Selección de Filas
- `rowSelection` es gestionado por TanStack (`rowSelectionFeature`)
- Se sincroniza con un Set local (`selectedRows`) para acceso O(1) por `device_id`
- El checkbox "Select All" del header usa `getToggleAllPageRowsSelectedHandler()` (afecta la página actual) y marca `indeterminate` vía ref cuando hay selección parcial

### Componentes Relacionados
- `VehiclesToolbar`: expone filterStatus, searchQuery, contador y ColumnManager
- `ColumnManager`: UI para toggle de visibilidad de columnas (llama a `toggleColumnVisibility` → `column.toggleVisibility()`)
- `BadgeStatus`, `VehicleIcon`: componentes de renderización especializada

## Limitaciones Actuales

1. No hay persistencia de estado de tabla en localStorage
2. Las columnas no se pueden reordenar (drag-drop no implementado)
3. No hay redimensionamiento de columnas (feature `columnResizingFeature` disponible pero no cableado)

## Mejoras Futuras Potenciales

1. Persistencia de estado (columnVisibility, sorting, pagination)
2. Drag-drop para reordenar columnas
3. Redimensionamiento de columnas
4. Column pinning (izquierda/derecha)
5. Export a CSV/Excel
6. Virtualización para datasets muy grandes (1000+ filas)
