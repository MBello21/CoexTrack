import type { PopupLocDriverProps } from "../../types/vehicle-popup.type"
import { User } from "lucide-react"

export const PopupDriverLocation = ({ driver, last_address }: PopupLocDriverProps) => {
    return (
        <div className="flex flex-col gap-2 mt-3">
            <p className="flex items-center border border-neutral-300 rounded-md w-auto max-w-50 px-1 text-[13px]">
                <User className="h-4 w-4 me-2" />
                {driver ?? "Sin conductor vinculado"}
            </p>
            <p className="flex items-center gap-2  w-auto  text-[13px] ">
                <i className="fa-solid fa-location-dot text-lg text-neutral-500"></i>
                {last_address ?? "Sin ubicación"}
            </p>
        </div>
    )
}
