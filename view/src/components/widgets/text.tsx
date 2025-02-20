import React from 'react'
import { Widget } from '@/types'
import WidgetBaseCard from '../widget-base-card'
import { Doc } from '../../../convex/_generated/dataModel'

const Text = ({ widget, template }: { widget: Widget, template: Doc<"templates"> }) => {
    const { layout } = template
    return (
        <>
            {
                widget?.data?.value ?
                    <WidgetBaseCard>
                        <div className='flex w-full h-full p-2 relative flex-1'>
                            <div
                                className='w-full text-center overflow-hidden break-words'
                                style={{ color: widget.data?.textColor || layout?.textsColor }}
                            >
                                {widget.data?.value}
                            </div>
                        </div>
                    </WidgetBaseCard> : <></>
            }
        </>
    )
}

export default Text