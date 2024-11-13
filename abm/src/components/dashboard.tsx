import React from 'react'
import UserDetails from './dashboard/user-details'
import ActiveTemplate from './dashboard/active-template'

const Dashboard = () => {
    return (
        <section className='size-full max-w-[1000px] m-auto'>
            <div className='h-full flex flex-col gap-4'>
                <UserDetails />
                <div className='flex h-full w-full gap-4 overflow-hidden'>
                    <ActiveTemplate />
                    <div className='bg-slate-50 border rounded-sm p-2 flex-1'>
                        <div className='opacity-50 w-full h-full grid grid-cols-[repeat(2,_minmax(0,_200px))] grid-rows-[repeat(2,_minmax(0,_200px))] gap-4 p-2 items-start'>
                            <div className='hover:scale-105 transition-all flex h-[200px] w-[200px] gap-2 justify-center items-center rounded-sm border p-2 relative shadow-lg'>
                                <span>Métricas</span>
                                {/* <span className='bg-green-300 flex justify-center items-center rounded-sm text-[10px] h-5 w-5'>Pro</span> <br /> */}
                                <div className='absolute left-[5px] top-0'>Próximamente...</div>
                            </div>
                            <div className='hover:scale-105 transition-all flex h-[200px] w-[200px] gap-2 justify-center items-center rounded-sm border p-2 relative shadow-lg'>
                                <span>I.A</span>
                                {/* <span className='bg-green-300 flex justify-center items-center rounded-sm text-[10px] h-5 w-5'>Pro</span> <br /> */}
                                <div className='absolute left-[5px] top-0'>Próximamente...</div>
                            </div>
                            <div className='hover:scale-105 transition-all flex h-[200px] w-[200px] gap-2 justify-center items-center rounded-sm border p-2 relative shadow-lg'>
                                <span>Blockchain</span>
                                {/* <span className='bg-green-300 flex justify-center items-center rounded-sm text-[10px] h-5 w-5'>Pro</span> <br /> */}
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