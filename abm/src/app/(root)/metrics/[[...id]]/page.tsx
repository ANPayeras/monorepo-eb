import React, { Suspense } from 'react'

import { currentUser } from '@clerk/nextjs/server'
import BaseCard from '@/components/base-card'
import MostVisitedPathNames from '@/components/metrics/most-visited-pathnames'
import UsersLocation from '@/components/metrics/users-locations'
import TimeVisitedDay from '@/components/metrics/time-visited-day'
import TimeVisitedHour from '@/components/metrics/time-visited-hour'
import WidgetsMetrics from '@/components/metrics/widgets-metrics'
import DesktopMobileUsers from '@/components/metrics/desktop-mobile-users'
import { fetchQuery } from 'convex/nextjs'
import EmptyTemplates from '@/components/empty-templates'
import LoaderSpinner from '@/components/loader-spinner'
import { api } from '../../../../../convex/_generated/api'
import SelectTemplate from '@/components/metrics/select-template'
import { Id } from '../../../../../convex/_generated/dataModel'

const MetricsPage = async ({ params }: { params: { id?: string[] } }) => {
    const user = await currentUser()
    const metricTemplates = await fetchQuery(api.templates.getHasMetricsTemplatesByClerkIdPublic, { clerkId: user?.id! })

    const templateId = params.id ? params.id[0] : ''
    if (!metricTemplates.length) return (
        <EmptyTemplates
            mainTitle={'No existen plantillas con datos para mostrar, debes activarlas para poder ver métricas'}
            linkTitle={'Activar'}
            linkUrl={'/templates'} />
    )

    return (
        <section className='size-full overflow-y-scroll'>
            <div className='max-w-[1000px] m-auto flex flex-col gap-2 p-1'>
                <div className='flex gap-2 items-center'>
                    <span>Seleccioná una plantilla:</span>
                    <SelectTemplate templates={metricTemplates} />
                </div>
                {
                    templateId &&
                    <div className='flex flex-col w-full h-fit gap-1'>
                        <BaseCard containerClassName='w-full'>
                            <Suspense fallback={<LoaderSpinner size='sm' />}>
                                <DesktopMobileUsers templateId={templateId as Id<"templates">} />
                            </Suspense>
                        </BaseCard>
                        <div className='flex flex-col md:flex-row w-full gap-1'>
                            <BaseCard containerClassName='w-full h-auto'>
                                <Suspense fallback={<LoaderSpinner size='sm' />}>
                                    <MostVisitedPathNames templateId={templateId as Id<"templates">} />
                                </Suspense>
                            </BaseCard>
                            <BaseCard containerClassName='w-full h-auto'>
                                <Suspense fallback={<LoaderSpinner size='sm' />}>
                                    <UsersLocation templateId={templateId as Id<"templates">} />
                                </Suspense>
                            </BaseCard>
                            <BaseCard containerClassName='w-full h-auto'>
                                <Suspense fallback={<LoaderSpinner size='sm' />}>
                                    <WidgetsMetrics templateId={templateId as Id<"templates">} />
                                </Suspense>
                            </BaseCard>
                        </div>
                        <div className='flex flex-col md:flex-row w-full gap-1 md:h-[400px]'>
                            <BaseCard containerClassName='w-full md:h-full flex flex-col justify-between'>
                                <Suspense fallback={<LoaderSpinner size='sm' />}>
                                    <TimeVisitedDay templateId={templateId as Id<"templates">} />
                                </Suspense>
                            </BaseCard>
                            <BaseCard containerClassName='w-full md:h-full'>
                                <Suspense fallback={<LoaderSpinner size='sm' />}>
                                    <TimeVisitedHour templateId={templateId as Id<"templates">} />
                                </Suspense>
                            </BaseCard>
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default MetricsPage