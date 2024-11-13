import React from 'react'
import { Textarea } from './ui/textarea'
import { useDataStore } from '@/providers/data-store-providers'
import { Widget } from '@/stores/data-store'
import ToolsWidget from './tools-widget'

const TextWidget = ({ widget }: { widget: Widget }) => {
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)
    const deleteWidget = useDataStore(state => state.deleteWidget)
    return (
        <div className='flex w-full h-full p-2'>
            <div className='relative flex-1'>
                <Textarea
                    rows={10}
                    maxLength={100}
                    className='min-h-[100px] max-h-[100px] text-center resize-none'
                    name='textWidget'
                    value={widget.data?.value}
                    onChange={(e) => handleWidgetChanges(widget, { value: e.target.value })}
                />
                <span className='absolute right-[5px] bottom-[5px] text-xs text-slate-950'>{widget.data?.value?.length || 0}/100</span>
            </div>
            <ToolsWidget deleteFunc={() => deleteWidget(widget)} />
        </div>
    )
}

export default TextWidget