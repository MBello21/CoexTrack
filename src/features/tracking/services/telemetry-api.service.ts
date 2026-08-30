import type { TelemetryResponse } from "../types/telemetry.type";

const API_URL = `${import.meta.env.VITE_API_URL}/telemetry`;

export const fetchLatestPositions = async (): Promise<TelemetryResponse[]> => {
  const res = await fetch(`${API_URL}/latest`);
  return res.json();
};

export const fetchVehicleHistory = async (
  vehicleId: string,
  start: string,
  end: string,
): Promise<TelemetryResponse[]> => {
  const res = await fetch(
    `${API_URL}/history/${vehicleId}?start=${start}&end=${end}`,
  );
  return res.json();
};
