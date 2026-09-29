import type { Vehicle } from "./telemetry.type";

export interface PanelStatusProps {
  total: number;
  visible: number;
  noSignal: number;
}

export interface PanelVehiclesProps {
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
  setPopupTop: React.Dispatch<React.SetStateAction<number>>;
  setPopup: React.Dispatch<React.SetStateAction<string | null>>;
  popup: string | null;
}
export interface VehiclesCardProps {
  v: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  setPopupTop: React.Dispatch<React.SetStateAction<number>>;
  setPopup: React.Dispatch<React.SetStateAction<string | null>>;
  popup: string | null;
}
