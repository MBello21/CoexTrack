import { ChevronDown } from "lucide-react";
import { useCustomDropdown } from "../../hooks/useCustomDropdown";
import { CUSTOM_DROPDOWN_OPTIONS } from "../../constants/custom-dropdown.constant";


export const CustomDropdown = () => {
    const { filter, setFilter, dropOpen, setDropOpen } = useCustomDropdown();

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
                <div className="absolute -left-32 top-full mt-2 bg-white shadow-card  rounded-card p-1 z-50 w-50">
                    {CUSTOM_DROPDOWN_OPTIONS.map((opt) => (
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