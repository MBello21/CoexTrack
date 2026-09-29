import { MapContainer, Polygon, Polyline } from "react-leaflet";
import {
  MAP_CENTER,
  MAP_ZOOM,
} from "../../../../shared/constants/map";
import { FlyToHandler } from "../FlyToHandler";
import "leaflet/dist/leaflet.css";
import { parseWKT } from "../../../../shared/helpers/parse-WKT";
import { useMapLogical } from "../../hooks/useMapLogical";
import { VehicleMarkerList } from "./VehicleMarkerList";
import { BaseMap } from "../../../../shared/components/BaseMap";
import type { MapProps } from "../../interfaces/Map.interface";
import { CustomSelectLayers } from "./CustomSelectLayer";
import { useState } from "react";

export const Map = ({ vehicles, selected }: MapProps) => {

  const { history, geofence, layer, setLayer } = useMapLogical()

  const [showGeofence, setShowGeofence] = useState<Boolean>(false)

  return (
    <MapContainer
      zoomControl={false}
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      doubleClickZoom={false}
      style={{ height: "100vh", width: "100%", position: "relative" }}
    >
      <CustomSelectLayers handleClick={setShowGeofence} showGeofences={showGeofence} />
      {showGeofence && geofence.map(g => (
        <Polygon key={g.id} positions={parseWKT(g.geometry)} />
      ))}
      <VehicleMarkerList vehicles={vehicles} />
      {selected && selected.lat != null && selected.lon != null && (
        <FlyToHandler
          lat={selected.lat}
          lng={selected.lon}
          vehicleId={selected.device_id}
        />
      )}
      {history.length > 1 && (
        <Polyline
          positions={history}
          pathOptions={{ color: "#3B82F6", weight: 3, opacity: 0.7 }}
        />
      )}
      <BaseMap layer={layer} setLayer={setLayer} />
    </MapContainer>
  );
};
