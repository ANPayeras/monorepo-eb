import React from 'react'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'

const MostVisitedPathNames = async ({ clerkId }: { clerkId: string }) => {

    const metrics: [number, number][] = await fetchAction(api.metrics.getMetrics,
        {
            query: "select properties.$pathname, count() as pt_count from events where events.event = '$pageview' and events.distinct_id = 'j57b89e98na61nm6jchkp1wct174kg83' group by properties.$pathname order by pt_count desc",
            clerkId
        })

    // console.log(metrics)
    return (
        <div className='flex flex-col gap-1'>
            <span className='text-center'>Paginas mas visitadas</span>
            {
                metrics.map((m, i) => (
                    <div key={i}
                        className='flex w-full justify-between'
                        style={{ borderBottom: metrics.length - 1 === i ? '' : '1px solid black' }}>
                        <span>{m[0]}</span>
                        <span>{m[1]}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default MostVisitedPathNames