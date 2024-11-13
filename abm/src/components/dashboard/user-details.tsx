"use client"
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import LoaderSpinner from '../loader-spinner'

const UserDetails = () => {
    const user = useUser()
    return (
        <div className='bg-slate-50 rounded-sm border p-2 gap-2 flex items-center justify-between'>
            {
                !user.isLoaded ? <LoaderSpinner size='sm' /> :
                    <>
                        <span className='text-lg'>Bienvenid@ <span className='text-blue-800 font-bold'>{user?.user?.username}</span>, como has estado?</span>
                        <div className='flex items-center gap-2 text-[12px]'>
                            <span className='p-1 bg-red-300 rounded-sm'>Gratuito</span>
                            <Link href={'/profile/price'} className='hover:underline'>
                                <span>Cambiar de plan</span>
                            </Link>
                        </div>
                    </>

            }
        </div>
    )
}

export default UserDetails