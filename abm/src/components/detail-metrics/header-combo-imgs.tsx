import React from 'react'
import BaseCard from '../base-card'
import { CardDescription, CardTitle } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import Image from 'next/image'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'

const HeaderComboImgs = async ({ clerkId, queryDinamic }: { clerkId: string, queryDinamic: string }) => {
    const detailWidgets: [string, string, number][] = await fetchAction(api.metrics.getMetrics,
        {
            query: `select properties.imgUrl, properties.title, count() as t_count  from events where distinct_id = 'templateID' and event = 'widget_click' ${queryDinamic} group by properties.imgUrl, properties.title order by t_count desc limit 5`,
            clerkId
        })
    return (
        <BaseCard containerClassName='w-full flex flex-col gap-2 justify-center items-center h-full bg-slate-900'>
            <CardTitle className='text-slate-50 border-b w-full pb-2 text-center'>Imagenes mas Clikeadas</CardTitle>
            <Carousel className='w-full'>
                <CarouselContent>
                    {
                        detailWidgets.map((m, i) => (
                            <CarouselItem
                                key={i}
                                className='w-full relative h-[400px] flex flex-col justify-center items-center'>
                                <div className='absolute flex md:flex-col gap-2 top-0 left-4 bg-slate-300 rounded-br-sm bg-opacity-90'>
                                    <CardTitle className='text-sm md:text-medium'>Titulo: {'"'}{m[1]}{'"'}</CardTitle>
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
        </BaseCard>
    )
}

export default HeaderComboImgs