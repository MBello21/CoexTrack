import { Bell, CircleQuestionMark, LogOut, Settings } from "lucide-react"
import { useSidebar } from "../context/SidebarContext"
import { useEffect, useState } from "react"

export const SidebarFooter = () => {
    const { open } = useSidebar()
    const [popup, setPopup] = useState<string | null>(null)

    useEffect(() => {
        if (!popup) return
        const close = () => setPopup(null)
        document.addEventListener("click", close)
        return () => document.removeEventListener("click", close)
    }, [popup])


    return (
        <footer className="border-t border-neutral-600">
            <div className={`flex ${!open ? 'flex-col' : ''} justify-around mb-2 mt-2`}>
                <button className="flex justify-center items-center px-4 py-2 hover:bg-neutral-700 hover:rounded-sm">
                    <Settings className="h-5 w-5" />
                </button>
                <button className="flex justify-center items-center px-4 py-2 hover:bg-neutral-700 hover:rounded-sm">
                    <CircleQuestionMark className="h-5 w-5" />
                </button>
                <button className="flex justify-center items-center px-4 py-2 hover:bg-neutral-700 hover:rounded-sm">
                    <Bell className="h-5 w-5" />
                </button>
            </div>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setPopup(popup === 'close' ? null : 'close')
                }}
                className={`flex ${open ? 'justify-between' : 'justify-center'} items-center hover:bg-neutral-700 hover:rounded-sm px-4 py-2 mb-2 relative`}>
                <div className="flex justify-center items-center bg-neutral-400 p-2 rounded-full h-9 w-9">
                    <i className="fa-solid fa-user"></i>
                </div>
                {open &&
                    <>
                        Usuario
                        <LogOut />
                    </>
                }
                {popup && (
                    <div className="absolute left-full bottom-0 ml-2 bg-surface-overlay border border-surface-border rounded-card shadow-card p-4 z-50 w-48">
                        <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary w-full py-1">
                            <LogOut className="w-4 h-4" /> Cerrar sesión
                        </button>
                    </div>
                )}
            </div>

        </footer>
    )
}
