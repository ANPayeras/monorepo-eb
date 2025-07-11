import React from 'react'

import { useDataStore } from '@/providers/data-store-providers'
import { Widget } from '@/stores/data-store'
import { Textarea } from './ui/textarea'
import MenuBarEdit from './build/menu-bar-edit'

const TextWidgetEdit = ({ widget }: { widget: Widget }) => {
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)

    return (
        <div className='flex flex-col gap-2 p-4 relative'>
            <div className='flex flex-col w-full gap-2'>
                <span className='text-center'>
                    Texto
                </span>
                <MenuBarEdit widget={widget} />
            </div>
            <Textarea
                rows={10}
                maxLength={100}
                className='min-h-[100px] max-h-[100px] text-center resize-none'
                name='textWidget'
                value={widget.data?.value}
                onChange={(e) => handleWidgetChanges(widget, { value: e.target.value })}
            />
            <span className='absolute right-5 bottom-5 text-xs text-slate-950'>{widget.data?.value?.length || 0}/100</span>
        </div>
    )
}

export default TextWidgetEdit