import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import { useState, useEffect } from 'react'
import { MAP_CENTER, MAP_ZOOM, TILE_URL, TILE_ATTRIBUTION } from '../../../shared/constants/map'
import { VehicleMarker } from './VehicleMarker'
import { FlyToHandler } from './FlyToHandler'
import { fetchVehicleHistory } from '../services/telemetry-api.service'
import type { Vehicle } from '../types/telemetry.type'
import 'leaflet/dist/leaflet.css'

interface Props {
    vehicles: Vehicle[]
    selected: Vehicle | null
}

export const Map = ({ vehicles, selected }: Props) => {
    const [history, setHistory] = useState<[number, number][]>([])

    useEffect(() => {
        fetchVehicleHistory(
            'coex-gps-01',
            '2026-08-09T00:00:00',
            '2026-08-11T23:59:59'
        ).then((data) => {
            setHistory(data.map((d) => [d.lat, d.lon] as [number, number]))
        })
    }, [])

    return (
        <MapContainer
            center={MAP_CENTER}
            zoom={MAP_ZOOM}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
            {vehicles.map((v) => (
                <VehicleMarker key={v.vehicle_id} vehicle={v} />
            ))}
            {selected && (
                <FlyToHandler lat={selected.lat} lng={selected.lon} vehicleId={selected.vehicle_id} />
            )}
            {history.length > 1 && (
                <Polyline
                    positions={history}
                    pathOptions={{ color: '#3B82F6', weight: 3, opacity: 0.7 }}
                />
            )}
        </MapContainer>
    )
}