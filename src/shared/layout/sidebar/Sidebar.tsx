
import { SidebarBody } from './components/SidebarBody'
import { SidebarFooter } from './components/SidebarFooter'
import { SidebarHeader } from './components/SidebarHeader'

export const Sidebar = () => {


    return (
        <aside className="flex flex-col h-full justify-between text-white p-2 z-40 relative">
            <SidebarHeader />
            <div className='flex-1'>
                <SidebarBody />
            </div>
            <SidebarFooter />
        </aside>
    )
}
