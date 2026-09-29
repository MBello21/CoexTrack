import { Globe, LocateFixed, Map, Minus, Plus, SignpostBig } from "lucide-react"
import { useMap } from "react-leaflet";

type MapLayer = "street" | "satellite" | "hybrid"

interface Props {
    active: MapLayer;
    onChange: (layer: MapLayer) => void;
}

export const MapLayerSwitches = ({ active, onChange }: Props) => {
    // para el active primero dar forma definitiva a los botones
    
    const map = useMap()

    return (
        <div className="absolute bottom-5 right-5 z-1000 text-2xl text-black flex items-end">
            <div className="flex justify-center h-[50%] mx-2">
                <button className="border p-1 bg-white"
                    onClick={() => onChange("street")}>
                    <Map />
                </button>
                <button className="border p-1 bg-white"
                    onClick={() => onChange("hybrid")}
                >
                    <SignpostBig />
                </button>
                <button className="border p-1 bg-white"
                    onClick={() => onChange("satellite")}
                >
                    <Globe />
                </button>
            </div>
            <div className="flex flex-col">
                <button className="border p-1 bg-white"
                    onClick={() => map.locate({ setView: true, maxZoom: 16 })}
                >
                    <LocateFixed />
                </button>
                <button className="border p-1 bg-white"
                    onClick={() => map.zoomIn()}>
                    <Plus />
                </button>
                <button className="border p-1 bg-white"
                    onClick={() => map.zoomOut()}
                >
                    <Minus />
                </button>
            </div>
        </div>
    )
}
