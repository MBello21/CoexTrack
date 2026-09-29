import { ChevronDown } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react"


interface Props{
    showGeofences: Boolean
    handleClick: Dispatch<SetStateAction<Boolean>>
}

export const CustomSelectLayers = ({showGeofences, handleClick}:Props) => {

    const [dropOpen, setDropOpen] = useState<Boolean>(false)

    return (
        <div
            className="absolute top-2 right-5 z-1000 text-sm bg-white w-30 p-1 flex justify-center rounded-card shadow-card"
        >
            <button
                className="flex items-center gap-1 text-neutral-700 font-semibold"
                onClick={(e) => { e.stopPropagation(); setDropOpen(!dropOpen); }}
            >
                Capas
                <ChevronDown className={`w-4 h-4 transition-transform duration-400 ${dropOpen ? "rotate-180" : ""}`} />
            </button>
            {
                dropOpen && (
                    <div className={`absolute -left-20 top-full mt-0.5 bg-white shadow-card rounded-card p-1 z-50 w-50 transition-all duration-200 origin-top ${dropOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-0 -translate-y-1 pointer-events-none"}`}>
                        <div className="flex items-center gap-2 px-2 py-1">
                            <input type="checkbox" name="geofences" id="" 
                            onClick={()=>handleClick(!showGeofences)}
                            
                            />
                            <label htmlFor="geofences">Geofences</label>
                        </div>
                    </div>
                )
            }
        </div>
    )
}