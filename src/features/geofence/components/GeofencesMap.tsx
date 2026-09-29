import { MapContainer} from "react-leaflet";

import {
    MAP_CENTER,
    MAP_ZOOM,
} from "../../../shared/constants/map";

import { ResizeHandler } from "../../../shared/components/ResizeHandler";
import { DrawControl } from "./DrawControl";
import { BaseMap } from "../../../shared/components/BaseMap";
import { useState } from "react";
export type MapLayer = "street" |"satellite" | "hybrid"

export const GeofencesMap = () => {
    //   const [history, setHistory] = useState<[number, number][]>([]);
    const handleCreate = async (e: any) => {
        console.log(e.layer.getLatLngs()[0])
    };


const [layer, setLayer] = useState<MapLayer>("street")


    return (
        <MapContainer
            zoomControl={false}
            center={MAP_CENTER}
            zoom={MAP_ZOOM}
            style={{ height: "100%", width: "70%", position: "relative"}}
        >
            <ResizeHandler />
            <DrawControl onCreate={handleCreate} />
            <BaseMap layer={layer} setLayer={setLayer}/>
        </MapContainer>
    );
};
