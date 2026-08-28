import logo from '../../../../assets/logo.png'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSidebar } from "../context/SidebarContext"
import { useState } from 'react'



export const SidebarHeader = () => {
    const { open, toggle } = useSidebar()
    const [hovered, setHovered] = useState(false);
    return (
        <div className='flex items-center'>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className='rounded-full h-15 w-15 flex justify-center items-center'>
                {hovered && !open ? (
                    <button
                        onClick={toggle}
                        className='h-10 w-10 flex items-center justify-center border border-neutral-600 rounded-md hover:bg-neutral-700'
                    >
                        <ChevronRight className="w-8 h-8 transition-all duration-200" />
                    </button>
                ) : (
                    <img src={logo} alt="COEXTrack" className="w-16 h-16 md:w-14 md:h-14 transition-all duration-200" />
                )}
            </div>
            {
                open &&
                <>

                    <div className='me-3'>
                        <h2 className='text-2xl md:text-xl font-display uppercase leading-none mb-0.5'><span className='underline font-bold'>Coex</span>track</h2>
                        <p className='text-xs md:text-[9px] leading-none'>FLEET TRACKING SYSTEM</p>

                    </div>
                    <div>
                        <button
                            onClick={toggle}
                            className='p-3 md:p-1 border border-neutral-600 rounded-md hover:bg-neutral-700'>
                            <ChevronLeft />
                        </button>
                    </div>
                </>
            }
        </div>
    )
}
