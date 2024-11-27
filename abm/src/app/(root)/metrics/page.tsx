import { fetchAction } from 'convex/nextjs'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { currentUser } from '@clerk/nextjs/server'

const MetricsPage = async () => {
    const a = await currentUser()
    const metrics = await fetchAction(api.metrics.getMetrics,
        {
            query: "SELECT count() from events WHERE events.event = '$pageview' AND events.distinct_id = 'templateID' AND events.properties.$device_type = 'Desktop' AND events.properties.$prev_pageview_pathname is null",
            clerkId: a?.id!
        })
    console.log(metrics[0][0])
    return (
        <section className='size-full max-w-[1000px] m-auto'>
            <div>
                aa
            </div>
        </section>
    )
}

export default MetricsPage