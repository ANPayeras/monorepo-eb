import React from 'react'
import Image from 'next/image'
import { IconPhotoScan } from '@tabler/icons-react'
import { Widget } from '@/types'
import WidgetBaseCard from '../widget-base-card'

const ImgWidget = ({ widget }: { widget: Widget }) => {
    const image = widget.data?.img?.uploadImgUrl || ''
    return (
        <WidgetBaseCard>
            <div className='flex w-full max-h-[200px] relative'>
                {
                    image ?
                        <>
                            <Image
                                src={image}
                                alt='img-widget'
                                className='rounded-md object-cover'
                                width={1000}
                                height={100}
                            />
                            <span
                                className='absolute p-10 flex w-full h-full justify-center items-center overflow-hidden break-words break-all'
                                style={{ color: widget.data?.textColor }}
                            >
                                {widget.data?.value}
                            </span>
                        </> :
                        <div className='w-full h-full flex justify-center'>
                            <IconPhotoScan size={80} />
                        </div>
                }
            </div>
        </WidgetBaseCard>
    )
}

export default ImgWidget