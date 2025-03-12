import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import BaseCard from '@/components/base-card'
import MostVisitedPathNames from '@/components/metrics/most-visited-pathnames'
import UsersLocation from '@/components/metrics/users-locations'
import TimeVisitedDay from '@/components/metrics/time-visited-day'
import TimeVisitedHour from '@/components/metrics/time-visited-hour'
import WidgetsMetrics from '@/components/metrics/widgets-metrics'
import DesktopMobileUsers from '@/components/metrics/desktop-mobile-users'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../../convex/_generated/api'
import EmptyTemplates from '@/components/empty-templates'
import Link from 'next/link'
import RefetchSsrPage from '@/components/refetch-ssr-page'

const MetricsPage = async () => {
    const user = await currentUser()
    const activeTemplate = await fetchQuery(api.templates.getActiveTemplateByClerkIdPublic, { clerkId: user?.id! })

    if (!activeTemplate.length) return (
        <EmptyTemplates
            mainTitle={'No tienes niguna plantilla activa'}
            linkTitle={'Activar'}
            linkUrl={'/templates'} />
    )

    return (
        <section className='size-full max-w-[2000px] m-auto flex flex-col gap-2 p-1 rounded-sm overflow-y-scroll'>
            <div>
                Solo se muestran las métricas de la pantilla que esta actualmente activa, si quieres ver metricas de otra{' '}
                <Link href={'/templates'} className='text-blue-500 hover:underline transition-all'>actívala primero.</Link>
            </div>
            <RefetchSsrPage fromPages={['templates']} />
            <div className='flex flex-col w-full h-fit gap-1'>
                <BaseCard containerClassName='w-full'>
                    <DesktopMobileUsers clerkId={user?.id!} />
                </BaseCard>
                <div className='flex flex-col md:flex-row w-full gap-1'>
                    <BaseCard containerClassName='w-full h-auto'>
                        <MostVisitedPathNames clerkId={user?.id!} />
                    </BaseCard>
                    <BaseCard containerClassName='w-full h-auto'>
                        <UsersLocation clerkId={user?.id!} />
                    </BaseCard>
                    <BaseCard containerClassName='w-full h-auto'>
                        <WidgetsMetrics clerkId={user?.id!} />
                    </BaseCard>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-1 md:h-[400px]'>
                    <BaseCard containerClassName='w-full md:h-full flex flex-col justify-between'>
                        <TimeVisitedDay clerkId={user?.id!} />
                    </BaseCard>
                    <BaseCard containerClassName='w-full md:h-full'>
                        <TimeVisitedHour clerkId={user?.id!} />
                    </BaseCard>
                </div>
            </div>
        </section>
    )
}

export default MetricsPage