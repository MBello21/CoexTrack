import { createPortal } from "react-dom";
import type { NavItem } from "../types/sidebar-items.type";
import { Link } from "react-router";

export interface itemPopup {
    rect: DOMRect;
    item: NavItem;
    onClose: () => void
}


export const ItemPopup = ({ rect, item, onClose }: itemPopup) => {
    return createPortal(
        <div
            onMouseDown={(e) => e.stopPropagation()}
            style={{
                position: "fixed",
                top: rect.top,
                left: rect.right + 16,
                zIndex: 9999,
            }}
            className="bg-surface border border-surface-border rounded-card shadow-card p-2 min-w-40"
        >
            <p className="text-xs text-neutral-200 mb-2">{item.label}</p>
            <ul className="space-y-1">
                {item.children.map((child) => (
                    <li key={child.path}>
                        <Link
                            to={child.path}
                            onClick={onClose}
                            className="block py-1.5 px-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-raised rounded-btn"
                        >
                            {child.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>,
        document.body
    );
}
