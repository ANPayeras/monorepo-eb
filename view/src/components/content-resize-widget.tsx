import React, { memo } from 'react'

import { BlurImage } from './blur-image'
import { ContentResizeWidgetProps } from '@/types'
import Icon from './icon'

const ContentResizeWidget = ({ value, image, textColor, placeholder, textAlign = 'center' }: ContentResizeWidgetProps) => {

    if (!value && !image) {
        if (placeholder) {
            return (
                <span className="opacity-50 overflow-hidden text-ellipsis text-nowrap">{placeholder}</span>
            )
        }
    }

    return (
        <>
            <div
                className="rounded-full border border-slate-950 cursor-pointer hover:scale-105 hover:opacity-50 z-20"
                style={{
                    visibility: value || image ? 'hidden' : 'visible'
                }}
            >
                <Icon name='plus' />
            </div>
            <div
                className='w-full h-auto overflow-hidden z-10 text-center text-sm sm:text-medium break-words whitespace-pre-line absolute p-6 top-1/2 -translate-y-1/2 left-0'
                style={{ color: textColor, textAlign: textAlign as 'center' }}
            >
                {value}
            </div>
            {
                image &&
                <BlurImage
                    alt='resizable-panel-img'
                    width='1000'
                    height='100'
                    className='object-cover absolute z-0 h-full'
                    src={image}
                />
            }
        </>)
}

export default memo(ContentResizeWidget)