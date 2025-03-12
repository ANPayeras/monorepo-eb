import React from 'react'
import { Widget } from '@/types'
import WidgetBaseCard from '../widget-base-card'
import useSentEvent from '@/hooks/use-sent-events'
import { BlurImage } from '../blur-image'

const ImgWidget = ({ widget }: { widget: Widget }) => {
    const { sentEvent } = useSentEvent()
    const image = widget.data?.img?.uploadImgUrl || ''
    const value = widget?.data?.value
    const url = widget?.data?.url

    const redirect = () => {
        window.open(widget?.data?.url, '_blank')
        sentEvent('widget_click', {
            type: widget.type,
            title: value,
            widgetUrl: url,
            img: image,
        })
    }

    return (
        <>
            {
                image &&
                <WidgetBaseCard containerClassName={`${url && 'cursor-pointer'}`}>
                    <div className='flex w-full max-h-[200px] relative' onClick={url ? () => redirect() : undefined}>
                        <BlurImage
                            alt='img-widget'
                            width='1000'
                            height='100'
                            className='rounded-md object-cover'
                            src={image}
                        />
                        <span
                            className='absolute p-10 flex w-full h-full justify-center items-center overflow-hidden break-words break-all'
                            style={{ color: widget.data?.textColor }}
                        >
                            {value}
                        </span>
                    </div>
                </WidgetBaseCard>
            }
        </>
    )
}

export default ImgWidget