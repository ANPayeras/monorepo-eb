import React from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import ToolsWidget from './tools-widget'
import { LinkWidgetInterface } from '@/interfaces'

const LinkWidget = ({ widget, selectSection, editWidget, props }: LinkWidgetInterface) => {
    const deleteWidget = useDataStore(state => state.deleteWidget)
    const isEditing = widget.id === editWidget.id
    const _deleteWidget = () => {
        selectSection('', 0, {})
        deleteWidget(widget)
    }
    return (
        <>
            <div className='flex w-full h-full p-2 relative' {...props}>
                <div className='relative flex-1'>
                    <div className='min-h-[100px] max-h-[100px] text-center overflow-hidden break-words'>
                        {widget.data?.value}
                    </div>
                </div>
            </div>
            <ToolsWidget deleteFunc={_deleteWidget} editFunc={() => selectSection('linkWidget', 0, widget)} isEditing={isEditing} />
        </>
    )
}

export default LinkWidget