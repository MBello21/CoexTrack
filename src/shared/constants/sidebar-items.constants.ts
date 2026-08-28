import { ChartNoAxesColumn, LayoutDashboard, List, Map, UserCog } from "lucide-react";
import type { NavItem } from "../layout/sidebar/types/sidebar-items.type";


export const NAVIGATION: NavItem[] = [
    {
        label: 'Mapa',
        icon: Map,
        path: '/map',
        children: [
            { label: 'Flota', path: '/map/fleet' },
            { label: 'Mapas de calor', path: '/map/tab/heatmaps' }
        ]

    },
    {
        label: 'Lista',
        icon: List,
        path: '/list',
        children: [
            { label: 'Vehículos', path: '/list/vehicles' },
            { label: 'Conductores', path: '/list/vehicles' },
            { label: 'Puntos de referencia', path: '/list/vehicles' },
            { label: 'Geofences', path: '/list/vehicles' },
            { label: 'Localizaciones', path: '/list/vehicles' },
            { label: 'Rutas', path: '/list/vehicles' },
            { label: 'Remolques', path: '/list/vehicles' },
            { label: 'DVIRs', path: '/list/vehicles' },
        ]

    },
    {
        label: 'Tablero',
        icon: LayoutDashboard,
        path: '/dashboard',
        children: [
            { label: 'Vista general', path: '/list/vehicles' },
        ]

    },
    {
        label: 'Informes',
        icon: ChartNoAxesColumn,
        path: '/dashboard',
        children: [
            { label: 'Vista general', path: '/list/vehicles' },
        ]

    },
    {
        label: 'Admin',
        icon: UserCog,
        path: 'dashboard',
        children: [
            { label: 'Vista general', path: '/list/vehicles' },
        ]

    },
]