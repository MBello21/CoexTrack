import type { TelemetryResponse } from '../types/telemetry.type'

const API_URL = import.meta.env.API_URL

export const fetchLatestPositions = async (): Promise<TelemetryResponse[]> => {
    const res = await fetch(`${API_URL}/latest`)
    return res.json()
}