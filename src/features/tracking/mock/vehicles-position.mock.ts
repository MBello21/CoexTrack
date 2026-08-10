import type { Vehicle } from "../types/telemetry.type";


export const MOCK_VEHICLES: Vehicle[] = [
    {
        vehicle_id: 'coex-gps-01',
        timestamp: '2026-08-09T10:00:00Z',
        lat: 36.535,
        lon: -6.22,
        alt: 5,
        speed: 45,
        course: 180,
        sats: 8,
        hdop: 1.2,
        ignition: true,
        status: 'in_transit',
        trail: [],
    },
    {
        vehicle_id: 'coex-gps-02',
        timestamp: '2026-08-09T10:00:00Z',
        lat: 36.523208,
        lon: -6.232647,
        alt: 3,
        speed: 0,
        course: 90,
        sats: 6,
        hdop: 1.5,
        ignition: true,
        status: 'operating',
        trail: [],
    },
]