import React from 'react'
import UserDetails from './dashboard/user-details'
import ActiveTemplate from './dashboard/active-template'
import MetricsDashboard from './dashboard/metrics-dashboard'

const Dashboard = () => {
    return (
        <section className='size-full max-w-[1000px] m-auto h-fit md:h-full'>
            <div className='h-full flex flex-col gap-4'>
                <UserDetails />
                <div className='flex flex-col md:flex-row h-full w-full gap-4 overflow-hidden'>
                    <ActiveTemplate />
                    <div className='flex-1 w-full h-full flex flex-col gap-4 items-start'>
                        <MetricsDashboard />
                        <div className='w-full h-full grid grid-cols-[repeat(2,_minmax(0,_200px))] grid-rows-[repeat(2,_minmax(0,_200px))] gap-4 items-start'>
                            <div className='bg-slate-50 hover:scale-105 transition-all flex h-[200px] w-[200px] gap-2 justify-center items-center rounded-sm border p-2 relative shadow-lg'>
                                <span>I.A</span>
                                <div className='absolute left-[5px] top-0'>Próximamente...</div>
                            </div>
                            <div className='bg-slate-50 hover:scale-105 transition-all flex h-[200px] w-[200px] gap-2 justify-center items-center rounded-sm border p-2 relative shadow-lg'>
                                <span>Blockchain</span>
                                <div className='absolute left-[5px] top-0'>Próximamente...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Dashboard