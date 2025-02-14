import React from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import ToolsWidget from './tools-widget'
import { LinkWidgetInterface } from '@/interfaces'
import WidgetBaseCard from './widget-base-card'

const LinkWidget = ({ widget, selectSection, editWidget, layout, props }: LinkWidgetInterface) => {
    const deleteWidget = useDataStore(state => state.deleteWidget)
    const isEditing = widget.id === editWidget?.id
    const _deleteWidget = () => {
        selectSection('', 0, {})
        deleteWidget(widget)
    }
    return (
        <WidgetBaseCard>
            <div className='flex w-full h-full p-2 relative flex-1 active:bg-slate-400' {...props}>
                <div
                    className='w-full min-h-[100px] max-h-[100px] text-center overflow-hidden break-words'
                    style={{ color: widget.data?.textColor || layout?.textsColor }}
                >
                    {widget.data?.value}
                </div>
            </div>
            <ToolsWidget deleteFunc={_deleteWidget} editFunc={() => selectSection('linkWidget', 0, widget)} isEditing={isEditing} />
        </WidgetBaseCard>
    )
}

export default LinkWidget