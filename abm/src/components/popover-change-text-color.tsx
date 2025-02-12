import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { ColorPicker, IColor } from 'react-color-palette'
import { IconLetterA } from '@tabler/icons-react'
import "react-color-palette/css";

const PopoverChangeTextColor = ({ color, changeColor }: { color: IColor, changeColor: (color: IColor) => void }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <div className='hover:opacity-80 hover:scale-95 transition-all'>
                    <IconLetterA color={color.hex} />
                </div>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] h-[154px] p-0 rounded-[10px]'>
                <ColorPicker height={100} hideAlpha hideInput color={color} onChange={changeColor} />
            </PopoverContent>
        </Popover>
    )
}

export default PopoverChangeTextColor