"use client"

import React from 'react'
import MetricsDashboard from './metrics-dashboard'
import { useUser } from '@clerk/nextjs'
import LoaderSpinner from '../loader-spinner'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import useCheckPremium from '@/hooks/use-check-premium'

const WidgetsDashboard = () => {
    const user = useUser()
    const { isPremium } = useCheckPremium('', !!user.user)
    const activeTemplate = useQuery(api.templates.getActiveTemplate, !!user.user ? undefined : 'skip')

    if (!user.isLoaded || !activeTemplate) return (
        <div className='flex-1 w-full h-full flex'>
            <LoaderSpinner />
        </div>
    )

    return (
        <div className='flex-1 w-full h-full flex flex-col gap-4 items-start'>
            {
                isPremium && activeTemplate.length ? <MetricsDashboard templateId={activeTemplate[0]._id} /> : <></>
            }
            <div className='w-full h-full grid grid-cols-[repeat(2,_minmax(0,_200px))] grid-rows-[repeat(2,_minmax(0,_200px))] gap-4 items-start'>
                <div className='bg-slate-50 hover:scale-105 transition-all flex h-[200px] gap-2 justify-center items-center rounded-sm border p-2 relative shadow-lg'>
                    <span>I.A</span>
                    <div className='absolute left-[5px] top-0'>Próximamente...</div>
                </div>
                <div className='bg-slate-50 hover:scale-105 transition-all flex h-[200px] gap-2 justify-center items-center rounded-sm border p-2 relative shadow-lg'>
                    <span>Gamificación</span>
                    <div className='absolute left-[5px] top-0'>Próximamente...</div>
                </div>
            </div>
        </div>
    )
}

export default WidgetsDashboard