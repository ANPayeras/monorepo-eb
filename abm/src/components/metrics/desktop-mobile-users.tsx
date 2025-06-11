import React from 'react'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import { BarChartComponent } from '../charts/bar-chart'
import { ChartConfig } from '../ui/chart'

const DesktopMobileUsers = async ({ clerkId }: { clerkId: string }) => {

    let chartData: { xData: string, desktop: number, mobile: number }[] = []

    const chartConfig = {
        views: {
            label: "Visitas",
        },
        desktop: {
            label: "Escritorio",
            color: "hsl(var(--chart-1))",
        },
        mobile: {
            label: "Mobil",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig

    const desktopUsers = await fetchAction(api.metrics.getMetrics,
        {
            query: "SELECT toDate(timestamp - interval 3 hour) as timestamp, count() from events WHERE events.event = '$pageview' AND events.distinct_id = 'templateID' AND events.properties.$device_type = 'Desktop' AND events.properties.$prev_pageview_pathname is null AND timestamp > now() - interval 3 month group by timestamp order by timestamp",
            clerkId
        })

    const mobileUsers = await fetchAction(api.metrics.getMetrics,
        {
            query: "SELECT toDate(timestamp - interval 3 hour) as timestamp, count() from events WHERE events.event = '$pageview' AND events.distinct_id = 'templateID' AND events.properties.$device_type = 'Mobile' AND events.properties.$prev_pageview_pathname is null AND timestamp > now() - interval 3 month group by timestamp order by timestamp",
            clerkId
        })

    desktopUsers?.forEach((metric: [string, number]) => {
        let date = chartData.find(m => m.xData === metric[0])
        let datePos = chartData.findIndex(m => m.xData === metric[0])
        if (date) {
            date = { ...date, desktop: metric[1] as number }
            chartData.splice(datePos, 1, date)
        } else {
            date = { xData: metric[0] as string, desktop: metric[1] as number, mobile: 0 }
            chartData.push(date)
        }
    });

    mobileUsers?.forEach((metric: [string, number]) => {
        let date = chartData.find(m => m.xData === metric[0])
        let datePos = chartData.findIndex(m => m.xData === metric[0])
        if (date) {
            date = { ...date, mobile: metric[1] as number }
            chartData.splice(datePos, 1, date)
        } else {
            date = { xData: metric[0] as string, desktop: 0, mobile: metric[1] as number }
            chartData.push(date)
        }
    });

    return (
        <BarChartComponent
            title={'Total de visitas por dispositivo'}
            description={'Últimos 3 meses'}
            chartConfig={chartConfig}
            chartData={chartData}
            tabs={["desktop", "mobile"]}
            formatterType={'date'}
        />
    )
}

export default DesktopMobileUsers