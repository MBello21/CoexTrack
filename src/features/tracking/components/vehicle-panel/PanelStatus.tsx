import type { PanelStatusProps } from "../../types/vehicle-panel.types";

export const PanelStatus = ({ total, visible, noSignal }: PanelStatusProps) => {
  return (
    <div className="mt-4 mb-2 flex justify-around">
      <div className="flex gap-2 py-2 px-2 w-auto">
        <div className="text-center ">
          <span className="text-[16px] font-semibold">{total}</span>
          <p className="text-xs text-neutral-500">Vehículos</p>
        </div>
        <div className="w-px h-8 ml-2 bg-neutral-300 self-center" />
      </div>
      <div className="flex gap-2 py-2 px-2 w-auto">
        <div className="text-center ">
          <span className="text-[16px] font-semibold">{visible}</span>
          <p className="text-xs text-neutral-500">Visiibilidad</p>
        </div>
        <div className="w-px h-8 ml-2 bg-neutral-300 self-center" />
      </div>
      <div className="flex gap-2 py-2 px-2 w-auto">
        <div className="text-center ">
          <span className="text-[16px] font-semibold">{noSignal}</span>
          <p className="text-xs text-neutral-500 whitespace-nowrap">
            Visibilidad perdida
          </p>
        </div>
      </div>
    </div>
  );
};
