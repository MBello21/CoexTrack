import { VehicleIcon } from "../../../../shared/components/ui/VehicleIcon";


import type { VehiclesCardProps } from "../../types/vehicle-panel.types";

export const VehicleCard = ({
  onSelect,
  v,
  setPopup,
  popup,
  setPopupTop,
}: VehiclesCardProps) => {

  return (
    <div
      key={v.device_id}
      onClick={() => {
        onSelect(v);
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        setPopupTop(rect.top);
        setPopup(popup === v.device_id ? null : v.device_id);
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
        <VehicleIcon vehicle_type={v.vehicle_type ?? 'Turismo'} state={v.status} />
        <div>
          <p className="uppercase font-semibold text-xs font-body">
            {v.device_id}
          </p>
          <p className="uppercase font-medium font- text-md">{v.plate}</p>
        </div>
      </div>

      {
        v.alert && (
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
        )
      }
    </div >
  );
};
