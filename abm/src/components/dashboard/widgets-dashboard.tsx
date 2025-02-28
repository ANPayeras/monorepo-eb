"use client"

import React from 'react'
import MetricsDashboard from './metrics-dashboard'
import { useUser } from '@clerk/nextjs'
import LoaderSpinner from '../loader-spinner'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const WidgetsDashboard = () => {
    const user = useUser()
    const userDB = useQuery(api.users.getCurrentUserByClerkId, { clerkId: user.user?.id || '' })
    const activeTemplate = useQuery(api.templates.getActiveTemplate)

    if (!user.isLoaded || !activeTemplate) return (
        <div className='flex-1 w-full h-full flex'>
            <LoaderSpinner />
        </div>
    )

    return (
        <div className='flex-1 w-full h-full flex flex-col gap-4 items-start'>
            {
                userDB?.isPremium && activeTemplate.length ? <MetricsDashboard clerkId={user.user?.id!} /> : <></>
            }
            <div className='w-full h-full grid grid-cols-[repeat(2,_minmax(0,_200px))] grid-rows-[repeat(2,_minmax(0,_200px))] gap-4 items-start'>
                <div className='bg-slate-50 hover:scale-105 transition-all flex h-[200px] gap-2 justify-center items-center rounded-sm border p-2 relative shadow-lg'>
                    <span>I.A</span>
                    <div className='absolute left-[5px] top-0'>Próximamente...</div>
                </div>
                <div className='bg-slate-50 hover:scale-105 transition-all flex h-[200px] gap-2 justify-center items-center rounded-sm border p-2 relative shadow-lg'>
                    <span>Blockchain</span>
                    <div className='absolute left-[5px] top-0'>Próximamente...</div>
                </div>
            </div>
        </div>
    )
}

export default WidgetsDashboard