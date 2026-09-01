import { IconCar } from "../../../../shared/constants/svg-vehicles.constants";
import { VEHICLE_ICON } from "../../../../shared/constants/vehicle-icons.constant";
import { STATUS_COLOR } from "../../../../shared/constants/vehicles-variables.constant";
import type { VehiclesCardProps } from "../../types/vehicle-panel.types";

export const VehicleCard = ({
  onSelect,
  v,
  setPopup,
  popup,
  setPopupTop,
}: VehiclesCardProps) => {
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
          <p className="uppercase font-medium font- text-md">{v.plate}</p>
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
};
