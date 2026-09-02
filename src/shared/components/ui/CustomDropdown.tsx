import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";


export const CustomDropdown = () => {
    const [dropOpen, setDropOpen] = useState(false);
    const [filter, setFilter] = useState({ label: "Flota", value: "flota" });

    useEffect(() => {
        if (!dropOpen) return;
        const close = () => setDropOpen(false);
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [dropOpen]);

    const options = [
        { label: "Flota", value: "flota", full: "Búsqueda de flota" },
        { label: "Vehículo", value: "vehiculo", full: "Búsqueda de vehículo" },
    ];
    return (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <button
                onClick={(e) => { e.stopPropagation(); setDropOpen(!dropOpen); }}
                className="flex items-center gap-1 text-md text-blue-700 font-semibold"
            >
                {filter.label}
                <ChevronDown className="w-4 h-4" />
            </button>
            {dropOpen && (
                <div className="absolute -left-32 top-full mt-1 bg-white shadow-card  rounded-card p-1 z-50 w-50">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => { setFilter(opt); setDropOpen(false); }}
                            className="block font-body w-full text-left px-3 py-1.5 text-sm text-neutral-600 hover:text-white hover:bg-blue-400 rounded-btn"
                        >
                            {opt.full}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
