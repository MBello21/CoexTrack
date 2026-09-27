
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "@geoman-io/leaflet-geoman-free";

export const DrawControl = ({ onCreate }: { onCreate: (e: L.LeafletEvent) => void }) => {

  const map = useMap()

  useEffect(() => {
    map.pm.addControls({
      position: "topleft", drawPolygon: true, drawCircle: false,
      drawMarker: false, drawPolyline: false, drawRectangle: false, drawCircleMarker: false, drawText: false
    })

    map.on("pm:create", (e: any) => {
      onCreate(e)
      console.log(e.layer.getLatLngs())
    })

    return () => {
      map.pm.removeControls();
      map.off("pm:create")
    }
  }, [map])



  return null
}


