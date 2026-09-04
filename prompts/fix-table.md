Realiza el cambio de modelo de existente en /vehicles/VehiclesPage.tsx
Este cambio se realizara por una tabla conformada con la libreria TanStack v9, sin tocar DISEÑO DE LA MISMA, es decir manteniendo el diseño, para poder aplicar lo siguiente: 

- DEBE TENER UN SELECT PARA FILTRADO POR TODOS LOS VEHICULOS, ACTIVOS Y RETIRADOS
- DEBE TENER UN INPUT PARA BUSQUEDA PARA ENCONTRAR MATRICULAS O CODIGOS DENTRO DE LA TABLA Y QUE ESTA MUESTRE SOLO LO RELACIONADO CON LA BUSQUEDA
- ORGANIZADOR DE COLUMNAS POR ODENACION ASCENDENTE, DESCENDENTE
- POSIBILIDAD DE ANCLAR COLUMNAS A IZQUIERDA Y DERECHA
- POSIBILIDAD DE APLICAR FILTROS EN LA MISMA 
- SECCIÓN PARA PODER OCULTAR LA COLUMNA
- SECCIÓN PARA PODER ADMINISTRAR COLUMNA
- LA PRIMERA COLUMNA SERA UN INPUT CHECKBOX EL CUAL PERMITIRA SELECCIONAR UNA COLUMNA Y DESDE LA CABECERA PODER SELECCIONARLAS TODAS PARA PODER COMPARTIR UBICACIONES
- LAS COLUMNAS DEBEN PODER AJUSTAR SU TAMAÑO EN CUESTION DE ANCHO APLICADO DESDE LA CABECERA.
- LA TABLA SERA PAGINADA CON UNA MUESTRA DE MÁXIMO 8 FILAS POR PAGINA

Estado actual del componente, ahora mismo es solo visual y no tiene lógica implementada, esta dividida en varios componentes:

- TOOLBAR, ubicado en /vehicles/components/VehicleToolbar.tsx, en el que esta todo lo relacionado con inputs de busqueda comparacion selector etc
- Todo lo demás esta en VehiclesPage.tsx

Arquitectura esperada:

- Separa toda la lógica posible de los componentes o paginas si fuese necesaria su implementacion
- Las interfaces deben de estar separadas por componente o responsabilidad dentro de /vehicles/types con el formato siguiente funcionalidad.type.ts

NO TOQUES LOGICA QUE NO PERTENEZCA A LA TABLA
NO HAGAS COMMIT NI PUSH
LA LIBRERIA DE tanstack/react-table ya esta instalada
DOCUMENTA TODO EN docs/decisions/001-tanstack-table.md