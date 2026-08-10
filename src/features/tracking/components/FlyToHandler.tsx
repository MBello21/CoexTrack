import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'

interface FlyToProps {
    lat: number
    lng: number
    vehicleId: string
}

export const FlyToHandler = ({ lat, lng, vehicleId }: FlyToProps) => {
    const map = useMap()
    const prevId = useRef<string | null>(null)

    useEffect(() => {
        if (vehicleId !== prevId.current) {
            map.flyTo([lat, lng], 15)
            prevId.current = vehicleId
        }
    }, [lat, lng, vehicleId, map])

    return null
}