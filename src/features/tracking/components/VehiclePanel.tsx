import { IconCar } from "../../../shared/constants/svg-vehicles.constants";
import { VEHICLE_ICON } from "../../../shared/constants/vehicle-icons.constant";
import type { Vehicle } from "../types/telemetry.type";
import { VehiclePopup } from "./vehicle-popup/VehiclePopup";
import { STATUS_COLOR } from "../../../shared/constants/vehicles-variables.constant";
import { CustomDropdown } from "../../../shared/components/CustomDropdown";
import { ArrowLeftRight, ListFilter, Settings } from "lucide-react";
import { useVehiclePanel } from "../hooks/useVehiclePanel";

interface Props {
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
}

export const VehiclePanel = ({ vehicles, onSelect }: Props) => {
  const { popup,
    setPopup,
    popupTop,
    setPopupTop,
    total,
    visible,
    noSignal } = useVehiclePanel({ vehicles })

  return (
    <div className="absolute flex flex-col top-0 left-0 w-78 h-screen bg-white z-1000 font-body ">
      <div className="mt-4 mb-4 mx-4">
        <div className="relative w-full">
          <span><i className="fa-solid fa-magnifying-glass  absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"></i></span>
          <input type="text" name="" id="" className="pl-9 pr-3 py-2 w-full rounded-btn border border-surface-border text-sm " />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10001">
            <CustomDropdown />
          </div>
        </div>
      </div>
      <div className="mt-4 mb-2 flex justify-around">
        <div className="flex gap-2 py-2 px-2 w-auto">
          <div className="text-center ">
            <span className="text-[16px] font-semibold">{total}</span>
            <p className="text-xs text-neutral-500">Vehículos</p>
          </div>
          <div className="w-px h-8 ml-2 bg-neutral-300 self-center" />
        </div>
        <div className="flex gap-2 py-2 px-2 w-auto">
          <div className="text-center ">
            <span className="text-[16px] font-semibold">{visible}</span>
            <p className="text-xs text-neutral-500">Visiibilidad</p>
          </div>
          <div className="w-px h-8 ml-2 bg-neutral-300 self-center" />
        </div>
        <div className="flex gap-2 py-2 px-2 w-auto">
          <div className="text-center ">
            <span className="text-[16px] font-semibold">{noSignal}</span>
            <p className="text-xs text-neutral-500 whitespace-nowrap">Visibilidad perdida</p>
          </div>
        </div>
      </div>
      <div className=" w-full h-px bg-neutral-300 self-center" />
      <div className="px-4 py-1 flex justify-between">
        <button className="flex gap-2 justify-center items-center leading-none font-semibold uppercase text-[12px] p-2 hover:bg-neutral-300 hover:rounded-md">
          <ArrowLeftRight className="h-4 w-4 items-center shrink-0" />
          <span className="leading-none">Comparar</span>
        </button>
        <div className="flex gap-2 items-center">
          <button className="hover:bg-neutral-300 hover:rounded-full p-1">
            <ListFilter className="h-4 w-4" />
          </button>
          <button className="hover:bg-neutral-300 hover:rounded-full p-1">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto ">
        {vehicles.map((v) => {
          const Icon = VEHICLE_ICON[v.vehicle_type ?? ""] ?? IconCar;

          return (
            <div
              key={v.vehicle_id}
              onClick={() => {
                onSelect(v);
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                setPopupTop(rect.top);
                setPopup(popup === v.vehicle_id ? null : v.vehicle_id);
              }}
              onMouseLeave={() => {
                setPopup(null);
              }}
              style={{
                padding: "12px",

                background: v.alert ? "#FEF2F2" : "white",
              }}
              className="relative border-b border-neutral-300 cursor-pointer"
            >
              <div className=" flex gap-5 items-center">
                <div
                  className=" flex items-center justify-center h-14 w-14 rounded-full p-1"
                  style={{ backgroundColor: STATUS_COLOR[v.status] }}
                >
                  <Icon className="w-14 h-14 " />
                </div>
                <div>
                  <p className="uppercase font-semibold text-xs font-body">
                    {v.vehicle_id}
                  </p>
                  <p className="uppercase font-medium font- text-md">
                    {v.plate}
                  </p>
                </div>
              </div>

              {v.alert && (
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "12px",
                    color: "#EF4444",
                    fontWeight: "bold",
                  }}
                >
                  ⚠️{" "}
                  {v.alert === "bateria_critica_en_operacion"
                    ? "Batería crítica en operación"
                    : "Batería baja"}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {
        popup &&
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
        })()
      }
    </div >
  );
};
