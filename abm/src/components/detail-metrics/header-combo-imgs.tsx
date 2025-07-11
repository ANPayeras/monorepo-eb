import React from 'react'

import BaseCard from '../base-card'
import { CardDescription, CardTitle } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import Image from 'next/image'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import EmptyChartInfo from '../charts/empty-chart-info'
import { Id } from '../../../convex/_generated/dataModel'

const HeaderComboImgs = async ({ templateId, queryDinamic }: { templateId: Id<"templates">, queryDinamic: string }) => {
    const detailWidgets: [string, string, number][] = await fetchAction(api.metrics.getMetrics,
        {
            query: `select properties.imgUrl, properties.title, count() as t_count  from events where distinct_id = 'templateID' and event = 'widget_click' ${queryDinamic} group by properties.imgUrl, properties.title order by t_count desc limit 5`,
            templateId
        })
    // const detailWidgets = [['https://res.cloudinary.com/dvf8cxl3e/image/upload/v1749409111/dphgl2kctkbbo4lgmewu.png', 'Titulo', 45], ['https://res.cloudinary.com/dvf8cxl3e/image/upload/v1749409111/dphgl2kctkbbo4lgmewu.png', 'Titulo 2', 60]]
    return (
        <BaseCard containerClassName='w-full flex flex-col gap-2 justify-center items-center h-full bg-slate-900'>
            <CardTitle className='text-slate-50 border-b w-full pb-2 text-center'>Imágenes más vistas</CardTitle>
            {
                !detailWidgets?.length ? <EmptyChartInfo className='text-slate-50' /> :
                    <Carousel className='w-full'>
                        <CarouselContent>
                            {
                                detailWidgets.map((m, i) => (
                                    <CarouselItem
                                        key={i}
                                        className='w-full relative h-[400px] flex flex-col justify-center items-center'>
                                        <div className='absolute flex md:flex-col gap-2 top-0 left-4 bg-slate-300 rounded-br-sm bg-opacity-90'>
                                            <CardTitle className='text-sm md:text-medium'>Título: {'"'}{m[1]}{'"'}</CardTitle>
                                            <CardDescription>Clicks: {m[2].toLocaleString(['es-ES'])}</CardDescription>
                                        </div>
                                        <Image
                                            alt="image"
                                            className="h-full w-full object-contain"
                                            width={1000}
                                            height={1000}
                                            src={m[0]}
                                        />
                                    </CarouselItem>
                                ))
                            }
                        </CarouselContent>
                        <CarouselPrevious className='left-2' />
                        <CarouselNext className='right-2' />
                    </Carousel>
            }
        </BaseCard>
    )
}

export default HeaderComboImgs