import type { PopupTCUProps } from "../../types/vehicle-popup.type"

import { getBatteryPercent } from "../../../../shared/helpers/get-batery-percent"
import { BatteryIcon } from "../../../../shared/components/ui/BatteryIcon"


export const PopupTCU = ({ battery_voltage }: PopupTCUProps) => {
    return (
        <div className="mt-3 border-t border-neutral-200 px-2 text-[13px]">
            <p className="font-body font-semibold py-1 ">
                Unidad de control telemático (TCU)
            </p>
            <div className="flex justify-between">
                <p className="">Batería de TCU</p>
                <BatteryIcon
                    percent={getBatteryPercent(battery_voltage)}
                    voltage={battery_voltage}
                />
            </div>
        </div>
    )
}
