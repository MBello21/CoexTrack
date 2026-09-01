import { useState } from "react";
import { Map } from "./components/Map";
import { VehiclePanel } from "./components/vehicle-panel/VehiclePanel";
// import { MOCK_VEHICLES } from './mock/vehicles-position.mock'
import type { Vehicle } from "./types/telemetry.type";
// import { useSimulatedVehicles } from './hooks/useSimulatedVehicles'
import { useVehicles } from "./hooks/useVehicles";

export const TrackingPage = () => {
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const vehicles = useVehicles();
  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      <VehiclePanel vehicles={vehicles} onSelect={setSelected} />
      <Map vehicles={vehicles} selected={selected} />
    </div>
  );
};
