import React from 'react'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import { CardContent, CardHeader, CardTitle } from '../ui/card'

const UsersLocation = async ({ clerkId }: { clerkId: string }) => {

    const metrics: [string, string][] = await fetchAction(api.metrics.getMetrics,
        {
            query: "select properties.$geoip_country_name, properties.$geoip_city_name from events where events.event = '$pageview' and events.distinct_id = 'templateID' group by properties.$geoip_country_name, properties.$geoip_city_name",
            clerkId
        })

    return (
        <>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Ubicacion de los usuarios</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="px-2 py-2">
                {
                    metrics?.map((m, i) => (
                        <div key={i}
                            className='flex w-full justify-between'
                            style={{ borderBottom: metrics.length - 1 === i ? '' : '1px solid black' }}>
                            <span>{m[1]}, {m[0]}</span>
                        </div>
                    ))
                }
            </CardContent>
        </>
    )
}

export default UsersLocation