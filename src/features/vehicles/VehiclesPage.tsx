import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import { SectionHeader } from "../../shared/components/SectionHeader"
import { useVehicleContext } from "../../shared/context/VehiclesContext";
import { VehiclesToolbar } from "./components/VehiclesToolbar";
import { useVehiclesTable } from "./hooks/useVehiclesTable";
import { BadgeStatus } from "../../shared/components/ui/BadgeStatus";
import { VehicleIcon } from "../../shared/components/ui/VehicleIcon";


export const VehiclesPage = () => {
  const vehicles = useVehicleContext();

  const {
    table,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    columnVisibility,
    toggleColumnVisibility,
    selectedRows,
    filteredCount,
  } = useVehiclesTable(vehicles);

  const { pageIndex, pageSize } = table.state.pagination;
  const rows = table.getRowModel().rows;
  const leafColumns = table.getAllLeafColumns();
  const rangeStart = filteredCount === 0 ? 0 : pageIndex * pageSize + 1;
  const rangeEnd = Math.min((pageIndex + 1) * pageSize, filteredCount);

  return (
    <section className="bg-neutral-300 h-full p-4 font-body text-xs">
      <SectionHeader />
      <div className="border border-gray-300 bg-white rounded-lg mt-5 shadow-md overflow-hidden">
        <VehiclesToolbar
          vehicles={vehicles}
          filteredCount={filteredCount}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCount={selectedRows.size}
          columnVisibility={columnVisibility}
          onToggleColumn={toggleColumnVisibility}
        />

        <div className="overflow-x-auto w-full h-[calc(100vh-300px)] overflow-y-auto">
          <table className="w-full border-collapse bg-gray-100 table-auto">
            <thead className="sticky top-0 z-10 bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const sorted = header.column.getIsSorted();
                    return (
                      <th
                        key={header.id}
                        className="p-3 font-body text-[13px] uppercase whitespace-nowrap text-center border-b border-gray-300"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={`flex items-center justify-center gap-1 ${canSort ? 'cursor-pointer select-none' : ''}`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {canSort && (
                              sorted === 'asc' ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : sorted === 'desc' ? (
                                <ChevronDown className="h-3 w-3" />
                              ) : (
                                <ChevronsUpDown className="h-3 w-3 opacity-40" />
                              )
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white font-body">
              {rows.length > 0 ? (
                rows.map((row) => {
                  const vehicle = row.original;
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white text-center"
                    >
                      {row.getVisibleCells().map((cell) => {
                        if (cell.column.id === 'device_id') {
                          return (
                            <td key={cell.id} className="px-3 py-2 text-[13px] whitespace-nowrap">
                              <span className="flex gap-2 items-center justify-center">
                                <VehicleIcon
                                  vehicle_type={vehicle?.vehicle_type ?? ""}
                                  state={vehicle?.status}
                                  border="rounded-md"
                                />
                                {vehicle?.device_id}
                              </span>
                            </td>
                          );
                        }
                        if (cell.column.id === 'status') {
                          return (
                            <td key={cell.id} className="px-3 py-2 text-[13px] whitespace-nowrap">
                              <BadgeStatus state={vehicle?.status} />
                            </td>
                          );
                        }
                        return (
                          <td key={cell.id} className="px-3 py-2 text-[13px] whitespace-nowrap">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={leafColumns.length} className="text-center py-8 text-gray-500">
                    No hay vehículos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end bg-white border-t border-gray-300 py-5 px-3 w-full">
          <div className="flex items-center gap-2">
            <span className="text-xs">
              {`${rangeStart}-${rangeEnd} de ${filteredCount}`}
            </span>
          </div>
          <div className="flex items-center justify-end mx-2 gap-1">
            <button
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
              title="Primera página"
            >
              <ChevronFirst className="h-5 w-5" />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
              title="Página anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
              title="Siguiente página"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
              title="Última página"
            >
              <ChevronLast className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
