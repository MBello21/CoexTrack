import { ChevronDown } from "lucide-react";
import { NAVIGATION } from "../../../constants/sidebar-items.constants";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import type { NavItem } from "../types/sidebar-items.type";

export const SidebarBody = () => {
  const { pathname } = useLocation();
  const { open } = useSidebar();

  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [popup, setPopup] = useState<string | null>(null);

  useEffect(() => {
    if (!popup) return;
    const close = () => setPopup(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [popup]);

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

  const isActive = (item: NavItem) =>
    item.children.some((child) => pathname.startsWith(child.path));

  return (
    <div className={`${open ? " ps-3 " : "p-0"} py-1`}>
      <ul>
        {NAVIGATION.map((item) => {
          const Icon = item.icon;
          const isOpen = expanded.has(item.label);
          const btnClass = [
            "flex gap-2 w-full mb-1 rounded-sm",
            open ? "px-2 py-1" : "px-0 py-1 justify-center items-center",
            isActive(item) && !isOpen ? "bg-neutral-700" : "",
          ].join(" ");
          return (
            <li key={item.label} className="relative">
              <button
                className={btnClass}
                onClick={(e) => {
                  e.stopPropagation();
                  if (open) {
                    toggle(item.label);
                  } else {
                    setPopup(popup === item.label ? null : item.label);
                  }
                }}
              >
                <Icon />
                {open && (
                  <>
                    <span className="w-full text-start">{item.label}</span>
                    <ChevronDown
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </>
                )}
              </button>
              {open && isOpen && (
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} `}
                >
                  <ul className="p-2 rounded-sm ms-4 me-4 overflow-hidden">
                    {item.children.map((child) => (
                      <li
                        className={`${child.path === pathname ? "bg-neutral-700 " : ""} px-2 py-1 rounded-sm `}
                        key={child.path}
                      >
                        <Link to={child.path}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!open && popup === item.label && (
                <div className="absolute left-full top-1 ml-4 bg-surface border border-surface-border rounded-card shadow-card p-2 z-50 min-w-40">
                  <p className="text-xs text-neutral-200 mb-2">{item.label}</p>
                  <ul className="space-y-1">
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <Link
                          to={child.path}
                          onClick={() => setPopup(null)}
                          className="block py-1.5 px-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-raised rounded-btn"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
