import React from 'react'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import { ChartConfig } from '../ui/chart'
import { BarChartComponent } from '../charts/bar-chart'

const TimeVisitedHour = async ({ clerkId }: { clerkId: string }) => {

    let chartData: { xData: number, hourViews: number }[] = []

    const chartConfig = {
        views: {
            label: "Visitas",
        },
        hourViews: {
            label: "Horaaa",
            color: "hsl(var(--chart-3))",
        },
    } satisfies ChartConfig

    const metrics: [number, number][] = await fetchAction(api.metrics.getMetrics,
        {
            query: "select toHour(timestamp - interval 3 hour), count() as t_count from events where events.event = '$pageview' and events.distinct_id = 'templateID' and timestamp > now() - interval 3 month group by toHour(timestamp - interval 3 hour) order by t_count desc limit 5",
            clerkId
        })

    metrics?.forEach((metric: [number, number]) => {
        chartData.push({
            xData: metric[0],
            hourViews: metric[1],
        })
    });

    return (
        <div className='flex flex-col gap-1'>
            <BarChartComponent
                title={'Horas con más visitas'}
                description={'Últimos 3 meses'}
                chartConfig={chartConfig}
                chartData={chartData}
                formatterType={'hour'}
                dataKey={'hourViews'}
            />
        </div>
    )
}

export default TimeVisitedHour