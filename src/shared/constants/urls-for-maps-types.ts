export type MapLayer = "street" |"satellite" | "hybrid"


export const urls :Record<MapLayer, string> = {
  street: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  hybrid: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
}