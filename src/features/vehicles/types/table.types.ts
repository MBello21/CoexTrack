export type VehicleFilterStatus = "all" | "active" | "retired";

export interface TableState {
  filterStatus: VehicleFilterStatus;
  searchQuery: string;
  sorting: Array<{ id: string; desc: boolean }>;
  columnVisibility: Record<string, boolean>;
  columnPinning: {
    left: string[];
    right: string[];
  };
  columnSizing: Record<string, number>;
  selectedRows: Set<string>;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
}

export interface ColumnManagerState {
  hiddenColumns: Set<string>;
  pinnedColumns: {
    left: string[];
    right: string[];
  };
}
