import React from 'react'
import { Input } from './ui/input'
import { useDataStore } from '@/providers/data-store-providers'
import { Widget } from '@/stores/data-store'

const LinkWidgetEdit = ({ widget }: { widget: Widget }) => {
    const widgets = useDataStore(state => state.widgets)
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)
    const _widget = widgets.find(w => w.id === widget.id)
    return (
        <div className='flex flex-col gap-4 p-4'>
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
    )
}

export default LinkWidgetEdit