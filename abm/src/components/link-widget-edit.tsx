import React, { ChangeEvent } from 'react'
import { Input } from './ui/input'
import { useDataStore } from '@/providers/data-store-providers'
import { resizableItem, Widget, WidgetData } from '@/stores/data-store'
import { Textarea } from './ui/textarea'
import { cn } from '@/lib/utils'
import { IColor, useColor } from 'react-color-palette'
import PopoverChangeTextColor from './popover-change-text-color'

const LinkWidgetEdit = ({ widget, handleNestedWidgetChanges, panel, className }: { widget: Widget, handleNestedWidgetChanges?: (data: WidgetData) => void, panel?: resizableItem, className?: string }) => {
    const widgetTextColor = widget.data?.textColor
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)
    const [color, setColor] = useColor(widgetTextColor || "#000000")

    const changeColor = (color: IColor) => {
        setColor(color)
        handleNestedWidgetChanges ?
            handleNestedWidgetChanges({ textColor: color.hex }) :
            handleWidgetChanges(widget, { textColor: color.hex })
    }

    const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        handleNestedWidgetChanges ?
            handleNestedWidgetChanges({ value: e.target.value }) :
            handleWidgetChanges(widget!, { value: e.target.value })
    }

    const handleChangeLink = (e: ChangeEvent<HTMLInputElement>) => {
        handleNestedWidgetChanges ?
            handleNestedWidgetChanges({ url: e.target.value }) :
            handleWidgetChanges(widget, { url: e.target.value })
    }

    return (
        <div className={cn('flex flex-col gap-4 p-4', className)}>
            <div className='flex flex-col gap-2 relative'>
                <div className='flex w-full justify-between'>
                    <span className='text-center'>
                        Titulo
                    </span>
                    <PopoverChangeTextColor color={color} changeColor={changeColor} />
                </div>
                <Textarea
                    rows={10}
                    maxLength={100}
                    style={{ color: widgetTextColor || color.hex }}
                    className='min-h-[100px] max-h-[100px] text-center resize-none'
                    name='linkWidget'
                    value={panel?.value || widget?.data?.value}
                    onChange={handleChangeText}
                />
                <span className='absolute right-1 bottom-1 text-xs text-slate-950'>{panel?.value?.length || widget.data?.value?.length || 0}/100</span>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='text-center'>
                    Link
                </span>
                <Input
                    className='h-6'
                    placeholder='URL'
                    name='url'
                    value={panel?.url || widget?.data?.url || ''}
                    onChange={handleChangeLink}
                />
            </div>
        </div>
    )
}

export default LinkWidgetEdit