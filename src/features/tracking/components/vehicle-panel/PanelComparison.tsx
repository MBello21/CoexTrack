import { ArrowLeftRight, ListFilter, Settings } from "lucide-react";

export const PanelComparison = () => {
  return (
    <div className="px-4 py-1 flex justify-between">
      <button className="flex gap-2 justify-center items-center leading-none font-semibold uppercase text-[12px] p-2 hover:bg-neutral-300 hover:rounded-md">
        <ArrowLeftRight className="h-4 w-4 items-center shrink-0" />
        <span className="leading-none">Comparar</span>
      </button>
      <div className="flex gap-2 items-center">
        <button className="hover:bg-neutral-300 hover:rounded-full p-1">
          <ListFilter className="h-4 w-4" />
        </button>
        <button className="hover:bg-neutral-300 hover:rounded-full p-1">
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
