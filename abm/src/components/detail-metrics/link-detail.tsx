import React from 'react'
import BaseCard from '../base-card'
import { CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'

function LinkDetail() {
    // const detailWidgets: [string, string, number][] = await fetchAction(api.metrics.getMetrics,
    //     {
    //         query: `select properties.imgUrl, properties.title, count() as t_count  from events where distinct_id = 'templateID' and event = 'widget_click' ${queryDinamic} group by properties.imgUrl, properties.title order by t_count desc limit 5`,
    //         clerkId
    //     })
    const detailWidgets = [['https://necessary-tapir-611.convex.cloud/api/storage/d6720f98-ecb2-4048-aafc-c4bec81beb1a', 'Titulo', 45], ['https://necessary-tapir-611.convex.cloud/api/storage/59ec32c9-4cce-4d78-9bfc-1d87156dc141', 'Titulo 2', 60]]
    return (
        <BaseCard containerClassName='w-full'>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Links mas usados</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="px-2 py-2">
                {
                    detailWidgets?.map((m, i) => (
                        <div key={i}
                            className='flex flex-col md:flex-row w-full justify-between hover:bg-slate-300 transition-all gap-1'
                            style={{ borderBottom: detailWidgets.length - 1 === i ? '' : '1px solid black' }}>
                            <span>{m[1]}</span>
                            <Link
                                href={decodeURIComponent(m[0] as string)}
                                target='_blank'
                                className='text-ellipsis whitespace-nowrap overflow-hidden transition-all cursor-pointer hover:underline'>
                                {decodeURIComponent(m[0] as string)}
                            </Link>
                        </div>
                    ))
                }
            </CardContent>
        </BaseCard>
    )
}

export default LinkDetail