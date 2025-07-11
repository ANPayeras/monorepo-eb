import React from 'react'

import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import EmptyChartInfo from '../charts/empty-chart-info'
import { Id } from '../../../convex/_generated/dataModel'

const UsersLocation = async ({ templateId }: { templateId: Id<"templates"> }) => {

    const metrics: [string, string][] = await fetchAction(api.metrics.getMetrics,
        {
            query: "select properties.$geoip_country_name, properties.$geoip_city_name, count() as t_count from events where events.event = '$pageview' and events.distinct_id = 'templateID' and timestamp > now() - interval 3 month group by properties.$geoip_country_name, properties.$geoip_city_name order by t_count desc limit 5",
            templateId
        })

    return (
        <>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Ubicación de los usuarios</CardTitle>
                    <CardDescription>Últimos 3 meses</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-2 py-2">
                {
                    !metrics?.length ? <EmptyChartInfo /> :
                        metrics.map((m, i) => (
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