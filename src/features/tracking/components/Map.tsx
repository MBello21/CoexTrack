import { MapContainer, TileLayer } from 'react-leaflet'
import { MAP_CENTER, MAP_ZOOM, TILE_URL, TILE_ATTRIBUTION } from '../../../shared/constants/map'
import { VehicleMarker } from './VehicleMarker'
import { FlyToHandler } from './FlyToHandler'
import type { Vehicle } from '../types/telemetry.type'
import 'leaflet/dist/leaflet.css'

interface Props {
    vehicles: Vehicle[]
    selected: Vehicle | null
}

export const Map = ({ vehicles, selected }: Props) => {
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
            {selected && <FlyToHandler lat={selected.lat} lng={selected.lon} vehicleId={selected.vehicle_id} />}
        </MapContainer>
    )
}