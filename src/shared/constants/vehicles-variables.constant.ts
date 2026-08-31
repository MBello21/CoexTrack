import type { VehicleStatus } from "../../features/tracking/types/telemetry.type";

export const STATUS_LABEL: Record<VehicleStatus, string> = {
  no_signal: "Sin señal",
  in_transit: "En tránsito",
  operating: "Operando",
  ignition_off: "Ignicion off",
  stationary: "Parado",
};

export const STATUS_COLOR: Record<VehicleStatus, string> = {
  no_signal: "#9CA3AF",
  ignition_off: "#6B7280",
  in_transit: "#22C55E",
  operating: "#F59E0B",
  stationary: "#3B82F6",
};

// const getBatteryColor = (voltage: number | null | undefined): string => {
//   if (voltage == null) return "#9CA3AF";
//   if (voltage < 11.0) return "#EF4444";
//   if (voltage < 11.5) return "#F59E0B";
//   return "#22C55E";
// };

// const getBatteryLabel = (voltage: number | null | undefined): string => {
//   if (voltage == null) return "Sin datos";
//   return `${voltage.toFixed(1)}V`;
// };
