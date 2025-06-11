import React from 'react'
import LoaderSpinner from '../loader-spinner'
import { currentUser } from '@clerk/nextjs/server'
import PlanDescription from './plan-description'

const UserDetails = async () => {
    const user = await currentUser()

    return (
        <div className='bg-slate-50 rounded-sm border p-2 gap-2 flex flex-col md:flex-row items-center justify-between'>
            {
                !user ? <LoaderSpinner size='sm' /> :
                    <>
                        <span className='text-sm md:text-lg'>Bienvenid@ <span className='text-blue-800 font-bold'>{user?.username}</span>, como estas?</span>
                        <PlanDescription />
                    </>

            }
        </div>
    )
}

export default UserDetails