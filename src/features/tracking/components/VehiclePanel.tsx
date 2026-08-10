import type { Vehicle, VehicleStatus } from '../types/telemetry.type'

interface Props {
    vehicles: Vehicle[]
    onSelect: (vehicle: Vehicle) => void
}

const STATUS_LABEL: Record<VehicleStatus, string> = {
    no_signal: 'Sin señal',
    in_transit: 'En tránsito',
    operating: 'Operando en vía',
}

const STATUS_COLOR: Record<VehicleStatus, string> = {
    no_signal: '#9CA3AF',
    in_transit: '#22C55E',
    operating: '#F59E0B',
}

export const VehiclePanel = ({ vehicles, onSelect }: Props) => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '300px',
            height: '100vh',
            background: 'white',
            zIndex: 1000,
            overflowY: 'auto',
            padding: '16px',
        }}>
            <h2 style={{ margin: '0 0 16px' }}>Flota COEX</h2>
            {vehicles.map((v) => (
                <div
                    key={v.vehicle_id}
                    onClick={() => onSelect(v)}
                    style={{
                        padding: '12px',
                        marginBottom: '8px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: `2px solid ${STATUS_COLOR[v.status]}`,
                    }}
                >
                    <strong>{v.vehicle_id}</strong>
                    <div style={{ color: STATUS_COLOR[v.status], fontSize: '14px' }}>
                        {STATUS_LABEL[v.status]}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        {v.speed} km/h
                    </div>
                </div>
            ))}
        </div>
    )
}