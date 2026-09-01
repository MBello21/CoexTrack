
export interface VehicleResponse {
    id:           number;
    vehicle_id:   string;
    plate:        string;
    brand:        string;
    model:        string;
    vehicle_type: string;
    driver:       null | string;
    engine_type:  string;
}
