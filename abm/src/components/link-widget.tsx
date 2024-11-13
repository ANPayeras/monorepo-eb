import React from 'react'
import { Widget } from '@/stores/data-store'
import { useDataStore } from '@/providers/data-store-providers'
import ToolsWidget from './tools-widget'
import { Textarea } from './ui/textarea'

const LinkWidget = ({ widget, selectSection, editWidget }: { widget: Widget, editWidget: Widget, selectSection: (type: string, combo: number, widget: Widget | {}) => void; }) => {
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)
    const deleteWidget = useDataStore(state => state.deleteWidget)
    const isEditing = widget.id === editWidget.id
    const _deleteWidget = () => {
        selectSection('', 0, {})
        deleteWidget(widget)
    }
    return (
        <div className='flex w-full h-full p-2 relative'>
            <div className='relative flex-1'>
                <Textarea
                    rows={10}
                    maxLength={100}
                    className='min-h-[100px] max-h-[100px] text-center resize-none'
                    name='linkWidget'
                    value={widget.data?.value}
                    onChange={(e) => handleWidgetChanges(widget, { value: e.target.value })}
                />
                <span className='absolute right-[5px] bottom-[5px] text-xs text-slate-950'>{widget.data?.value?.length || 0}/100</span>
            </div>
            <ToolsWidget deleteFunc={_deleteWidget} editFunc={() => selectSection('linkWidget', 0, widget)} isEditing={isEditing} />
        </div>
    )
}

export default LinkWidget