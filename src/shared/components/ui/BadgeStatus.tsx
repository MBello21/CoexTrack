import { VEHICLE_STATUS } from "../../constants/vehicle-status.constants";
import type { BadgeStateProps } from "../../types/badge-state.interface";

export const BadgeStatus: React.FC<BadgeStateProps> = ({ state }) => {
  const config = VEHICLE_STATUS[state] ?? VEHICLE_STATUS["no_signal"];


  return (
    <span className={`inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full text-xs font-display font-medium w-30 ${config.bg} ${config.text}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      {config.label}

    </span>
  )
}
