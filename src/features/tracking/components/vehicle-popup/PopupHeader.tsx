import type { PopupHeaderProps } from "../../types/vehicle-popup.type"
import { Settings } from "lucide-react"
import { STATUS_COLOR, STATUS_LABEL } from "../../../../shared/constants/vehicles-variables.constant"
import { formatDateTime } from "../../../../shared/helpers/format-date-time.helper"

export const PopupHeader = ({ vStatus, timestamp }: PopupHeaderProps) => {
    return (
        <div className="flex justify-between items-center gap-2 text-neutral-700">
            <p
                style={{ backgroundColor: STATUS_COLOR[vStatus] }}
                className="rounded-full text-center text-white uppercase font-semibold font-body text-xs px-2 py-1 w-25"
            >
                {STATUS_LABEL[vStatus]}
            </p>
            <p className="w-50 text-start font-body text-[13px] font-semibold">
                {formatDateTime(timestamp)}
            </p>
            <button>
                <Settings />
            </button>
        </div>
    )
}
