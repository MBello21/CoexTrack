import type { Vehicle } from "../../tracking/types/telemetry.type";
import type { VehicleFilterStatus } from "../types/table.types";
import { ColumnManager } from "./ColumnManager";


export interface VehiclesToolbarProps {
    vehicles: Vehicle[];
    filteredCount: number;
    filterStatus: VehicleFilterStatus;
    onFilterStatusChange: (status: VehicleFilterStatus) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCount: number;
    columnVisibility: Record<string, boolean>;
    onToggleColumn: (columnId: string) => void;
}


export const VehiclesToolbar = ({
    filteredCount,
    filterStatus,
    onFilterStatusChange,
    searchQuery,
    onSearchChange,
    selectedCount,
    columnVisibility,
    onToggleColumn,
}: VehiclesToolbarProps) => {
    return (
        <div className="bg-white">
            <div className="flex gap-3 border-b border-gray-300 py-4 px-4">
                <button
                    onClick={() => onFilterStatusChange('all')}
                    className={`uppercase text-sm ${filterStatus === 'all' ? 'font-semibold border-b-2 border-blue-500' : 'text-gray-600'}`}
                >
                    Todos
                </button>
                <button
                    onClick={() => onFilterStatusChange('active')}
                    className={`uppercase text-sm ${filterStatus === 'active' ? 'font-semibold border-b-2 border-blue-500' : 'text-gray-600'}`}
                >
                    Activos
                </button>
                <button
                    onClick={() => onFilterStatusChange('retired')}
                    className={`uppercase text-sm ${filterStatus === 'retired' ? 'font-semibold border-b-2 border-blue-500' : 'text-gray-600'}`}
                >
                    Retirados
                </button>
            </div>
            <div className="flex items-center justify-between py-4 px-2 w-full">
                <div className="flex justify-start items-center gap-4 w-[60%]">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                value={filterStatus}
                                onChange={(e) => onFilterStatusChange(e.target.value as VehicleFilterStatus)}
                                className="appearance-none py-2 px-4 pr-8 border border-gray-300 rounded-md text-sm"
                            >
                                <option value="all">Todos los vehículos</option>
                                <option value="active">Vehículos Activos</option>
                                <option value="retired">Vehículos Retirados</option>
                            </select>
                            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar matrícula o código"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="py-2 px-3 border border-gray-300 rounded-md text-sm"
                        />
                    </div>

                    <div className="flex flex-col items-center ms-2">
                        {filteredCount}
                        <p className="font-display font-semibold text-xs">Todos los vehiculos</p>
                    </div>
                    <div className="w-px h-8 bg-neutral-300" />
                    <div className="flex flex-col items-center">
                        {selectedCount}
                        <p className="font-display font-semibold text-xs">Seleccionados</p>
                    </div>
                </div>
                <div className="flex justify-end items-center gap-3 w-[40%] me-1">
                    <button
                        disabled={selectedCount === 0}
                        className="flex items-center gap-1 py-2 px-3 border rounded-md uppercase font-sans hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                    >
                        <i className="fa-solid fa-share-nodes"></i>
                        Share Vehicle location
                    </button>
                    <button className="flex items-center gap-1 py-2 px-3 border rounded-md uppercase font-sans hover:bg-neutral-100 text-xs">
                        exportar
                    </button>
                    <ColumnManager columnVisibility={columnVisibility} onToggleColumn={onToggleColumn} />
                </div>
            </div>
        </div>
    )
}
