import type { NavItem } from "../types/sidebar-items.type";
import { NAVIGATION } from "../../../constants/sidebar-items.constants";
import { useEffect, useRef, useState } from "react";
import { ItemPopup } from "./ItemPopup";

export interface SidebarCollapsedProps {
    isActive: (item: NavItem) => boolean;
}


export const SidebarCollapsed = ({ isActive }: SidebarCollapsedProps) => {
    const [popup, setPopup] = useState<string | null>(null);
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    useEffect(() => {
        if (!popup) return;
        const close = () => setPopup(null);
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [popup]);

    return (
        <div className='py-1 h-full'>
            <ul >
                {NAVIGATION.map((item) => {
                    const Icon = item.icon;
                    const btnClass = `flex gap-2 w-full mb-1 rounded-sm px-0 py-1 justify-center items-center ${isActive(item) ? "bg-neutral-700" : ""}`;
                    return (
                        <li key={item.label} className="relative">
                            <button
                                ref={(el) => { buttonRefs.current[item.label] = el; }}
                                className={btnClass}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setPopup(popup === item.label ? null : item.label);
                                }}
                            >
                                <Icon />
                            </button>

                            {popup === item.label && (() => {
                                const rect = buttonRefs.current[item.label]?.getBoundingClientRect();
                                if (!rect) return null;
                                return <ItemPopup
                                    item={item}
                                    rect={rect}
                                    onClose={() => setPopup(null)} />
                            })()}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
