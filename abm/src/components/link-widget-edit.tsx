import React, { ChangeEvent, useMemo } from 'react'

import { Input } from './ui/input'
import { useDataStore } from '@/providers/data-store-providers'
import { ResizableItem } from '@/stores/data-store'
import { Textarea } from './ui/textarea'
import { cn } from '@/lib/utils'
import MenuBarEdit from './build/menu-bar-edit'
import { LinkWidgetEditProps } from './types'

const LinkWidgetEdit = ({ widget, handleNestedWidgetChanges, panel, className }: LinkWidgetEditProps) => {
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)

    const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        handleNestedWidgetChanges ?
            handleNestedWidgetChanges({ value: e.target.value } as ResizableItem) :
            handleWidgetChanges(widget!, { value: e.target.value })
    }

    const handleChangeLink = (e: ChangeEvent<HTMLInputElement>) => {
        handleNestedWidgetChanges ?
            handleNestedWidgetChanges({ url: e.target.value } as ResizableItem) :
            handleWidgetChanges(widget, { url: e.target.value })
    }

    const isUrlDisabled = useMemo(() => {
        switch (widget.type) {
            case 'link':
                return !widget?.data?.value
            case 'resizable':
                return !panel?.value && (!panel?.img?.storageId || !panel?.img?.storageId)
        }
    }, [widget.type, widget?.data?.value, panel?.value, panel?.img])

    const text = panel?.value || widget?.data?.value

    const maxTextLength = panel?.value?.length || widget.data?.value?.length || 0

    const url = panel?.url || widget?.data?.url || ''

    return (
        <div className={cn('flex flex-col gap-4 p-4', className)}>
            <div className='flex flex-col gap-2 relative'>
                <div className='flex flex-col w-full gap-2'>
                    <span className='text-center'>
                        {widget.type === 'link' ? 'Link' : ''}
                    </span>
                    <MenuBarEdit widget={widget} panel={panel} handleNestedWidgetChanges={handleNestedWidgetChanges} />
                </div>
                <Textarea
                    rows={10}
                    maxLength={100}
                    className='min-h-[100px] max-h-[100px] text-center resize-none'
                    name='linkWidget'
                    value={text}
                    onChange={handleChangeText}
                />
                <span className='absolute right-1 bottom-1 text-xs text-slate-950'>{maxTextLength}/100</span>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='text-center'>
                    Url
                </span>
                <Input
                    className='h-6'
                    placeholder='URL...'
                    name='url'
                    value={url}
                    disabled={isUrlDisabled}
                    onChange={handleChangeLink}
                />
            </div>
        </div>
    )
}

export default LinkWidgetEdit