import type { GeofencesResponse } from "../types/geofence.type";
import type { TelemetryResponse } from "../types/telemetry.type";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const fetchLatestPositions = async (): Promise<TelemetryResponse[]> => {
  const res = await fetch(`${API_URL}/telemetry/latest`);
  return res.json();
};

export const fetchVehicleHistory = async (
  vehicleId: string,
  start: string,
  end: string,
): Promise<TelemetryResponse[]> => {
  const res = await fetch(
    `${API_URL}/telemetry/history/${vehicleId}?start=${start}&end=${end}`,
  );
  return res.json();
};

export const getGeofences = async (): Promise<GeofencesResponse[]> => {
  const response = await fetch(
    `${API_URL}/geofence`,
  );
  return response.json()
}
