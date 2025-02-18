import React from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import ToolsWidget from './tools-widget'
import { TextWidgetInterface } from '@/interfaces'
import WidgetBaseCard from './widget-base-card'

const TextWidget = ({ widget, selectSection, editWidget, layout, props }: TextWidgetInterface) => {
    const deleteWidget = useDataStore(state => state.deleteWidget)
    const isEditing = widget.id === editWidget?.id
    const _deleteWidget = () => {
        selectSection('', 0, {})
        deleteWidget(widget)
    }
    return (
        <WidgetBaseCard>
            <div className={`flex w-full h-full p-2 relative flex-1 ${!props ? 'active:bg-inherit' : 'active:bg-slate-400'}`} {...props}>
                <div className='w-full min-h-[100px] max-h-[100px] text-center overflow-hidden break-words'
                    style={{ color: widget.data?.textColor || layout?.textsColor }}
                >
                    {widget.data?.value}
                </div>
            </div>
            {
                selectSection &&
                <ToolsWidget deleteFunc={_deleteWidget} editFunc={() => selectSection('textWidget', 0, widget)} isEditing={isEditing} />
            }
        </WidgetBaseCard>
    )
}

export default TextWidget