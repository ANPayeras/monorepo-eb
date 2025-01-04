import React from 'react'
import Link from 'next/link'
import BaseCard from '../base-card'
import DesktopUsers from '../metrics/desktop-users'
import { currentUser } from '@clerk/nextjs/server'
import MobileUsers from '../metrics/mobile-users'
import { IconChevronRight } from '@tabler/icons-react'

const MetricsDashboard = async () => {
    const user = await currentUser()

    return (
        <div
            className='flex bg-slate-50 w-full gap-2 rounded-sm border p-2 shadow-lg flex-col'
        >
            <div className='w-full flex justify-between'>
                <span>Principales Metricas</span>
                <Link
                    href={'/metrics'}
                    className='hover:scale-105 transition-all'>
                    <IconChevronRight />
                </Link>
            </div>
            <div className='flex gap-2'>
                <BaseCard containerClassName='hover:scale-[1.01] transition-all'>
                    <DesktopUsers clerkId={user?.id!} />
                </BaseCard>
                <BaseCard containerClassName='hover:scale-[1.01] transition-all'>
                    <MobileUsers clerkId={user?.id!} />
                </BaseCard>
            </div>
        </div>
    )
}

export default MetricsDashboard