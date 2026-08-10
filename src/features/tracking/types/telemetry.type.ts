export type VehicleStatus = 'no_signal' | 'in_transit' | 'operating'

export interface Vehicle extends TelemetryResponse {
    status: VehicleStatus
    trail: [number, number][]
}

export interface TelemetryResponse {
    vehicle_id: string
    timestamp: string
    lat: number
    lon: number
    alt: number
    speed: number
    course: number
    sats: number
    hdop: number
    ignition: boolean
}