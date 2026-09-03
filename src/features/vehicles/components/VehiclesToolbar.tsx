import { ListFilter, Settings } from "lucide-react"
import type { Vehicle } from "../../tracking/types/telemetry.type";


export interface VehiclesToolbarProps {
    vehicles: Vehicle[];
}


export const VehiclesToolbar = ({ vehicles }: VehiclesToolbarProps) => {
    return (
        <div className="bg-white">
            <div className="flex gap-3 border-b border-gray-300 py-4 px-4">
                <button className="uppercase">Todos</button>
                <button className="uppercase">Grupo</button>
            </div>
            <div className="flex items-center justify-between py-4 px-2 w-full">
                <div className="flex justify-start items-center  gap-4 w-[60%]">
                    <div className="flex items-center gap-3 ">
                        <div className="relative">
                            <select className="appearance-none py-2 px-4 pr-8 border border-gray-300 rounded-md">
                                <option>Todos los vehículos</option>
                                <option>Todos los vehículos</option>
                                <option>Todos los vehículos</option>
                            </select>
                            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none" />
                        </div>
                        <input type="text" name="" id="" placeholder="Prueba" className=" py-2 px-3 border border-gray-300 rounded-md" />
                        <button className=" gap-1 p-2  font-sans hover:bg-neutral-100 rounded-md">
                            <ListFilter className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center ms-2">
                        {vehicles.length}
                        <p className="font-display font-semibold">Todos los vehiculos</p>
                    </div>
                    <div className="w-px h-8 bg-neutral-300" />
                    <div className="flex flex-col items-center">
                        0
                        <p className="font-display font-semibold">Total grupos</p>
                    </div>
                </div>
                <div className="flex justify-end  items-center gap-3 w-[40%] me-1">
                    <button className="flex items-center gap-1 py-2 px-3 border rounded-md uppercase font-sans hover:bg-neutral-100">
                        <i className="fa-solid fa-share-nodes"></i>
                        Share Vehicle location
                    </button>
                    <button className="flex items-center gap-1 py-2 px-3 border rounded-md uppercase font-sans hover:bg-neutral-100">
                        exportar
                    </button>
                    <button className=" gap-1 p-2  font-sans hover:bg-neutral-100 rounded-full">
                        <Settings className="h-6 w-6" />
                    </button>

                </div>

            </div>
        </div>
    )
}
