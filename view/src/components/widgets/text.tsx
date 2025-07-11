import React from 'react'

import { Widget } from '@/types'
import { Doc } from '../../../convex/_generated/dataModel'
import WidgetBaseCardContainer from '../widget-base-card-container'

const Text = ({ widget, template }: { widget: Widget, template: Doc<"templates"> }) => {
    const { layout } = template
    const { data } = widget

    return (
        <>
            {
                data?.value ?
                    <WidgetBaseCardContainer widget={widget}>
                        <div className='flex w-full h-full p-2 relative flex-1 break-words whitespace-pre-line'>
                            <div
                                className='w-full text-center overflow-hidden break-words'
                                style={{
                                    color: data?.textColor || layout?.textsColor,
                                    textAlign: data?.textAlign as '' || 'center',
                                }}
                            >
                                {data?.value}
                            </div>
                        </div>
                    </WidgetBaseCardContainer>
                    : <></>
            }
        </>
    )
}

export default Text