import React from 'react'
import { Widget } from '@/types'
import useSentEvent from '@/hooks/use-sent-events'

const Link = ({ widget }: { widget: Widget }) => {
    const { sentEvent } = useSentEvent()

    const redirect = () => {
        window.open(widget.data?.url, '_blank')
        sentEvent('widget_click', {
            type: widget.type,
            title: widget.title,
            linkUrl: widget.data?.url,
        })
    }

    return (
        <>
            {
                widget?.data?.value ?
                    <div
                        onClick={redirect}
                        className='w-[90%] py-4 px-4 flex items-center justify-center text-center border rounded-sm shadow-md cursor-pointer hover:scale-105 transition-all'
                    >
                        {widget?.data?.value}
                    </div> : <></>
            }
        </>
    )
}

export default Link