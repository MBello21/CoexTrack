import {
  useTable,
  tableFeatures,
  rowSortingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  rowSelectionFeature,
  rowPaginationFeature,
  columnVisibilityFeature,
  createSortedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createColumnHelper,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_text,
  type SortingState,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type RowSelectionState,
  type PaginationState,
  type FilterFn,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import type { Vehicle } from '../../tracking/types/telemetry.type';
import type { VehicleFilterStatus } from '../types/table.types';

// Features declaradas explícitamente (API v9). Los row models se registran
// aquí como slots del feature, no como opciones sueltas de la tabla.
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

type Features = typeof features;

const columnHelper = createColumnHelper<Features, Vehicle>();

// Un vehículo se considera "retirado" cuando no tiene señal o el motor está
// apagado; cualquier otro estado es "activo".
const isRetired = (status: Vehicle['status']) =>
  status === 'no_signal' || status === 'ignition_off';

// Filtro de columna para el estado del vehículo (todos/activos/retirados).
const statusFilterFn: FilterFn<Features, Vehicle> = (row, _columnId, filterValue) => {
  const value = filterValue as VehicleFilterStatus;
  if (!value || value === 'all') return true;
  return value === 'retired' ? isRetired(row.original.status) : !isRetired(row.original.status);
};

// Filtro global: busca por código (device_id) y por matrícula (plate).
const searchFilterFn: FilterFn<Features, Vehicle> = (row, _columnId, filterValue) => {
  const query = String(filterValue ?? '').trim().toLowerCase();
  if (!query) return true;
  const { device_id, plate } = row.original;
  return (
    device_id.toLowerCase().includes(query) ||
    (plate?.toLowerCase().includes(query) ?? false)
  );
};

export const useVehiclesTable = (vehicles: Vehicle[]) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const columns = useMemo(
    () => columnHelper.columns([
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            ref={(el) => {
              if (el) el.indeterminate = table.getIsSomePageRowsSelected();
            }}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="cursor-pointer"
            aria-label="Seleccionar todo"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="cursor-pointer"
            aria-label="Seleccionar fila"
          />
        ),
        enableHiding: false,
      }),
      columnHelper.accessor('device_id', {
        id: 'device_id',
        header: 'Código',
      }),
      columnHelper.accessor('plate', {
        id: 'plate',
        header: 'Matrícula',
        cell: (info) => info.getValue() ?? '-',
      }),
      columnHelper.display({
        id: 'groups',
        header: 'Grupos',
        cell: () => '1',
      }),
      columnHelper.accessor('status', {
        id: 'status',
        header: 'Estado',
        filterFn: statusFilterFn,
      }),
      columnHelper.accessor('engine_type', {
        id: 'engine_type',
        header: 'Tipo Motor',
        cell: (info) => info.getValue() ?? '-',
      }),
      columnHelper.accessor('speed', {
        id: 'speed',
        header: 'Velocidad',
        cell: (info) => `${info.getValue() ?? 0} km/h`,
      }),
      columnHelper.display({
        id: 'geofences',
        header: 'Geofences Actual',
        cell: () => 'Geofences',
      }),
      columnHelper.accessor('last_address', {
        id: 'last_address',
        header: 'Localización',
        cell: (info) => info.getValue() ?? '-',
      }),
    ]),
    []
  );

  const table = useTable({
    features,
    columns,
    data: vehicles,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    globalFilterFn: searchFilterFn,
    enableRowSelection: true,
  });

  // filterStatus se deriva del estado de columnFilters de TanStack, de modo que
  // el toolbar sigue exponiendo una API simple sin duplicar el estado.
  const filterStatus =
    (columnFilters.find((f) => f.id === 'status')?.value as VehicleFilterStatus) ?? 'all';

  const setFilterStatus = (status: VehicleFilterStatus) => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    setColumnFilters(status === 'all' ? [] : [{ id: 'status', value: status }]);
  };

  const setSearchQuery = (query: string) => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    setGlobalFilter(query);
  };

  const selectedRows = useMemo(() => {
    const selected = new Set<string>();
    table.getSelectedRowModel().rows.forEach((row) => {
      selected.add(row.original.device_id);
    });
    return selected;
  }, [table, rowSelection]);

  const filteredCount = table.getFilteredRowModel().rows.length;

  const toggleColumnVisibility = (columnId: string) => {
    table.getColumn(columnId)?.toggleVisibility();
  };

  return {
    table,
    filterStatus,
    setFilterStatus,
    searchQuery: globalFilter,
    setSearchQuery,
    columnVisibility,
    toggleColumnVisibility,
    selectedRows,
    filteredCount,
  };
};
