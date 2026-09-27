import { MapContainer, TileLayer, LayersControl } from "react-leaflet";

import {
    MAP_CENTER,
    MAP_ZOOM,
    TILE_URL,
    TILE_ATTRIBUTION,
} from "../../../shared/constants/map";

import { ResizeHandler } from "../../../shared/components/ResizeHandler";
import { DrawControl } from "./DrawControl";


export const GeofencesMap = () => {
    //   const [history, setHistory] = useState<[number, number][]>([]);
    const handleCreate = async (e: any) => {
        console.log(e.layer.getLatLngs()[0])
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
