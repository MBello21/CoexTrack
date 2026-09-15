
import { useSidebarNav } from "../hooks/useSidebarNav";
import { SidebarExpanded } from "./SidebarExpanded";
import { SidebarCollapsed } from "./SidebarCollapsed";

export const SidebarBody = () => {
  const { open,
    isActive,
    pathname,
  } = useSidebarNav();

  return open ? <SidebarExpanded isActive={isActive} pathname={pathname} /> : <SidebarCollapsed isActive={isActive} />

};
