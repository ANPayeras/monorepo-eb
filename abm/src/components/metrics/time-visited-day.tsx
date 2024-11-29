import React from 'react'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import { days } from '@/constants'

const TimeVisitedDay = async ({ clerkId }: { clerkId: string }) => {

    const metrics: [number, number][]  = await fetchAction(api.metrics.getMetrics,
        {
            query: "select toDayOfWeek(timestamp - interval 3 hour), count() as t_count from events where events.event = '$pageview' and events.distinct_id = 'j57b89e98na61nm6jchkp1wct174kg83' group by toDayOfWeek(timestamp - interval 3 hour) order by t_count desc limit 7",
            clerkId
        })

    console.log(metrics)
    return (
        <div className='flex flex-col gap-1'>
            <span className='text-center'>Dias con mas visitas</span>
            {
                metrics.map((m, i) => (
                    <div key={i}
                        className='flex w-full justify-between'
                        style={{ borderBottom: metrics.length - 1 === i ? '' : '1px solid black' }}>
                        <span>{days[m[0]]}</span>
                        <span>{m[1]}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default TimeVisitedDay