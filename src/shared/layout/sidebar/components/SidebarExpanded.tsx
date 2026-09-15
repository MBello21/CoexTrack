import { ChevronDown } from "lucide-react";
import { NAVIGATION } from "../../../constants/sidebar-items.constants";
import { Link } from "react-router";
import { useState } from "react";
import type { NavItem } from "../types/sidebar-items.type";


export interface SidebarExpendedProps {
    isActive: (item: NavItem) => boolean;
    pathname: string;
}


export const SidebarExpanded = ({ isActive, pathname }: SidebarExpendedProps) => {
    const [expanded, setExpanded] = useState<Set<string>>(new Set());

    const toggle = (label: string) => {
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(label)) {
                next.delete(label);
            } else {
                next.add(label);
            }
            return next;
        });
    };

    return (
        <div className="ps-3 h-full overflow-y-auto overflow-x-hidden scrollbar-none">
            <ul >
                {NAVIGATION.map((item) => {
                    const Icon = item.icon;
                    const isOpen = expanded.has(item.label);
                    const btnClass = `flex gap-2 w-full rounded-sm mb-1 px-2 py-1 ${isActive(item) && !isOpen ? "bg-neutral-700" : ""}`;
                    return (
                        <li key={item.label} className="relative">
                            <button

                                className={btnClass}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggle(item.label);
                                }}
                            >
                                <Icon />
                                <span className="w-full text-start">{item.label}</span>
                                <ChevronDown
                                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                <ul className="rounded-sm ms-4 me-4 overflow-hidden">
                                    {item.children.map((child) => (
                                        <li className={`${child.path === pathname ? "bg-neutral-700" : ""} px-2 py-1 rounded-sm`}
                                            key={child.path}>
                                            <Link to={child.path}>{child.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
