import { useLocation } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import type { NavItem } from "../types/sidebar-items.type";



export const useSidebarNav = () => {
    const { pathname } = useLocation();
    const { open } = useSidebar();

    const isActive = (item: NavItem) =>
        item.children.some((child) => pathname.startsWith(child.path));

    return {
        open,
        isActive,
        pathname,
    }
}
