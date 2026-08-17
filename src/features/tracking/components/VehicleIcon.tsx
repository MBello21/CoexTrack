import L from 'leaflet'
import type { VehicleStatus } from '../types/telemetry.type'

interface StatusStyle {
    pin: string
    stroke: string
    car: string
    extra: string // SVG extra elements per status
}

const STATUS_STYLES: Record<VehicleStatus, StatusStyle> = {
    in_transit: {
        pin: '#4CAF50',
        stroke: '#388E3C',
        car: '#4CAF50',
        extra: '',
    },
    operating: {
        pin: '#FFC107',
        stroke: '#F9A825',
        car: '#FFC107',
        // Hazard light indicators
        extra: `
            <polygon points="15,9 17,13 13,13" fill="#F57F17"/>
            <polygon points="35,9 37,13 33,13" fill="#F57F17"/>
        `,
    },
    no_signal: {
        pin: '#9E9E9E',
        stroke: '#757575',
        car: '#9E9E9E',
        extra: '',
    },
}

export const createVehicleIcon = (status: VehicleStatus, heading: number = 0) => {
    const s = STATUS_STYLES[status]

    return L.divIcon({
        className: '',
        iconSize: [40, 52],
        iconAnchor: [20, 52],
        html: `
      <div style="transform: rotate(${heading}deg); transform-origin: 20px 52px; width: 40px; height: 52px;">
        <svg width="40" height="52" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
          <!-- Pin -->
          <path d="M50,0 C65,0 80,15 80,35 C80,60 50,110 50,110 C50,110 20,60 20,35 C20,15 35,0 50,0Z"
                fill="${s.pin}" stroke="${s.stroke}" stroke-width="2"/>
          <!-- White bg -->
          <circle cx="50" cy="38" r="24" fill="white" opacity="0.95"/>
          <!-- Car body -->
          <rect x="36" y="30" width="28" height="16" rx="4" fill="${s.car}"/>
          <!-- Roof -->
          <rect x="40" y="24" width="20" height="10" rx="3" fill="${s.car}"/>
          <!-- Windows -->
          <rect x="41" y="26" width="8" height="6" rx="1" fill="white" opacity="0.5"/>
          <rect x="51" y="26" width="8" height="6" rx="1" fill="white" opacity="0.5"/>
          <!-- Wheels -->
          <circle cx="41" cy="48" r="3" fill="#333"/>
          <circle cx="59" cy="48" r="3" fill="#333"/>
          <!-- Direction arrow -->
          <polygon points="50,0 42,12 58,12" fill="${s.stroke}"/>
          <!-- Status extras -->
          ${s.extra}
        </svg>
      </div>
    `,
    })
}
