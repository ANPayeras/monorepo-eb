import React from 'react'
import { Widget } from '@/types'
import useSentEvent from '@/hooks/use-sent-events'
import WidgetBaseCard from '../widget-base-card'
import { Doc } from '../../../convex/_generated/dataModel'

const Link = ({ widget, template }: { widget: Widget, template: Doc<"templates"> }) => {
    const { sentEvent } = useSentEvent()
    const { layout } = template

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
                    <WidgetBaseCard containerClassName='cursor-pointer'>
                        <div onClick={redirect} className='flex w-full h-full p-2 relative flex-1'>
                            <div
                                className='w-full text-center overflow-hidden break-words'
                                style={{ color: widget.data?.textColor || layout?.textsColor }}
                            >
                                {widget.data?.value}
                            </div>
                        </div>
                    </WidgetBaseCard>
                    : <></>
            }
        </>
    )
}

export default Link