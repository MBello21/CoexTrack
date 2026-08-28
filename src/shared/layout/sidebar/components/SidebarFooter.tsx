import { Bell, CircleQuestionMark, CircleUserRound, LogOut, Settings } from "lucide-react"
import { useSidebar } from "../context/SidebarContext"

export const SidebarFooter = () => {
    const { open } = useSidebar()
    return (
        <footer className="border-t border-neutral-600">
            <div className={`flex ${!open ? 'flex-col' : ''} justify-around mb-2 mt-2`}>
                <button className="px-4 py-2 hover:bg-neutral-700 hover:rounded-sm">
                    <Settings className="h-5 w-5" />
                </button>
                <button className="px-4 py-2 hover:bg-neutral-700 hover:rounded-sm">
                    <CircleQuestionMark className="h-5 w-5" />
                </button>
                <button className="px-4 py-2 hover:bg-neutral-700 hover:rounded-sm">
                    <Bell className="h-5 w-5" />
                </button>
            </div>
            <div className="flex justify-between hover:bg-neutral-700 hover:rounded-sm px-4 py-2 mb-2">
                <CircleUserRound />
                Usuario
                <LogOut />
            </div>
        </footer>
    )
}
