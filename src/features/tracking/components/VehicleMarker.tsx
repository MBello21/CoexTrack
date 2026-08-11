import { Marker, Popup, Polyline } from 'react-leaflet'
import type { Vehicle, VehicleStatus } from '../types/telemetry.type'
import { createVehicleIcon } from './VehicleIcon'

const STATUS_COLOR: Record<VehicleStatus, string> = {
    no_signal: '#9CA3AF',
    in_transit: '#22C55E',
    operating: '#F59E0B',
}

interface Props {
    vehicle: Vehicle
}

export const VehicleMarker = ({ vehicle }: Props) => {
    return (
        <>
            {vehicle.trail.length > 1 && (
                <Polyline
                    positions={vehicle.trail}
                    pathOptions={{
                        color: STATUS_COLOR[vehicle.status],
                        weight: 4,
                        opacity: 0.8,
                    }}
                />
            )}
            <Marker
                position={[vehicle.lat, vehicle.lon]}
                icon={createVehicleIcon(vehicle.status)}
            >
                <Popup>
                    <strong>{vehicle.vehicle_id}</strong>
                    <br />
                    {vehicle.speed} km/h
                </Popup>
            </Marker>
        </>
    )
}