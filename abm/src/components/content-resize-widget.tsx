import React, { memo, ReactNode } from 'react'
import Image from 'next/image'
import { IconPlus } from '@tabler/icons-react'

const ContentResizeWidget = ({ value, image, textColor, placeholder }: { value?: string, image?: string, textColor?: string, placeholder?: string }) => {

    if (!value && !image) {
        if (placeholder) {
            return (
                <span className="opacity-50 overflow-hidden text-ellipsis text-nowrap">{placeholder}</span>
            )
        } else {
            return (
                <div
                    className="rounded-full border border-slate-950 cursor-pointer hover:scale-105 hover:opacity-50 transition-all"
                >
                    <IconPlus />
                </div>
            )
        }
    }

    return (
        <>
            <div
                className='w-full h-auto overflow-hidden z-10 text-center text-sm sm:text-medium break-words absolute p-6 top-1/2 -translate-y-1/2 left-0'
                style={{ color: textColor }}
            >
                {value}
            </div>
            {
                image &&
                <Image
                    src={image}
                    alt='panel-img-widget'
                    className='object-cover absolute z-0 h-full'
                    width={1000}
                    height={100}
                />
            }
        </>)
}

export default memo(ContentResizeWidget)