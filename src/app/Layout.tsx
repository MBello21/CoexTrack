import { Outlet } from 'react-router'
import { Sidebar } from '../shared/layout/sidebar/Sidebar'
import { useSidebar } from '../shared/layout/sidebar/context/SidebarContext';

export const Layout = () => {
    const { open } = useSidebar();
    return (
        <div className='flex'>
            <div className={`transition-all duration-300 ease-in-out ${open ? 'w-70 md:w-60' : 'w-18'} bg-surface`}>
                <Sidebar />
            </div>
            <div className={`transition-all duration-300 ease-in-out ${open ? 'w-[calc(100%-280px)] md:w-[calc(100%-240px)]' : 'w-[calc(100%-72px)] md-[calc(100%-72px)]'}`}>
                <Outlet />
            </div>
        </div>
    )
}