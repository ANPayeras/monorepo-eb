import React from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import { Widget } from '@/stores/data-store'
import { Textarea } from './ui/textarea'
import PopoverChangeTextColor from './popover-change-text-color'
import { IColor, useColor } from 'react-color-palette'

const TextWidgetEdit = ({ widget }: { widget: Widget }) => {
    const widgetTextColor = widget.data?.textColor
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)
    const [color, setColor] = useColor(widgetTextColor || "#000000")

    const changeColor = (color: IColor) => {
        setColor(color)
        handleWidgetChanges(widget, { textColor: color.hex })
    }

    return (
        <div className='flex flex-col gap-2 p-4 relative'>
            <div className='flex w-full justify-between'>
                <span className='text-center'>
                    Texto
                </span>
                <PopoverChangeTextColor color={color} changeColor={changeColor} />
            </div>
            <Textarea
                rows={10}
                maxLength={100}
                className='min-h-[100px] max-h-[100px] text-center resize-none'
                name='textWidget'
                style={{ color: widgetTextColor || color.hex }}
                value={widget.data?.value}
                onChange={(e) => handleWidgetChanges(widget, { value: e.target.value })}
            />
            <span className='absolute right-5 bottom-5 text-xs text-slate-950'>{widget.data?.value?.length || 0}/100</span>
        </div>
    )
}

export default TextWidgetEdit