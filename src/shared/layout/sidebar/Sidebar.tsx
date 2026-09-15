
import { SidebarBody } from './components/SidebarBody'
import { SidebarFooter } from './components/SidebarFooter'
import { SidebarHeader } from './components/SidebarHeader'

export const Sidebar = () => {
    return (

        <aside className="flex flex-col h-full text-white p-2 z-40 relative" >
            <SidebarHeader />
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-800 scrollbar-thumb-rounded-full">
                <SidebarBody />
            </div>
            <div className="mt-2">
                <SidebarFooter />
            </div>
        </aside >
    )
}
