
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "@geoman-io/leaflet-geoman-free";

export const DrawControl = ({ onCreate }: { onCreate: (g: GeoJSON.Geometry) => void }) => {
    
    const map = useMap()

    useEffect(() => {
      map.pm.addControls({position: "topleft", drawPolygon:true, drawCircle:true,
        drawMarker:true, drawPolyline:true, drawRectangle:true, drawCircleMarker:false, drawText:false
      })
      
      map.on("pm:create", (e:any)=> onCreate(e.layer.toGeoJSON().geometry))
      return () => {
        map.pm.removeControls(); 
        map.off("pm:create")
      }
    }, [map])
    
    return null
}


type Shape = "Polygon" | "Rectangle" | "Circle" | "Marker";

export const DrawToolbar = ({ onCreate }: { onCreate: (g: GeoJSON.Geometry) => void }) => {
  const map = useMap();

  // Qué herramienta está activa ahora mismo (null = ninguna)
  const [active, setActive] = useState<Shape | null>(null);

  // Referencia al div de la barra, para evitar que sus clics lleguen al mapa
  const barRef = useRef<HTMLDivElement>(null);

  // Guardamos onCreate en un ref para que el efecto siempre llame a la última versión
  const onCreateRef = useRef(onCreate);
  onCreateRef.current = onCreate;

  // ── El useEffect SOLO conecta y desconecta eventos. No pinta nada. ──
  useEffect(() => {
    if (barRef.current) L.DomEvent.disableClickPropagation(barRef.current);

    const handleDrawStart = (e: any) => setActive(e.shape); // empieza a dibujar
    const handleDrawEnd = () => setActive(null); // termina o cancela
    const handleCreate = (e: any) => onCreateRef.current(e.layer.toGeoJSON().geometry);

    map.on("pm:drawstart", handleDrawStart);
    map.on("pm:drawend", handleDrawEnd);
    map.on("pm:create", handleCreate);

    return () => {
      map.off("pm:drawstart", handleDrawStart);
      map.off("pm:drawend", handleDrawEnd);
      map.off("pm:create", handleCreate);
      map.pm.disableDraw();
    };
  }, [map]);

  // ── Esto lo ejecuta el usuario al pulsar un botón: fuera del useEffect ──
  const toggle = (shape: Shape) => {
    if (active === shape) map.pm.disableDraw(); // pulsar de nuevo = cancelar
    else map.pm.enableDraw(shape); // activar (desactiva la anterior si la había)
  };

  const btnStyle = (shape: Shape): React.CSSProperties => ({
    padding: "6px 12px",
    cursor: "pointer",
    background: active === shape ? "#2563eb" : "#fff",
    color: active === shape ? "#fff" : "#111",
    border: "1px solid #999",
    borderRadius: 4,
  });

  // La barra es un div normal, centrado arriba con CSS.
  // Debe ir DENTRO de <MapContainer> para poder usar useMap().
  return (
    <div
      ref={barRef}
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        display: "flex",
        gap: 6,
        padding: 6,
        background: "rgba(255,255,255,.9)",
        borderRadius: 6,
      }}
    >
      <button type="button" style={btnStyle("Polygon")} onClick={() => toggle("Polygon")}>
        Polígono
      </button>
      <button type="button" style={btnStyle("Rectangle")} onClick={() => toggle("Rectangle")}>
        Rectángulo
      </button>
      <button type="button" style={btnStyle("Circle")} onClick={() => toggle("Circle")}>
        Circulo
      </button>
      <button type="button" style={btnStyle("Marker")} onClick={() => toggle("Marker")}>
        Marker
      </button>
    </div>
  );
};
