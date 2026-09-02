import { Icon } from "@mdi/react";
import { VEHICLE_ICON } from "../../constants/vehicle-icons.constant";
import { VEHICLE_STATUS } from "../../constants/vehicle-status.constants";

export interface VehicleIconsProps {
    vehicle_type: string;
    state: string;
}

export const VehicleIcon = ({ vehicle_type, state }: VehicleIconsProps) => {
    const config = VEHICLE_STATUS[state] ?? VEHICLE_STATUS["no_signal"];
    const iconPath = VEHICLE_ICON[vehicle_type] ?? VEHICLE_ICON["Turismo"]
    return (
        <span className={`inline-flex items-center justify-center gap-2 p-2 rounded-full text-white  ${config.bg_icon}`}>

            <Icon path={iconPath} size={1.3} />

        </span>
    )
}

