import { IconCar } from "../../../shared/constants/svg-vehicles.constants";
import { VEHICLE_ICON } from "../../../shared/constants/vehicle-icons.constant";
import type { Vehicle, VehicleStatus } from "../types/telemetry.type";

interface Props {
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
}

// const STATUS_LABEL: Record<VehicleStatus, string> = {
//   no_signal: "Sin señal",
//   in_transit: "En tránsito",
//   operating: "Operando en vía",
//   ignition_off: "No ignicion",
//   stationary: "Parado",
// };

const STATUS_COLOR: Record<VehicleStatus, string> = {
  no_signal: "#9CA3AF",
  ignition_off: "#6B7280",
  in_transit: "#22C55E",
  operating: "#F59E0B",
  stationary: "#3B82F6",
};

// const getBatteryColor = (voltage: number | null | undefined): string => {
//   if (voltage == null) return "#9CA3AF";
//   if (voltage < 11.0) return "#EF4444";
//   if (voltage < 11.5) return "#F59E0B";
//   return "#22C55E";
// };

// const getBatteryLabel = (voltage: number | null | undefined): string => {
//   if (voltage == null) return "Sin datos";
//   return `${voltage.toFixed(1)}V`;
// };

export const VehiclePanel = ({ vehicles, onSelect }: Props) => {
  return (
    <div className="absolute top-0 left-0 w-75 h-screen bg-neutral-100 z-1000 overflow-y-auto">
      <h2 style={{ margin: "0 0 16px" }}>Flota COEX</h2>
      {vehicles.map((v) => {
        const Icon = VEHICLE_ICON[v.vehicle_type ?? ""] ?? IconCar;

        return (
          <div
            key={v.vehicle_id}
            onClick={() => onSelect(v)}
            style={{
              padding: "12px",

              background: v.alert ? "#FEF2F2" : "white",
            }}
            className="border-b border-neutral-300 cursor-pointer"
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
      })}
    </div>
  );
};
