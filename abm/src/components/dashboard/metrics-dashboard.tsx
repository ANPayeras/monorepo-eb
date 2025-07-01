import React from 'react'

import Link from 'next/link'
import BaseCard from '../base-card'
import { IconChevronRight } from '@tabler/icons-react'
import DesktopUsersClient from '../metrics/desktop-users-client'
import MobileUsersClient from '../metrics/mobile-users-client'

const MetricsDashboard = ({ clerkId }: { clerkId: string }) => {
    return (
        <div
            className='flex bg-slate-50 w-full gap-2 rounded-sm border p-2 shadow-lg flex-col'
        >
            <div className='w-full flex justify-between'>
                <span>Principales Métricas</span>
                <Link
                    href={'/metrics'}
                    className='hover:scale-105 transition-all'>
                    <IconChevronRight />
                </Link>
            </div>
            <div className='flex gap-2'>
                <BaseCard containerClassName='hover:scale-[1.01] transition-all flex-1 h-auto'>
                    <DesktopUsersClient clerkId={clerkId} />
                </BaseCard>
                <BaseCard containerClassName='hover:scale-[1.01] transition-all flex-1 h-auto'>
                    <MobileUsersClient clerkId={clerkId} />
                </BaseCard>
            </div>
        </div>
    )
}

export default MetricsDashboard