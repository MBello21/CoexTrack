import { useState, useEffect, useRef } from 'react'
import type { Vehicle, TelemetryResponse } from '../types/telemetry.type'
import { fetchLatestPositions } from '../services/telemetry-api.service'

const WS_URL = import.meta.env.VITE_WS_URL
const MAX_TRAIL = 50

const getStatus = (data: TelemetryResponse): Vehicle['status'] => {
    if (!data.ignition) return 'no_signal'
    if (data.speed > 0) return 'in_transit'
    return 'operating'
}

const toVehicle = (data: TelemetryResponse, existing?: Vehicle): Vehicle => {
    const trail: [number, number][] = existing
        ? [...existing.trail, [data.lat, data.lon] as [number, number]].slice(-MAX_TRAIL)
        : [[data.lat, data.lon] as [number, number]]

    return { ...data, status: getStatus(data), trail }
}

export const useVehicles = (): Vehicle[] => {
    const [vehicles, setVehicles] = useState<Map<string, Vehicle>>(new Map())
    const wsRef = useRef<WebSocket | null>(null)

    // Carga inicial
    useEffect(() => {
        fetchLatestPositions().then((data) => {
            const map = new Map<string, Vehicle>()
            data.forEach((d) => map.set(d.vehicle_id, toVehicle(d)))
            setVehicles(map)
        })
    }, [])

    // WebSocket para actualizaciones
    useEffect(() => {
        let cancelled = false

        const connect = () => {
            if (cancelled) return

            const ws = new WebSocket(WS_URL)
            wsRef.current = ws

            ws.onopen = () => {
                const pingInterval = setInterval(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send('ping')
                    } else {
                        clearInterval(pingInterval)
                    }
                }, 30000)
            }

            ws.onmessage = (event) => {
                const data: TelemetryResponse = JSON.parse(event.data)
                setVehicles((prev) => {
                    const next = new Map(prev)
                    next.set(data.vehicle_id, toVehicle(data, prev.get(data.vehicle_id)))
                    return next
                })
            }

            ws.onclose = () => {
                if (!cancelled) setTimeout(connect, 3000)
            }
        }

        connect()

        return () => {
            cancelled = true
            wsRef.current?.close()
        }
    }, [])

    // Timeout detector
    useEffect(() => {
        const interval = setInterval(() => {
            setVehicles((prev) => {
                const now = Date.now()
                const next = new Map(prev)
                let changed = false

                next.forEach((v, id) => {
                    const age = now - new Date(v.timestamp).getTime()
                    if (age > 20000 && v.status !== 'no_signal') {
                        next.set(id, { ...v, status: 'no_signal' })
                        changed = true
                    }
                })

                return changed ? next : prev
            })
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return Array.from(vehicles.values())
}
