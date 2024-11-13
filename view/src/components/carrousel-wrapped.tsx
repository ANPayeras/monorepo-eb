"use client"
import React, { useEffect, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { BlurImage } from './blur-image'
import { Id } from '../../convex/_generated/dataModel'

const CarrouselWrapped = ({ data }: { data: { url: string, storageId: string | Id<"_storage"> }[] }) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <Carousel className='h-full w-full' setApi={setApi}>
            <CarouselContent className='h-full w-full m-0'>
                {
                    data.length > 1 && data.slice(0, data.length - 1).map((img, i) => (
                        <CarouselItem key={i} className='w-full max-h-[300px] relative h-auto flex justify-center items-center p-0'>
                            <BlurImage
                                alt='header-img'
                                width='100'
                                height='100'
                                className='h-full w-full object-cover hover:scale-110 transition-all'
                                src={img.url}
                            />
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            {
                data[1].url &&
                <>
                    <CarouselPrevious className='left-0 hidden md:flex' />
                    <CarouselNext className='right-0 hidden md:flex' />
                </>
            }
            <div className="py-2 flex gap-2 justify-center items-center absolute bottom-0 left-0 w-full">
                {
                    count > 1 ?
                        Array.from({ length: count }, (_, i) => (i + 1)).map((e) => (
                            <span key={e} className='rounded-full w-2 h-2 bg-slate-50' style={{ opacity: e === current ? 1 : .5 }} />
                        )) : <></>
                }
            </div>
        </Carousel>
    )
}

export default CarrouselWrapped