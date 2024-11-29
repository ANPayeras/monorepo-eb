import React from 'react'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'

const TimeVisitedHour = async ({ clerkId }: { clerkId: string }) => {

    const metrics: [number, number][] = await fetchAction(api.metrics.getMetrics,
        {
            query: "select toHour(timestamp - interval 3 hour), count() as t_count from events where events.event = '$pageview' and events.distinct_id = 'j57b89e98na61nm6jchkp1wct174kg83' group by toHour(timestamp - interval 3 hour) order by t_count desc limit 10",
            clerkId
        })

    // console.log(metrics)
    return (
        <div className='flex flex-col gap-1'>
            <span className='text-center'>Horas con mas visitas</span>
            {
                metrics.map((m, i) => (
                    <div key={i}
                        className='flex w-full justify-between'
                        style={{ borderBottom: metrics.length - 1 === i ? '' : '1px solid black' }}>
                        <span>{m[0]}hs</span>
                        <span>{m[1]}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default TimeVisitedHour