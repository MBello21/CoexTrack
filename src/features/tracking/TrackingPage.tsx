import { useState } from "react";
import { Map } from "./components/Map";
import { VehiclePanel } from "./components/vehicle-panel/VehiclePanel";
import type { Vehicle } from "./types/telemetry.type";
import { useVehicleContext } from "../../shared/context/VehiclesContext";

export const TrackingPage = () => {
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const vehicles = useVehicleContext();
  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      <VehiclePanel vehicles={vehicles} onSelect={setSelected} />
      <Map vehicles={vehicles} selected={selected} />
    </div>
  );
};
