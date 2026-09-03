import type { PanelVehiclesProps } from "../../types/vehicle-panel.types";
import { VehicleCard } from "./VehicleCard";

export const PanelVehicles = ({
  vehicles,
  onSelect,
  setPopupTop,
  setPopup,
  popup,
}: PanelVehiclesProps) => {
  return (
    <div className="flex-1 overflow-y-auto ">
      {vehicles.map((v) => {
        return (
          <VehicleCard
            key={v.device_id}
            v={v}
            onSelect={onSelect}
            setPopup={setPopup}
            setPopupTop={setPopupTop}
            popup={popup}
          />
        );
      })}
    </div>
  );
};
