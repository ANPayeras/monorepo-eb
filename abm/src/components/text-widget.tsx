import React from 'react'

import { useDataStore } from '@/providers/data-store-providers'
import ToolsWidget from './tools-widget'
import { TextWidgetInterface } from '@/interfaces'
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
        <>
            <div
                className={cn('w-full min-h-[100px] overflow-hidden break-words whitespace-pre-line', `${!props ? 'sm:active:bg-inherit' : 'sm:active:bg-slate-400'}`)}
                style={{
                    color: widget.data?.textColor || layout?.textsColor,
                    textAlign: widget.data?.textAlign as '' || 'center',
                }}
                {...!isSmall && props}
            >
                {widget.data?.value || <PlaceholdersWidgets type='text' />}
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
        </>
    )
}

export default TextWidget