import type { PopupSpeedProps } from "../../types/vehicle-popup.type"


export const PopupSpeed = ({ speed }: PopupSpeedProps) => {
    return (
        <div className="bg-neutral-200 py-2 px-2 grid grid-cols-3  justify-around mt-3">
            <div className="text-center text-[13px] ">
                <p className="font-semibold uppercase">
                    {speed ? `${speed} km/h` : "- -"}
                </p>
                <p className="text-[13px]">Velocidad</p>
            </div>
            <div className="text-center text-[13px]">
                <p className="font-semibold uppercase "> - - </p>
                <p className="text-[13px]">Velocidad de carretera</p>
            </div>
            <div className="text-center text-[13px]">
                <p className="font-semibold uppercase "> - - </p>
                <p>Odómetro</p>
            </div>
        </div>
    )
}
