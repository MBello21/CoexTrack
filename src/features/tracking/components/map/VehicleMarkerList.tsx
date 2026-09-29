import type { Vehicle } from "../../interfaces/telemetry.type"
import { VehicleMarker } from "../VehicleMarker"

interface VehicleMLProps{
    vehicles: Vehicle[]
}

export const VehicleMarkerList = ({vehicles}:VehicleMLProps) => {
    return (
        <>
            {vehicles
                .filter((v) => v.lat != null && v.lon != null)
                .map((v) => (
                    <VehicleMarker key={v.device_id} vehicle={v} />
                ))}
        </>
    )
}
