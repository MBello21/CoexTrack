
import { SidebarBody } from './components/SidebarBody'
import { SidebarFooter } from './components/SidebarFooter'
import { SidebarHeader } from './components/SidebarHeader'

export const Sidebar = () => {


    return (
        <aside className="flex flex-col justify-between h-screen text-white p-2 z-40 relative">
            <SidebarHeader />
            <div className='h-full items-start'>
                <SidebarBody />
            </div>
            <SidebarFooter />
        </aside>
    )
}
