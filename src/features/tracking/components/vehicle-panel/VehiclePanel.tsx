import type { Vehicle } from "../../types/telemetry.type";
import { VehiclePopup } from "../vehicle-popup/VehiclePopup";
import { useVehiclePanel } from "../../hooks/useVehiclePanel";
import { PanelHeader } from "./PanelHeader";
import { PanelStatus } from "./PanelStatus";
import { PanelVehicles } from "./PanelVehicles";
import { PanelComparison } from "./PanelComparison";

interface Props {
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
}

export const VehiclePanel = ({ vehicles, onSelect }: Props) => {
  const { popup, setPopup, popupTop, setPopupTop, total, visible, noSignal } =
    useVehiclePanel({ vehicles });

  return (
    <div className="absolute flex flex-col top-0 left-0 w-78 h-screen bg-white z-1000 font-body ">
      <PanelHeader />
      <PanelStatus total={total} visible={visible} noSignal={noSignal} />
      <div className=" w-full h-px bg-neutral-300 self-center" />
      <PanelComparison />
      <PanelVehicles
        vehicles={vehicles}
        setPopupTop={setPopupTop}
        setPopup={setPopup}
        onSelect={onSelect}
        popup={popup}
      />
      {popup &&
        (() => {
          const v = vehicles.find((x) => x.vehicle_id === popup);
          if (!v) return null;
          return (
            <VehiclePopup
              vehicle={v}
              top={popupTop}
              onEnter={() => setPopup(popup)}
              onLeave={() => setPopup(null)}
            />
          );
        })()}
    </div>
  );
};
