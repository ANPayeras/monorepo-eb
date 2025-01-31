import React from 'react'
import { Input } from './ui/input'
import { useDataStore } from '@/providers/data-store-providers'
import { Widget } from '@/stores/data-store'
import { Textarea } from './ui/textarea'

const LinkWidgetEdit = ({ widget }: { widget: Widget }) => {
    const widgets = useDataStore(state => state.widgets)
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)
    const _widget = widgets.find(w => w.id === widget.id)
    return (
        <div className='flex flex-col gap-4 p-4'>
            <div className='flex flex-col gap-2 relative'>
                <span className='text-center'>
                    Titulo
                </span>
                <Textarea
                    rows={10}
                    maxLength={100}
                    className='min-h-[100px] max-h-[100px] text-center resize-none'
                    name='linkWidget'
                    value={_widget?.data?.value}
                    onChange={(e) => handleWidgetChanges(_widget!, { value: e.target.value })}
                />
                <span className='absolute right-1 bottom-1 text-xs text-slate-950'>{widget.data?.value?.length || 0}/100</span>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='text-center'>
                    Link
                </span>
                <Input
                    className='h-6'
                    placeholder='URL'
                    name='url'
                    value={_widget?.data?.url || ''}
                    onChange={(e) => handleWidgetChanges(widget, { url: e.target.value })}
                />
            </div>
        </div>
    )
}

export default LinkWidgetEdit