import { Plus } from "lucide-react"

interface Props {
    title: string;
    subtitle: string;
    onAddGroup?: () => void;
    onAdd?: () => void;
}



export const SectionHeader = ({ title, subtitle, onAdd }: Props) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-display font-bold">{title}</h1>
                <p className="text-sm text-text-muted">{subtitle}</p>
            </div>
            <div className="flex gap-3">
                {
                    title === 'Vehículos' &&
                    <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-700 hover:shadow rounded-md text-white opacity-50 cursor-not-allowed">
                        <Plus className="h-5 w-5" />
                        <span className="uppercase text-[13px]">Añadir grupo</span>
                    </button>
                }

                <button className=" flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-700 hover:shadow rounded-md text-white"
                    onClick={onAdd}
                >
                    <Plus className="h-5 w-5" />
                    <span className="uppercase text-[13px]">Añadir {title}</span>
                </button>
            </div>
        </div>
    )
}
