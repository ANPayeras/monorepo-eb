import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import BaseCard from '@/components/base-card'
import DesktopUsers from '@/components/metrics/desktop-users'
import MobileUsers from '@/components/metrics/mobile-users'
import MostVisitedPathNames from '@/components/metrics/most-visited-pathnames'
import UsersLocation from '@/components/metrics/users-locations'
import TimeVisitedDay from '@/components/metrics/time-visited-day'
import TimeVisitedHour from '@/components/metrics/time-visited-hour'

const MetricsPage = async () => {
    const user = await currentUser()
    return (
        <section className='size-full max-w-[1000px] m-auto bg-slate-50 flex p-1 rounded-sm'>
            <div className='flex flex-col w-full h-fit gap-1'>
                <div className='flex w-full gap-1'>
                    <BaseCard>
                        <DesktopUsers clerkId={user?.id!} />
                    </BaseCard>
                    <BaseCard>
                        <MobileUsers clerkId={user?.id!} />
                    </BaseCard>
                </div>
                <BaseCard containerClassName='w-full'>
                    <MostVisitedPathNames clerkId={user?.id!} />
                </BaseCard>
                <BaseCard containerClassName='w-full'>
                    <UsersLocation clerkId={user?.id!} />
                </BaseCard>
                <BaseCard containerClassName='w-full'>
                    <TimeVisitedDay clerkId={user?.id!} />
                </BaseCard>
                <BaseCard containerClassName='w-full'>
                    <TimeVisitedHour clerkId={user?.id!} />
                </BaseCard>
            </div>
        </section>
    )
}

export default MetricsPage