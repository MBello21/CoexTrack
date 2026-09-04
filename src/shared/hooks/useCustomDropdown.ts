import { useEffect, useState } from "react";

export const useCustomDropdown = () => {
    const [dropOpen, setDropOpen] = useState(false);
    const [filter, setFilter] = useState({ label: "Flota", value: "flota" });

    useEffect(() => {
        if (!dropOpen) return;
        const close = () => setDropOpen(false);
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [dropOpen]);

    return {
        dropOpen,
        setDropOpen,
        filter,
        setFilter,
    }
}