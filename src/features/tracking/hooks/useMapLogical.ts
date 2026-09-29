import { useEffect, useState } from "react";
import type { GeofencesResponse } from "../../geofence/interfaces/geofence.type";
import { fetchVehicleHistory, getGeofences } from "../services/telemetry-api.service";
import type { MapLayer } from "../../geofence/components/GeofencesMap";



export const useMapLogical = () => {
     const [history, setHistory] = useState<[number, number][]>([]);
      const [geofence, setGeofence] = useState<GeofencesResponse[]>([])
      const [layer , setLayer] = useState<MapLayer>("street")
     
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
    
      return{
        history,
        geofence,
        layer,
        setLayer
      }
}