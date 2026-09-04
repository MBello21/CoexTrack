import { Plus } from "lucide-react"

export const SectionHeader = () => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-display font-bold">Vehículos</h1>
                <p className="text-sm text-text-muted">vehículos registrados</p>
            </div>
            <div className="flex gap-3">
                <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-700 hover:shadow rounded-md text-white opacity-50 cursor-not-allowed">
                    <Plus className="h-5 w-5" />
                    <span className="uppercase text-[13px]">Añadir grupo</span>
                </button>
                <button className=" flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-700 hover:shadow rounded-md text-white">
                    <Plus className="h-5 w-5" />
                    <span className="uppercase text-[13px]">Añadir vehículo</span>
                </button>
            </div>
        </div>
    )
}
