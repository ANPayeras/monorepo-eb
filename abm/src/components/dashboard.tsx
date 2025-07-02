import React from 'react'

import UserDetails from './dashboard/user-details'
import ActiveTemplate from './dashboard/active-template'
import WidgetsDashboard from './dashboard/widgets-dashboard'

const Dashboard = () => {
    return (
        <section className='size-full max-w-[1000px] m-auto h-fit md:h-full'>
            <div className='h-full flex flex-col gap-4'>
                <UserDetails />
                <div className='flex flex-col md:flex-row h-full w-full gap-4 overflow-hidden'>
                    <ActiveTemplate />
                    <WidgetsDashboard />
                </div>
            </div>
        </section >
    )
}

export default Dashboard