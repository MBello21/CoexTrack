import type { StateConfigProps } from "../types/badge-state.interface";


export const VEHICLE_STATUS: Record<string, StateConfigProps> = {
    no_signal: {
        label: "Sin señal",
        bg: 'bg-red-100',
        bg_icon: 'bg-neutral-500',
        text: 'text-red-600',
        dot: 'bg-red-600'
    },
    ignition_off: {
        label: "Ignición off",
        bg: 'bg-gray-200',
        bg_icon: 'bg-gray-400',
        text: 'text-gray-600',
        dot: 'bg-gray-600'
    },
    in_transit: {
        label: "En tránsito",
        bg: 'bg-green-100',
        bg_icon: 'bg-green-400',
        text: 'text-green-800',
        dot: 'bg-green-600'
    },
    operating: {
        label: "Operando",
        bg: 'bg-amber-100',
        bg_icon: 'bg-amber-400',
        text: 'text-amber-800',
        dot: 'bg-amber-600'
    },
    stationary: {
        label: "Parado",
        bg: 'bg-blue-100',
        bg_icon: 'bg-blue-400',
        text: 'text-blue-600',
        dot: 'bg-blue-600'
    },
}