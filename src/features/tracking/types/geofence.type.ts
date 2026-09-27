export interface GeofencesResponse {
    id: number;
    name: string;
    geometry: string;
    geofence_type: string;
    active: boolean;
    description: string;
    vehicle_geofences: VehicleGeofence[];
}

export interface VehicleGeofence {
    id: number;
    vehicle_id: number;
    geofence_id: number;
    alert_on_enter: boolean;
    alert_on_exit: boolean;
}
