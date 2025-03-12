import React from 'react'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../../../convex/_generated/api'
import { currentUser } from '@clerk/nextjs/server'
import { BarChartCustom } from '@/components/charts/bar-chart-custom'
import BaseCard from '@/components/base-card'
import { ChartConfig } from '@/components/ui/chart'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { days, validCombos, validWidgetsTypes } from '@/constants'
import { capitalizeFirstLetter } from '@/lib/utils'
import { notFound } from 'next/navigation'
import HeaderComboImgs from '@/components/detail-metrics/header-combo-imgs'
import BaseMetricDetail from '@/components/detail-metrics/base-metric-detail'
import EmptyChartInfo from '@/components/charts/empty-chart-info'

const MetricDetail = async ({ searchParams }: { searchParams: { type: string, combo?: string } }) => {
    const user = await currentUser()
    const { type, combo } = searchParams

    const validRoute = (): boolean => {
        if (!type) return false
        if (type === 'combo' && !combo) return false
        if (!validWidgetsTypes.includes(type) || (combo && !validCombos.includes(combo))) return false

        return true
    }

    if (!validRoute()) notFound()

    const queryDinamic = `and properties.type = '${type}' ${combo ? `and properties.comboNumber = '${combo}'` : ''}`
    const metricsInterval = '3 month'
    // const widgetHours = [ [ '2025-02-26', 21, 4 ], [ '2025-03-11', 21, 4 ] ]
    // const widgetDays = [ [ '2025-02-26', 2, 4 ], [ '2025-03-11', 1, 4 ] ]
    // const desktopUsers = [[450000]]
    // const mobileUsers = [[0]]
    // const locationsUsers = [ [ 'Argentina', 'San Justo' ], [ 'Argentina', 'Isidro Casanova' ] ]

    const widgetHours: [string, number, number][] = await fetchAction(api.metrics.getMetrics,
        {
            query: `select toDate(timestamp - interval 3 hour) as timestamp, toHour(timestamp - interval 3 hour), count() as t_count from events where distinct_id = 'templateID' ${queryDinamic} and timestamp > now() - interval ${metricsInterval} group by timestamp, toHour(timestamp - interval 3 hour) order by t_count desc limit 5`,
            clerkId: user?.id!
        })

    const widgetDays: [string, number, number][] = await fetchAction(api.metrics.getMetrics,
        {
            query: `select toDate(timestamp - interval 3 hour) as timestamp, toDayOfWeek(timestamp - interval 3 hour), count() as t_count from events where distinct_id = 'templateID' and event = 'widget_click' ${queryDinamic} and timestamp > now() - interval ${metricsInterval} group by timestamp, toDayOfWeek(timestamp - interval 3 hour) order by t_count desc limit 5`,
            clerkId: user?.id!
        })

    const desktopUsers = await fetchAction(api.metrics.getMetrics,
        {
            query: `select count() as t_count from events where distinct_id = 'templateID' and event = 'widget_click' ${queryDinamic} and timestamp > now() - interval ${metricsInterval} and properties.$device_type = 'Desktop' order by t_count desc`,
            clerkId: user?.id!
        })

    const mobileUsers = await fetchAction(api.metrics.getMetrics,
        {
            query: `select count() as t_count from events where distinct_id = 'templateID' and event = 'widget_click' ${queryDinamic} and timestamp > now() - interval ${metricsInterval} and properties.$device_type = 'Mobile' order by t_count desc`,
            clerkId: user?.id!
        })

    const locationsUsers: [string, string][] = await fetchAction(api.metrics.getMetrics,
        {
            query: `select properties.$geoip_country_name, properties.$geoip_city_name, count() as t_count from events where distinct_id = 'templateID' and event = 'widget_click' ${queryDinamic} and timestamp > now() - interval ${metricsInterval} group by properties.$geoip_country_name, properties.$geoip_city_name order by t_count desc limit 5`,
            clerkId: user?.id!
        })

    const chartDataHours: { hour: string, count: number }[] = []
    const chartDataDays: { day: string, count: number }[] = []

    const chartConfigHours = {
        count: {
            label: "Clicks",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig

    const chartConfigDays = {
        count: {
            label: "Clicks",
            color: "hsl(var(--chart-5))",
        },
    } satisfies ChartConfig

    widgetHours?.forEach((m) => {
        chartDataHours.push({ hour: `${m[1]}hs`, count: m[2], })
    });

    widgetDays?.forEach((m) => {
        chartDataDays.push({ day: days[m[1]], count: m[2], })
    });

    const detail: { [index: string]: JSX.Element } = {
        header: <HeaderComboImgs clerkId={user?.id!} queryDinamic={queryDinamic} />,
        combo: <HeaderComboImgs clerkId={user?.id!} queryDinamic={queryDinamic} />,
        link: <BaseMetricDetail type='link' />,
        social: <BaseMetricDetail type='social' />,
        img: <BaseMetricDetail type='img' />,
        resizable: <BaseMetricDetail type='resizable' />,
    }

    const _desktopUsers = desktopUsers?.length ? desktopUsers[0][0].toLocaleString(['es-ES']) : 0
    const _mobileUsers = mobileUsers?.length ? mobileUsers[0][0].toLocaleString(['es-ES']) : 0

    return (
        <section className='size-full max-w-[1000px] m-auto flex flex-col p-1 rounded-sm overflow-y-scroll gap-2'>
            <div className='flex flex-col md:flex-row gap-2'>
                <BaseCard containerClassName='w-full h-full flex-1 flex items-center justify-center'>
                    <CardTitle>Tipo de Widget - {capitalizeFirstLetter(combo ? combo : type)}</CardTitle>
                </BaseCard>
                <BaseCard containerClassName='w-full flex flex-1'>
                    <div
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left sm:px-8 sm:py-6"
                    >
                        <span className="text-xs text-muted-foreground">
                            Clicks en Escritorio
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {_desktopUsers}
                        </span>
                    </div>
                    <div
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left border-l sm:px-8 sm:py-6"
                    >
                        <span className="text-xs text-muted-foreground">
                            Clicks en mobiles
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {_mobileUsers}
                        </span>
                    </div>
                </BaseCard>
            </div>
            <div className='flex flex-col md:flex-row gap-2'>
                <BaseCard containerClassName='w-full'>
                    <BarChartCustom
                        title='Horas mas visitadas'
                        chartConfig={chartConfigHours}
                        chartData={chartDataHours}
                        xDataKey='count'
                        yDataKey='hour'
                    />
                </BaseCard>
                <BaseCard containerClassName='w-full'>
                    <BarChartCustom
                        title='Dias mas visitados'
                        chartConfig={chartConfigDays}
                        chartData={chartDataDays}
                        xDataKey='count'
                        yDataKey='day'
                    />
                </BaseCard>
            </div>
            <div className='flex flex-col md:flex-row gap-2'>
                <BaseCard containerClassName='w-full'>
                    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle>Ubicacion de los usuarios</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 py-2">
                        {
                            !locationsUsers?.length ? <EmptyChartInfo /> :
                                locationsUsers.map((m, i) => (
                                    <div key={i}
                                        className='flex w-full justify-between hover:bg-slate-300 transition-all'
                                        style={{ borderBottom: locationsUsers.length - 1 === i ? '' : '1px solid black' }}>
                                        <span>{m[1]}, {m[0]}</span>
                                    </div>
                                ))
                        }
                    </CardContent>
                </BaseCard>
            </div>
            <div>
                {detail[type]}
            </div>
        </section>
    )
}

export default MetricDetail