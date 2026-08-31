import type { Vehicle } from "../../types/telemetry.type";
import { useSidebar } from "../../../../shared/layout/sidebar/context/SidebarContext";
import { PopupHeader } from "./PopupHeader";
import { PopupDriverLocation } from "./PopupDriverLocation";
import { PopupSpeed } from "./PopupSpeed";
import { PopupEngine } from "./PopupEngine";
import { PopupGeofences } from "./PopupGeofences";
import { PopupTCU } from "./PopupTCU";
import { useEffect, useRef } from "react";


export const VehiclePopup = ({
  vehicle,
  top,
  onEnter,
  onLeave,
}: {
  vehicle: Vehicle;
  top: number;
  onEnter: () => void;
  onLeave: () => void;
}) => {
  const { open } = useSidebar();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!popupRef.current) return;
    const rect = popupRef.current.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
      popupRef.current.style.top = `${top - (rect.bottom - window.innerHeight) - 10}px`;
    }
  }, [top]);

  return (
    <div
      style={{ top }}
      ref={popupRef}
      className={`fixed ${!open ? "left-93" : "left-135"} bg-white rounded-br-md rounded-tr-md shadow-card p-4 z-50 w-95 font-body`}
      onMouseEnter={() => onEnter()}
      onMouseLeave={() => onLeave()}
    >
      <PopupHeader vStatus={vehicle.status} timestamp={vehicle.timestamp} />
      <PopupDriverLocation driver={vehicle.driver} last_address={vehicle.last_address} />
      <PopupSpeed speed={vehicle.speed} />
      <PopupEngine engine_type={vehicle.engine_type} battery_voltage={vehicle.battery_voltage} />
      <PopupGeofences />
      <PopupTCU battery_voltage={vehicle.battery_voltage} />
    </div>
  );
};
