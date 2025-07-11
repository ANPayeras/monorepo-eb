import React from 'react'

import { useDataStore } from '@/providers/data-store-providers'
import ToolsWidget from './tools-widget'
import { LinkWidgetInterface } from '@/interfaces'
import PlaceholdersWidgets from './widgets/placeholders-widgets'
import { useIsSmall } from '@/hooks/use-media.query'
import { cn } from '@/lib/utils'

const LinkWidget = ({ widget, selectSection, editWidget, layout, props }: LinkWidgetInterface) => {
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
                {widget.data?.value || <PlaceholdersWidgets type='link' />}
            </div>
            {
                selectSection &&
                <ToolsWidget
                    deleteFunc={_deleteWidget}
                    editFunc={() => selectSection('linkWidget', 0, widget)}
                    isEditing={isEditing}
                    {...isSmall && { props }}
                />
            }
        </>
    )
}

export default LinkWidget