import type { Dispatch, SetStateAction } from "react";

export type MapLayer = "street" |"satellite" | "hybrid"

export interface BaseMapProps{
    layer:MapLayer;
    setLayer: Dispatch<SetStateAction<MapLayer>>
}