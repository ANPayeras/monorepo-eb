import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import BaseCard from '@/components/base-card'
import DesktopUsers from '@/components/metrics/desktop-users'
import MobileUsers from '@/components/metrics/mobile-users'

const MetricsPage = async () => {
    const user = await currentUser()
    return (
        <section className='size-full max-w-[1000px] m-auto bg-slate-50 flex gap-2 p-1 rounded-sm'>
            <BaseCard>
                <DesktopUsers clerkId={user?.id!} />
            </BaseCard>
            <BaseCard>
                <MobileUsers clerkId={user?.id!} />
            </BaseCard>
        </section>
    )
}

export default MetricsPage