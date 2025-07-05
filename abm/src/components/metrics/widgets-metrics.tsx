import React from 'react'

import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import { capitalizeFirstLetter } from '@/lib/utils'
import { CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'
import EmptyChartInfo from '../charts/empty-chart-info'
import { Id } from '../../../convex/_generated/dataModel'

const WidgetsMetrics = async ({ templateId }: { templateId: Id<"templates"> }) => {

    const metrics: [string, string | null, number][] = await fetchAction(api.metrics.getMetrics,
        {
            query: "select distinct properties.type, properties.comboNumber, count() as t_count from events where distinct_id = 'templateID' and event = 'widget_click' and properties.type is not null and timestamp > now() - interval 3 month group by properties.type, properties.comboNumber order by t_count desc",
            templateId
        })

    // const metrics = [
    //     ['header', null, '', 45],
    //     [
    //         'combo',
    //         'combo 2',
    //         'https://necessary-tapir-611.convex.cloud/api/storage/d6720f98-ecb2-4048-aafc-c4bec81beb1a',
    //         32
    //     ],
    //     [
    //         'combo',
    //         'combo 1',
    //         'https://necessary-tapir-611.convex.cloud/api/storage/59ec32c9-4cce-4d78-9bfc-1d87156dc141',
    //         4
    //     ]
    // ]

    // const metrics = [
    //     ['resizable', null, 9],
    //     ['link', null, 8],
    //     ['img', null, 5],
    //     ['social', null, 3]
    // ]

    return (
        <>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Top Widgets</CardTitle>
                    <CardDescription>Últimos 3 meses</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-2 py-2">
                {
                    !metrics?.length ? <EmptyChartInfo /> :
                        <>
                            <div className='flex w-full md:w-1/2 justify-between pr-6 md:pr-0 mb-1'>
                                <span>Tipo</span>
                                <span>Interacciones</span>
                            </div>
                            {
                                metrics.map((m, i) => (
                                    <Link
                                        key={i}
                                        href={{
                                            pathname: `/metrics/${templateId}/detail`,
                                            query: { type: m[0], ...(m[1] && { combo: m[1] }) },
                                        }}
                                        className='flex w-full justify-between hover:bg-slate-200 transition-all cursor-pointer'
                                        style={{ borderBottom: metrics.length - 1 === i ? '' : '1px solid black', borderTop: i === 0 ? '1px solid black':'' }}>
                                        <div className='w-full flex justify-between md:w-1/2'>
                                            <span>{capitalizeFirstLetter(m[0] === 'combo' ? m[1] as string : m[0] as string)}</span>
                                            <span>{m[2]}</span>
                                        </div>
                                        <div className='flex gap-1'>
                                            <span><IconChevronRight className='hover:scale-105' /></span>
                                        </div>
                                    </Link>
                                ))
                            }
                        </>
                }
            </CardContent>
        </>
    )
}

export default WidgetsMetrics