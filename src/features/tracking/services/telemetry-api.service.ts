import type { TelemetryResponse } from '../types/telemetry.type'

const API_URL = 'https://gps-api.coexca03.es/api/v1/telemetry'

export const fetchLatestPositions = async (): Promise<TelemetryResponse[]> => {
    const res = await fetch(`${API_URL}/latest`)
    return res.json()
}