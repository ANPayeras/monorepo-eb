import React from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import { Widget } from '@/stores/data-store'
import { Textarea } from './ui/textarea'

const TextWidgetEdit = ({ widget }: { widget: Widget }) => {
    const widgets = useDataStore(state => state.widgets)
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)
    const _widget = widgets.find(w => w.id === widget.id)
    return (
        <div className='flex flex-col gap-2 p-4 relative'>
            <span className='text-center'>
                Texto
            </span>
            <Textarea
                rows={10}
                maxLength={100}
                className='min-h-[100px] max-h-[100px] text-center resize-none'
                name='textWidget'
                value={_widget?.data?.value}
                onChange={(e) => handleWidgetChanges(_widget!, { value: e.target.value })}
            />
            <span className='absolute right-5 bottom-5 text-xs text-slate-950'>{widget.data?.value?.length || 0}/100</span>
        </div>
    )
}

export default TextWidgetEdit