import type { Vehicle } from "./telemetry.type";

export interface MapProps {
  vehicles: Vehicle[];
  selected: Vehicle | null;
}