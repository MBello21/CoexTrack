import { useEffect, useState } from "react";
import type { Vehicle } from "../types/telemetry.type";

interface Props {
    vehicles: Vehicle[]
}

export const useVehiclePanel = ({ vehicles }: Props) => {
    const [popup, setPopup] = useState<string | null>(null);
    const [popupTop, setPopupTop] = useState(0);

    useEffect(() => {
        if (!popup) return;
        const close = () => setPopup(null);
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [popup]);

    const total = vehicles.length;
    const visible = vehicles.filter(v => v.lat != null && v.lon != null && v.sats != null && v.sats > 0).length;
    const noSignal = total - visible;

    return {
        popup,
        setPopup,
        popupTop,
        setPopupTop,
        total,
        visible,
        noSignal
    }
}