import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import type { TelemetryResponse, Vehicle } from "../../features/tracking/types/telemetry.type"
import { fetchLatestPositions } from "../../features/tracking/services/telemetry-api.service";

const VehicleContext = createContext<Vehicle[] | null>(null!)


const WS_URL = import.meta.env.VITE_WS_URL;
const MAX_TRAIL = 50;
const getStatus = (data: TelemetryResponse): Vehicle["status"] => {
    if (data.timestamp == null || data.sats == null || data.sats === 0)
        return "no_signal";
    if (!data.ignition) return "ignition_off";
    if (data.aspa_active) return "operating";
    if (data.speed != null && data.speed > 0) return "in_transit";
    return "stationary";
};

const toVehicle = (data: TelemetryResponse, existing?: Vehicle): Vehicle => {
    const trail: [number, number][] = existing
        ? data.lat != null && data.lon != null
            ? [...existing.trail, [data.lat, data.lon] as [number, number]].slice(
                -MAX_TRAIL,
            )
            : existing.trail
        : data.lat != null && data.lon != null
            ? [[data.lat, data.lon] as [number, number]]
            : [];

    return { ...existing, ...data, status: getStatus(data), trail };
};

export const VehicleProvider = ({ children }: { children: ReactNode }) => {



    const [vehicles, setVehicles] = useState<Map<string, Vehicle>>(new Map());
    const wsRef = useRef<WebSocket | null>(null);

    // Carga inicial
    useEffect(() => {
        fetchLatestPositions().then((data) => {
            const map = new Map<string, Vehicle>();
            data.forEach((d) => map.set(d.vehicle_id, toVehicle(d)));
            setVehicles(map);
        });
    }, []);

    // WebSocket para actualizaciones
    useEffect(() => {
        let cancelled = false;

        const connect = () => {
            if (cancelled) return;

            const ws = new WebSocket(WS_URL);
            wsRef.current = ws;

            ws.onopen = () => {
                const pingInterval = setInterval(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send("ping");
                    } else {
                        clearInterval(pingInterval);
                    }
                }, 10000);
            };

            ws.onmessage = (event) => {
                const data: TelemetryResponse = JSON.parse(event.data);
                setVehicles((prev) => {
                    const next = new Map(prev);
                    next.set(data.vehicle_id, toVehicle(data, prev.get(data.vehicle_id)));
                    return next;
                });
            };

            ws.onclose = () => {
                if (!cancelled) setTimeout(connect, 4500);
            };
        };

        connect();

        return () => {
            cancelled = true;
            wsRef.current?.close();
        };
    }, []);
    return (
        <VehicleContext.Provider value={Array.from(vehicles.values())}>
            {children}
        </VehicleContext.Provider>
    )
};

export const useVehicleContext = () => {
    const context = useContext(VehicleContext);
    if (!context) throw new Error("useVehicleContext must be used within VehicleProvider");
    return context;
};


