import type { LucideIcon } from "lucide-react"

interface NavChild {
    label: string
    path: string
}

export interface NavItem {
    label: string
    icon: LucideIcon,
    path: string
    children: NavChild[]
}