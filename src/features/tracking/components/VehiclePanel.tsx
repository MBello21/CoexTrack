import type { Vehicle, VehicleStatus } from '../types/telemetry.type'

interface Props {
    vehicles: Vehicle[]
    onSelect: (vehicle: Vehicle) => void
}

const STATUS_LABEL: Record<VehicleStatus, string> = {
    no_signal: 'Sin señal',
    in_transit: 'En tránsito',
    operating: 'Operando en vía',
    stationary: 'Parado',
}

const STATUS_COLOR: Record<VehicleStatus, string> = {
    no_signal: '#9CA3AF',
    in_transit: '#22C55E',
    operating: '#F59E0B',
    stationary: '#3B82F6',
}

const getBatteryColor = (voltage: number | null | undefined): string => {
    if (voltage == null) return '#9CA3AF'
    if (voltage < 11.0) return '#EF4444'
    if (voltage < 11.5) return '#F59E0B'
    return '#22C55E'
}

const getBatteryLabel = (voltage: number | null | undefined): string => {
    if (voltage == null) return 'Sin datos'
    return `${voltage.toFixed(1)}V`
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
                        background: v.alert ? '#FEF2F2' : 'white',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>{v.vehicle_id}</strong>
                        <span style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: getBatteryColor(v.battery_voltage),
                        }}>
                            🔋 {getBatteryLabel(v.battery_voltage)}
                        </span>
                    </div>
                    <div style={{ color: STATUS_COLOR[v.status], fontSize: '14px' }}>
                        {STATUS_LABEL[v.status]}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        {v.speed?.toFixed(0)} km/h · {v.sats} sats
                    </div>
                    {v.alert && (
                        <div style={{
                            marginTop: '4px',
                            fontSize: '12px',
                            color: '#EF4444',
                            fontWeight: 'bold',
                        }}>
                            ⚠️ {v.alert === 'bateria_critica_en_operacion'
                                ? 'Batería crítica en operación'
                                : 'Batería baja'}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}