export const parseWKT = (geometry: string) => {
    geometry = geometry.replace("POLYGON ((", "").replace("))", "")
    const points = geometry.split(", ")
    const invert = points.map(p => p.split(" ")).map(([lng, lat]) => [parseFloat(lat), parseFloat(lng)] as [number, number])
    return invert
}