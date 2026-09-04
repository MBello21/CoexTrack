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
            { label: 'Conductores', path: '/list/drivers' },
            { label: 'Puntos de referencia', path: '/list/reference' },
            { label: 'Geofences', path: '/list/geofences' },
            { label: 'Localizaciones', path: '/list/locations' },
            { label: 'Rutas', path: '/list/routes' },
            { label: 'Remolques', path: '/list/accesories' },
            { label: 'DVIRs', path: '/list/dvirs' },
        ]

    },
    {
        label: 'Tablero',
        icon: LayoutDashboard,
        path: '/dashboard',
        children: [
            { label: 'Vista general', path: '/dashboard/overview' },
        ]

    },
    {
        label: 'Informes',
        icon: ChartNoAxesColumn,
        path: '/reports',
        children: [
            { label: 'Vista general', path: '/reports/all-reports' },
        ]

    },
    {
        label: 'Admin',
        icon: UserCog,
        path: 'admin',
        children: [
            { label: 'Vista general', path: '/admin/reminders/overview' },
        ]

    },
]