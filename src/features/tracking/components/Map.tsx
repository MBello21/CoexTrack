import { MapContainer, TileLayer, Polyline, LayersControl, LayerGroup, Circle, Polygon } from "react-leaflet";
import { useState, useEffect } from "react";
import {
  MAP_CENTER,
  MAP_ZOOM,
  TILE_URL,
  TILE_ATTRIBUTION,
} from "../../../shared/constants/map";
import { VehicleMarker } from "./VehicleMarker";
import { FlyToHandler } from "./FlyToHandler";
import { fetchVehicleHistory, getGeofences } from "../services/telemetry-api.service";
import type { Vehicle } from "../types/telemetry.type";
import "leaflet/dist/leaflet.css";
import { ResizeHandler } from "../../../shared/components/ResizeHandler";
import type { GeofencesResponse } from "../types/geofence.type";

interface Props {
  vehicles: Vehicle[];
  selected: Vehicle | null;
}

export const Map = ({ vehicles, selected }: Props) => {
  const [history, setHistory] = useState<[number, number][]>([]);
  const [geofence, setGeofence] = useState<GeofencesResponse[]>([])

  useEffect(() => {
    fetchVehicleHistory(
      "coex-gps-01",
      "2026-08-19T00:00:00",
      "2026-08-19T23:59:59",
    ).then((data) => {
      setHistory(data.map((d) => [d.lat, d.lon] as [number, number]));
    });
  }, []);

  useEffect(() => {
    getGeofences().then((data) => {
      setGeofence(data);
    })
  }, [])

  const parseWKT = (geometry: string) => {
    geometry = geometry.replace("POLYGON ((", "").replace("))", "")
    const points = geometry.split(", ")
    const invert = points.map(p => p.split(" ")).map(([lng, lat]) => [parseFloat(lat), parseFloat(lng)] as [number, number])
    return invert
  }
  console.log(geofence)


  return (
    <MapContainer
      zoomControl={false}
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      style={{ height: "100vh", width: "100%" }}
    >
      <ResizeHandler />
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
        <LayersControl.Overlay checked name="Layer group with circles">
          <LayerGroup>
            {
              geofence.map(g => (
                <Polygon key={g.id} positions={parseWKT(g.geometry)} />
              ))
            }
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
      {vehicles
        .filter((v) => v.lat != null && v.lon != null)
        .map((v) => (
          <VehicleMarker key={v.device_id} vehicle={v} />
        ))}
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
    </MapContainer>
  );
};
