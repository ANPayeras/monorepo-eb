import React from 'react'

import { Widget } from '@/types'
import useSentEvent from '@/hooks/use-sent-events'
import { Doc } from '../../../convex/_generated/dataModel'
import WidgetBaseCardContainer from '../widget-base-card-container'

const Link = ({ widget, template }: { widget: Widget, template: Doc<"templates"> }) => {
    const { sentEvent } = useSentEvent()
    const { layout } = template
    const { data, type } = widget
    const value = data?.value
    const url = data?.url

    const redirect = () => {
        window.open(url, '_blank')
        sentEvent('widget_click', {
            type,
            title: value,
            widgetUrl: url,
        })
    }

    return (
        <>
            {
                data?.value ?
                    <WidgetBaseCardContainer widget={widget}>
                        <button onClick={redirect} className='flex w-full h-full p-2 relative flex-1'>
                            <div
                                className='w-full overflow-hidden break-words whitespace-pre-line'
                                style={{
                                    color: data?.textColor || layout?.textsColor,
                                    textAlign: data?.textAlign as '' || 'center',
                                }}
                            >
                                {value}
                            </div>
                        </button>
                    </WidgetBaseCardContainer>
                    : <></>
            }
        </>
    )
}

export default Link