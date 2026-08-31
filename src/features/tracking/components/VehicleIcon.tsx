import L from 'leaflet'
import type { VehicleStatus } from '../types/telemetry.type'
import { STATUS_COLOR } from '../../../shared/constants/vehicles-variables.constant'



export const createVehicleIcon = (status: VehicleStatus) => {
  const color = STATUS_COLOR[status]

  return L.divIcon({
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    html: `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="16" cy="16" r="5" fill="white"/>
      </svg>
    `,
  })
}