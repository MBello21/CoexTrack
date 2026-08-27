import { Marker, Popup, Polyline } from 'react-leaflet'
import type { Vehicle, VehicleStatus } from '../types/telemetry.type'
import { createVehicleIcon } from './VehicleIcon'

const STATUS_COLOR: Record<VehicleStatus, string> = {
    no_signal: '#9CA3AF',
    in_transit: '#22C55E',
    operating: '#F59E0B',
    stationary: '#3B82F6',
}

const STATUS_LABEL: Record<VehicleStatus, string> = {
    no_signal: 'Sin señal',
    in_transit: 'En tránsito',
    operating: 'Operando en vía',
    stationary: 'Parado',
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
                    {STATUS_LABEL[vehicle.status]}
                    <br />
                    {vehicle.speed?.toFixed(0) ?? '0'} km/h · {vehicle.sats ?? 0} sats
                    {vehicle.battery_voltage != null && (
                        <>
                            <br />
                            🔋 {vehicle.battery_voltage.toFixed(1)}V
                        </>
                    )}
                    {vehicle.alert && (
                        <>
                            <br />
                            <span style={{ color: '#EF4444', fontWeight: 'bold' }}>
                                ⚠️ {vehicle.alert === 'bateria_critica_en_operacion'
                                    ? 'Batería crítica'
                                    : 'Batería baja'}
                            </span>
                        </>
                    )}
                </Popup>
            </Marker>
        </>
    )
}