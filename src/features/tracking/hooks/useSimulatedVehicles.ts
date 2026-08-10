import { useState, useEffect } from 'react'
import { MOCK_VEHICLES } from '../mock/vehicles-position.mock'
import type { Vehicle } from '../types/telemetry.type'

const MAX_TRAIL = 50

export const useSimulatedVehicles = (): Vehicle[] => {
    const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES)

    useEffect(() => {
        const interval = setInterval(() => {
            setVehicles((prev) =>
                prev.map((v) => {
                    if (v.status === 'no_signal') return v

                    const deltaLat = (Math.random() - 0.5) * 0.001
                    const deltaLon = (Math.random() - 0.5) * 0.001
                    const newLat = v.lat + deltaLat
                    const newLon = v.lon + deltaLon
                    const trail = [
                        ...v.trail,
                        [newLat, newLon] as [number, number],
                    ].slice(-MAX_TRAIL) as [number, number][]

                    return {
                        ...v,
                        lat: newLat,
                        lon: newLon,
                        trail,
                        speed: v.status === 'in_transit'
                            ? Math.floor(Math.random() * 60 + 20)
                            : 0,
                        timestamp: new Date().toISOString(),
                    }
                })
            )
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return vehicles
}