import React from 'react'

import { Widget } from '@/types'
import useSentEvent from '@/hooks/use-sent-events'
import { BlurImage } from '../blur-image'
import WidgetBaseCardContainer from '../widget-base-card-container'

const ImgWidget = ({ widget }: { widget: Widget }) => {
    const { sentEvent } = useSentEvent()
    const { data, type } = widget
    const image = data?.img?.uploadImgUrl || ''
    const value = data?.value
    const url = data?.url

    const redirect = () => {
        window.open(url, '_blank')
        sentEvent('widget_click', {
            type,
            title: value,
            widgetUrl: url,
            img: image,
        })
    }

    const comp = <>
        <BlurImage
            alt='img-widget'
            width='1000'
            height='100'
            className='rounded-md object-cover'
            style={{
                borderRadius: `${data?.container?.border?.rounded ? `${data?.container?.border?.rounded}px` : ''}`,
            }}
            src={image}
        />
        <span
            className='absolute p-10 w-full h-full overflow-hidden break-words break-all whitespace-pre-line'
            style={{
                color: data?.textColor,
                textAlign: data?.textAlign as '' || 'center',
            }}
        >
            {value}
        </span>
    </>

    if (image) {
        if (url) {
            return (
                <WidgetBaseCardContainer widget={widget}>
                    <button className='flex w-full max-h-[200px] relative' onClick={() => redirect()}>
                        {comp}
                    </button>
                </WidgetBaseCardContainer>
            )
        } else {
            return (
                <WidgetBaseCardContainer widget={widget}>
                    <div className='flex w-full max-h-[200px] relative'>
                        {comp}
                    </div>
                </WidgetBaseCardContainer>
            )
        }
    } else {
        return <></>
    }
}

export default ImgWidget