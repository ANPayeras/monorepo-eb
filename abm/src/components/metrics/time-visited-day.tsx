import React from 'react'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import { days } from '@/constants'
import { PieChartComponent } from '../charts/pie-chart'
import { ChartConfig } from '../ui/chart'

const TimeVisitedDay = async ({ clerkId }: { clerkId: string }) => {

    let chartConfig: { [key: string]: any } = {
        visitors: {
            label: "Visitas",
        },
    } satisfies ChartConfig

    let chartData: any[] = []

    const metrics: [number, number][] = await fetchAction(api.metrics.getMetrics,
        {
            query: "select toDayOfWeek(timestamp - interval 3 hour), count() as t_count from events where events.event = '$pageview' and events.distinct_id = 'templateID' group by toDayOfWeek(timestamp - interval 3 hour) order by t_count desc limit 7",
            clerkId
        })

    metrics?.forEach((m, i) => {
        chartConfig[days[m[0]]] = {
            label: days[m[0]],
            color: `hsl(var(--chart-${i + 1}))`,
        }
        chartData.push({ label: days[m[0]], visitors: m[1], fill: `var(--color-${days[m[0]]})` })
    });

    return (
        <PieChartComponent
            title='Dias con mas visitas'
            description='Desde el comienzo'
            chartConfig={chartConfig}
            chartData={chartData}
        />
    )
}

export default TimeVisitedDay