import type { VehicleStatus } from "./telemetry.type"

export interface PopupHeaderProps {
    vStatus: VehicleStatus
    timestamp: string | null
}

export interface PopupLocDriverProps {
    driver: string | null,
    last_address: string | null
}

export interface PopupSpeedProps {
    speed: number | null
}

export interface PopupEngineProps {
    engine_type: string | null
    battery_voltage: number | null
}

export interface PopupTCUProps {
    battery_voltage: number | null
}