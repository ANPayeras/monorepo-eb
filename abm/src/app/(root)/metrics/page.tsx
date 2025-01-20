import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import BaseCard from '@/components/base-card'
import DesktopUsers from '@/components/metrics/desktop-users'
import MobileUsers from '@/components/metrics/mobile-users'
import MostVisitedPathNames from '@/components/metrics/most-visited-pathnames'
import UsersLocation from '@/components/metrics/users-locations'
import TimeVisitedDay from '@/components/metrics/time-visited-day'
import TimeVisitedHour from '@/components/metrics/time-visited-hour'
import WidgetsMetrics from '@/components/metrics/widgets-metrics'
import DesktopMobileUsers from '@/components/metrics/desktop-mobile-users'

const MetricsPage = async () => {
    const user = await currentUser()
    return (
        <section className='size-full max-w-[2000px] m-auto flex p-1 rounded-sm overflow-y-scroll'>
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