import { fetchAction } from 'convex/nextjs'
import React from 'react'
import { api } from '../../../../../convex/_generated/api'
import { currentUser } from '@clerk/nextjs/server'
import DesktopMobileUsers from '@/components/metrics/desktop-mobile-users'
import { BarChartCustom } from '@/components/charts/bar-chart-custom'
import BaseCard from '@/components/base-card'
import { ChartConfig } from '@/components/ui/chart'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { days } from '@/constants'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'

const MetricDetail = async ({ searchParams }: { searchParams: { type: string, combo?: string } }) => {
    const user = await currentUser()
    const { type, combo } = searchParams

    const queryDinamic = `and properties.type = '${type}' ${combo ? `and properties.comboNumber = '${combo}'` : ''}`
    const widgetHours = [[23, 21], [0, 9], [12, 5], [9, 3], [22, 2]]
    const widgetDays = [[2, 29], [3, 16]]
    const desktopUsers = [[450000]]
    const mobileUsers = [[0]]
    const locationsUsers = [['Argentina', 'Buenos Aires'], ['Argentina', 'Buenos Aires'], ['Argentina', 'Buenos Aires'], ['Argentina', 'Buenos Aires']]
    const detailWidgets = [['https://necessary-tapir-611.convex.cloud/api/storage/d6720f98-ecb2-4048-aafc-c4bec81beb1a', 'Titulo', 45], ['https://necessary-tapir-611.convex.cloud/api/storage/59ec32c9-4cce-4d78-9bfc-1d87156dc141', 'Titulo 2', 60]]
    // const widgetHours = await fetchAction(api.metrics.getMetrics,
    //     {
    //         query: `select toHour(timestamp - interval 3 hour), count() as t_count from events where distinct_id = 'templateID' ${queryDinamic} group by toHour(timestamp - interval 3 hour) order by t_count desc limit 5`,
    //         clerkId: user?.id!
    //     })

    // const widgetDays = await fetchAction(api.metrics.getMetrics,
    //     {
    //         query: `select toDayOfWeek(timestamp - interval 3 hour), count() as t_count from events where distinct_id = 'templateID' and event = 'widget_click' ${queryDinamic} group by toDayOfWeek(timestamp - interval 3 hour) order by t_count desc limit 5`,
    //         clerkId: user?.id!
    //     })

    // const desktopUsers = await fetchAction(api.metrics.getMetrics,
    //     {
    //         query: `select count() as t_count from events where distinct_id = 'templateID' and event = 'widget_click' ${queryDinamic} and properties.$device_type = 'Desktop' order by t_count desc`,
    //         clerkId: user?.id!
    //     })

    // const mobileUsers = await fetchAction(api.metrics.getMetrics,
    //     {
    //         query: `select count() as t_count from events where distinct_id = 'templateID' and event = 'widget_click' ${queryDinamic} and properties.$device_type = 'Mobile' order by t_count desc`,
    //         clerkId: user?.id!
    //     })

    // const locationsUsers = await fetchAction(api.metrics.getMetrics,
    //     {
    //         query: `select properties.$geoip_country_name, properties.$geoip_city_name from events where distinct_id = 'templateID' and event = 'widget_click' ${queryDinamic} group by properties.$geoip_country_name, properties.$geoip_city_name`,
    //         clerkId: user?.id!
    //     })

    // const detailWidgets = await fetchAction(api.metrics.getMetrics,
    //     {
    //         query: `select properties.imgUrl, properties.title, count() as t_count  from events where distinct_id = 'templateID' and event = 'widget_click' ${queryDinamic} group by properties.imgUrl, properties.title order by t_count desc limit 5`,
    //         clerkId: user?.id!
    //     })

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
        chartDataHours.push({ hour: `${m[0]}hs`, count: m[1], })
    });

    widgetDays?.forEach((m) => {
        chartDataDays.push({ day: days[m[0]], count: m[1], })
    });

    return (
        <section className='size-full max-w-[1000px] m-auto flex flex-col p-1 rounded-sm overflow-y-scroll gap-2'>
            <div className='flex flex-col md:flex-row gap-2'>
                <BaseCard containerClassName='w-full flex-1'>
                    <CardTitle>Header</CardTitle>
                </BaseCard>
                <BaseCard containerClassName='w-full flex flex-1'>
                    <div
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left sm:px-8 sm:py-6"
                    >
                        <span className="text-xs text-muted-foreground">
                            Clicks en Escritorio
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {desktopUsers[0][0].toLocaleString(['es-ES'])}
                        </span>
                    </div>
                    <div
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left border-l sm:px-8 sm:py-6"
                    >
                        <span className="text-xs text-muted-foreground">
                            Clicks en mobiles
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {mobileUsers[0][0].toLocaleString(['es-ES'])}
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
                <BaseCard>
                    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle>Ubicacion de los usuarios</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 py-2">
                        {
                            locationsUsers?.map((m, i) => (
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
                <BaseCard containerClassName='w-full'>
                    <Carousel>
                        <CarouselContent>
                            {
                                detailWidgets.map((m, i) => (
                                    <CarouselItem
                                        key={i}
                                        className='w-full relative flex flex-col gap-2 justify-start items-center'>
                                        <div>
                                            <CardTitle>Titulo: '{m[1]}'</CardTitle>
                                            <CardDescription>Clicks: {m[2].toLocaleString(['es-ES'])}</CardDescription>
                                        </div>
                                        <div>
                                        <Image
                                            alt="image"
                                            className="max-w-full max-h-full"
                                            width={500}
                                            height={200}
                                            src={m[0]}
                                        />
                                        </div>
                                    </CarouselItem>
                                ))
                            }
                        </CarouselContent>
                        <CarouselPrevious className='left-2' />
                        <CarouselNext className='right-2' />
                    </Carousel>
                </BaseCard>
            </div>
        </section>
    )
}

export default MetricDetail