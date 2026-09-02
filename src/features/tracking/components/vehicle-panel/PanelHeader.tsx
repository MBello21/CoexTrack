import { CustomDropdown } from "../../../../shared/components/ui/CustomDropdown";


export const PanelHeader = () => {
  return (
    <div className="mt-4 mb-4 mx-4">
      <div className="relative w-full">
        <span>
          <i className="fa-solid fa-magnifying-glass  absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"></i>
        </span>
        <input
          type="text"
          name=""
          id=""
          className="pl-9 pr-3 py-2 w-full rounded-btn border border-surface-border text-sm "
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10001">
          <CustomDropdown />
        </div>
      </div>
    </div>
  );
};
