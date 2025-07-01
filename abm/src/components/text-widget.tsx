import React from 'react'

import { useDataStore } from '@/providers/data-store-providers'
import ToolsWidget from './tools-widget'
import { TextWidgetInterface } from '@/interfaces'
import WidgetBaseCard from './widget-base-card'
import PlaceholdersWidgets from './widgets/placeholders-widgets'
import { useIsSmall } from '@/hooks/use-media.query'
import { cn } from '@/lib/utils'

const TextWidget = ({ widget, selectSection, editWidget, layout, props }: TextWidgetInterface) => {
    const deleteWidget = useDataStore(state => state.deleteWidget)
    const isEditing = widget.id === editWidget?.id
    const _deleteWidget = () => {
        selectSection('', 0, {})
        deleteWidget(widget)
    }

    const isSmall = useIsSmall()

    return (
        <WidgetBaseCard>
            <div
                className={cn('flex w-full h-full p-2 relative flex-1 rounded-md', `${!props ? 'sm:active:bg-inherit' : 'sm:active:bg-slate-400'} ${isSmall ? '' : 'touch-none'}`)}
                {...!isSmall && props}
            >
                <div className='w-full min-h-[100px] max-h-[100px] text-center overflow-hidden break-words'
                    style={{ color: widget.data?.textColor || layout?.textsColor }}
                >
                    {widget.data?.value || <PlaceholdersWidgets type='text' />}
                </div>
            </div>
            {
                selectSection &&
                <ToolsWidget
                    deleteFunc={_deleteWidget}
                    editFunc={() => selectSection('textWidget', 0, widget)}
                    isEditing={isEditing}
                    {...isSmall && { props }}
                />
            }
        </WidgetBaseCard>
    )
}

export default TextWidget