import React from 'react'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import {
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const MostVisitedPathNames = async ({ clerkId }: { clerkId: string }) => {

    const metrics: [string, number][] = await fetchAction(api.metrics.getMetrics,
        {
            query: "select properties.$pathname, count() as pt_count from events where events.event = '$pageview' and events.distinct_id = 'templateID' group by properties.$pathname order by pt_count desc",
            clerkId
        })

    return (
        <>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Paginas mas visitadas</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="px-2 py-2">
                {
                    metrics?.map((m, i) => (
                        <div key={i}
                            className='flex w-full justify-between'
                            style={{ borderBottom: metrics.length - 1 === i ? '' : '1px solid black' }}>
                            <span>{decodeURIComponent(m[0])}</span>
                            <span>{m[1]}</span>
                        </div>
                    ))
                }
            </CardContent>
        </>
    )
}

export default MostVisitedPathNames