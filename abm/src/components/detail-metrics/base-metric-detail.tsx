import React from 'react'
import BaseCard from '../base-card'
import { CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import { currentUser } from '@clerk/nextjs/server'
import { DetailMetricsResponse } from '@/interfaces'
import { icons } from '@/constants'
import { cn } from '@/lib/utils'

const BaseMetricDetail = async ({ type }: { type: string }) => {
    const user = await currentUser()

    const detailWidgets: DetailMetricsResponse = await fetchAction(api.metrics.getMetrics,
        {
            query: `select toDate(timestamp - interval 3 hour) as timestamp, properties.title, properties.widgetUrl, properties.img, count() as t_count from events where distinct_id = 'templateID' and event = 'widget_click' and properties.type = '${type}' and timestamp > now() - interval 3 month group by properties.title, properties.widgetUrl, properties.img, timestamp order by t_count desc limit 5`,
            clerkId: user?.id!
        })

    // const detailWidgets = [['https://necessary-tapir-611.convex.cloud/api/storage/d6720f98-ecb2-4048-aafc-c4bec81beb1a', 'Titulo', 45], ['https://necessary-tapir-611.convex.cloud/api/storage/59ec32c9-4cce-4d78-9bfc-1d87156dc141', 'Titulo 2', 60]]

    // [
    //     [ '2025-02-26', 'Link', null, null, 4 ],
    //     [ '2025-03-11', 'Linkkkkkk', null, null, 3 ],
    //     [
    //       '2025-03-11',
    //       'Linkkkkkk',
    //       'https://www.google.com/maps/@39.6558374,2.9176727,10.58z?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D',
    //       null,
    //       1
    //     ]
    //   ]

    const getIcons = (iconName: string) => {
        if (iconName) {
            const Icon = icons.find(ic => ic.name === iconName)?.icon!
            return <Icon />
        } else {
            return ''
        }
    }

    const isSocial = type === 'social'

    return (
        <BaseCard containerClassName='w-full'>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Más usados</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="px-2 py-2">
                {
                    detailWidgets?.map((m, i) => (
                        <div key={i}
                            className='flex flex-col md:grid md:grid-cols-[1fr_50px] w-full justify-between hover:bg-slate-300 transition-all gap-1 md:gap-5'
                            style={{ borderBottom: detailWidgets.length - 1 === i ? '' : '1px solid black' }}>
                            <div className={cn(`grid grid-cols-[1fr_1fr] md:grid-cols-[150px_1fr] gap-5 w-full`, isSocial && 'grid-cols-[30px_1fr]')}>
                                <span className='text-ellipsis whitespace-nowrap overflow-hidden'>{isSocial ? getIcons(m[1]!) : m[1]}</span>
                                <Link
                                    href={decodeURIComponent(m[2] as string)}
                                    target='_blank'
                                    className='text-ellipsis whitespace-nowrap overflow-hidden transition-all cursor-pointer hover:underline'>
                                    {decodeURIComponent(m[2] || '' as string)}
                                </Link>
                            </div>
                            <span>{m[4]}</span>
                        </div>
                    ))
                }
            </CardContent>
        </BaseCard>
    )
}

export default BaseMetricDetail