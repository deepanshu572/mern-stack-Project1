import React from 'react'
import { IoTimerSharp } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { IoAnalyticsSharp } from "react-icons/io5";

const SideNavDashBoard = () => {
  return (
    <div className='h-screen p-3  border-r border-r-gray-900 flex flex-col items-center '>
        <div className="img_profile w-25 h-25 rounded-full overflow-hidden">
            <img className='w-full h-full object-cover' src="https://res.cloudinary.com/dumcose7h/image/upload/v1770533504/qdlkbcwcgppuv946ztcr.png" alt="" />
        </div>
        <h3>Virtual code</h3>
        <small className='text-gray-400'>Your Channel</small>
        <div className="flex w-full flex-col ">
                <button className='p-2 text-sm flex items-center gap-1'><IoTimerSharp/> DashBoard</button>
                <button className='p-2 text-sm flex items-center gap-1'><IoVideocam/> Content</button>
                <button className='p-2 text-sm flex items-center gap-1'><IoAnalyticsSharp/> Analytic</button>
        </div>
    </div>
  )
}

export default SideNavDashBoard
