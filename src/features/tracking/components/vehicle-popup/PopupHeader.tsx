import type { PopupHeaderProps } from "../../types/vehicle-popup.type"
import { Settings } from "lucide-react"
import { formatDateTime } from "../../../../shared/helpers/format-date-time.helper"
import { BadgeStatus } from "../../../../shared/components/ui/BadgeStatus"

export const PopupHeader = ({ vStatus, timestamp }: PopupHeaderProps) => {
    return (
        <div className="flex justify-between items-center gap-2 text-neutral-700">
            <BadgeStatus state={vStatus} />
            <p className="w-50 text-start font-body text-[13px] font-semibold">
                {formatDateTime(timestamp)}
            </p>
            <button>
                <Settings />
            </button>
        </div>
    )
}
