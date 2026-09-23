import { MapContainer, TileLayer, LayersControl } from "react-leaflet";

import {
    MAP_CENTER,
    MAP_ZOOM,
    TILE_URL,
    TILE_ATTRIBUTION,
} from "../../../shared/constants/map";

import { ResizeHandler } from "../../../shared/components/ResizeHandler";
import { DrawControl, DrawToolbar } from "./DrawControl";


export const GeofencesMap = () => {
    //   const [history, setHistory] = useState<[number, number][]>([]);
     const handleCreate = async () => {
    // const name = window.prompt("Nombre de la geovalla");
    // if (!name) return;
    // const res = await fetch("/api/geofences", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, geometry }),
    // });
    // if (res.ok) await loadFences(); // tu función que hace el GET y actualiza el estado
  };





    return (
        <MapContainer
            zoomControl={false}
            center={MAP_CENTER}
            zoom={MAP_ZOOM}
            style={{ height: "100vh", width: "70%" }}
        >
            <ResizeHandler />
            <DrawControl onCreate={handleCreate} />
            <DrawToolbar onCreate={handleCreate} />
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Callejero">
                    <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Satélite">
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution="&copy; Esri"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>

        </MapContainer>
    );
};
