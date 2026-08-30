import type { SVGProps } from "react";
import {
  IconCar,
  IconFlatbed,
  IconTruck,
  IconVan,
  IconVanLarge,
} from "./svg-vehicles.constants";

export const VEHICLE_ICON: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  Furgón: IconVanLarge,
  Furgoneta: IconVan,
  Turismo: IconCar,
  "Caja abierta": IconFlatbed,
  Camión: IconTruck,
};
