import { TileLayer} from "react-leaflet";
import { MapLayerSwitches } from "./MapLayerSwitches";
import { urls } from "../constants/urls-for-maps-types";
import type { BaseMapProps } from "../interfaces/base-map-interfaces";
import { ResizeHandler } from "./ResizeHandler";




export const BaseMap = ({layer, setLayer}:BaseMapProps) => {
    return (
        <>
             <ResizeHandler />
            <TileLayer key={layer} url={urls[layer]} /> 
            <MapLayerSwitches active={layer} onChange={setLayer} />
        </>
    )
}
