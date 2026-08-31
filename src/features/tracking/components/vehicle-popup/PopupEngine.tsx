import type { PopupEngineProps } from "../../types/vehicle-popup.type"


export const PopupEngine = ({ engine_type, battery_voltage }: PopupEngineProps) => {
    return (
        <div className="mt-3 border-t border-neutral-200 flex justify-around text-[13px]">
            <div className="border-r border-neutral-200 w-50 px-2 py-1 mt-1">
                <p className="font-semibold">Combustible</p>
                <div className="flex items-center gap-2 ">
                    <i className="fa-solid fa-gas-pump"></i>
                    <p>{engine_type}</p>
                </div>
            </div>
            <div className="w-50 px-2 py-1 mt-1 text-[13px]">
                <p className="font-body font-semibold ">LM Battery</p>
                <div className="flex items-center gap-2 ">
                    <i className="fa-solid fa-car-battery text-green-500"></i>
                    <p className="">{battery_voltage}V</p>
                </div>
            </div>
        </div>
    )
}
