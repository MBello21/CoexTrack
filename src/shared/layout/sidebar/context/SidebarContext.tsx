// src/context/SidebarContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

type SidebarCtx = {
    open: boolean;
    toggle: () => void;
};

const Ctx = createContext<SidebarCtx>(null!);

export const useSidebar = () => useContext(Ctx);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <Ctx.Provider value={{ open, toggle: () => setOpen((v) => !v) }}>
            {children}
        </Ctx.Provider>
    );
}