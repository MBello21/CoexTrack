import type { Vehicle } from "../types/telemetry.type";
import { Settings, User } from "lucide-react";
import { formatDateTime } from "../../../shared/helpers/format-date-time.helper";
import {
  STATUS_COLOR,
  STATUS_LABEL,
} from "../../../shared/constants/vehicles-variables.constant";
import { BatteryIcon } from "../../../shared/components/BatteryIcon";
import { useSidebar } from "../../../shared/layout/sidebar/context/SidebarContext";

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

  const getBatteryPercent = (voltage: number | null): number => {
    if (voltage == null) return 0;
    if (voltage >= 12.7) return 100;
    if (voltage <= 11.9) return 0;
    return Math.round(((voltage - 11.9) / (12.7 - 11.9)) * 100);
  };

  return (
    <div
      style={{ top }}
      className={`fixed ${!open ? "left-93" : "left-135"} bg-white rounded-br-md rounded-tr-md shadow-card p-4 z-50 w-95 font-body`}
      onMouseEnter={() => onEnter}
      onMouseLeave={() => onLeave}
    >
      <div className="flex justify-between items-center gap-2 text-neutral-700">
        <p
          style={{ backgroundColor: STATUS_COLOR[vehicle.status] }}
          className="rounded-full text-center text-white uppercase font-semibold font-body text-xs px-2 py-1 w-25"
        >
          {STATUS_LABEL[vehicle.status]}
        </p>
        <p className="w-50 text-start font-body text-[13px] font-semibold">
          {formatDateTime(vehicle.timestamp)}
        </p>
        <button>
          <Settings />
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <p className="flex items-center border border-neutral-300 rounded-md w-auto max-w-50 px-1 text-[13px]">
          <User className="h-4 w-4 me-2" />
          {vehicle.driver ?? "Sin conductor vinculado"}
        </p>
        <p className="flex items-center gap-2  w-auto px-1 text-[13px] ">
          <i className="fa-solid fa-location-dot text-lg text-neutral-500"></i>
          {vehicle.last_address}
        </p>
      </div>
      <div className="bg-neutral-200 py-2 px-2 grid grid-cols-3  justify-around mt-3">
        <div className="text-center ">
          <p className="font-semibold uppercase">
            {vehicle.speed ? `${vehicle.speed} km/h` : "- -"}
          </p>
          <p className="">Velocidad</p>
        </div>
        <div className="text-center text-[13px]">
          <p className="font-semibold uppercase "> - - </p>
          <p className="text-[13px]">Velocidad de carretera</p>
        </div>
        <div className="text-center text-[13px]">
          <p className="font-semibold uppercase "> - - </p>
          <p>Odómetro</p>
        </div>
      </div>
      <div className="mt-3 border-t border-neutral-200 flex justify-around text-[13px]">
        <div className="border-r border-neutral-200 w-50 px-2 py-1 mt-1">
          <p className="font-semibold">Combustible</p>
          <div className="flex items-center gap-2 ">
            <i className="fa-solid fa-gas-pump"></i>
            <p>{vehicle.engine_type}</p>
          </div>
        </div>
        <div className="w-50 px-2 py-1 mt-1 text-[13px]">
          <p className="font-body font-semibold ">LM Battery</p>
          <div className="flex items-center gap-2 ">
            <i className="fa-solid fa-car-battery text-green-500"></i>
            <p className="">{vehicle.battery_voltage}V</p>
          </div>
        </div>
      </div>
      <div className="mt-3 border-t border-neutral-200 px-2 text-[13px]">
        <p className="font-body font-semibold py-1 ">Geofences Actuales</p>
        <p className="">
          Este vehículo no se encuentra actualmente dentro de una geofences
        </p>
      </div>
      <div className="mt-3 border-t border-neutral-200 px-2 text-[13px]">
        <p className="font-body font-semibold py-1 ">
          Unidad de control telemático (TCU)
        </p>
        <div className="flex justify-between">
          <p className="">Batería de TCU</p>
          <BatteryIcon
            percent={getBatteryPercent(vehicle.battery_voltage)}
            voltage={vehicle.battery_voltage}
          />
        </div>
      </div>
    </div>
  );
};
