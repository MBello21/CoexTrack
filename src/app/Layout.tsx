import { Outlet } from 'react-router'
import { Sidebar } from '../shared/layout/sidebar/Sidebar'
import { useSidebar } from '../shared/layout/sidebar/context/SidebarContext';

export const Layout = () => {
    const { open } = useSidebar();
    return (
        <div className='flex h-screen'>
            <div className={`transition-all duration-300 ease-in-out ${open ? 'w-70 md:w-60' : 'w-18'} bg-surface`}>
                <Sidebar />
            </div>
            <div className={`transition-all duration-300 ease-in-out flex-1 h-full overflow-hidden`}>
                <Outlet />
            </div>
        </div>
    )
}