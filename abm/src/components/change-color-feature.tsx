import React, { FC } from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { IconEdit } from '@tabler/icons-react'
import { ColorPicker } from 'react-color-palette'
import { ChangeColorFeatureInterface } from '@/interfaces'
import "react-color-palette/css";

const ChangeColorFeature: FC<ChangeColorFeatureInterface> = ({ title, type, color, onChange }) => {
    const layout = useDataStore(state => state.layout)
    return (
        <div className='flex justify-between items-center h-8'>
            <div className='flex gap-4 text-sm md:text-medium'>
                <span>{title}</span>
                <span
                    className='contrast-[0.2]'
                    style={{ color: layout[type] || color.hex, fontWeight: '700' }}>
                    {layout[type] || color.hex}
                </span>
            </div>
            <Popover>
                <PopoverTrigger>
                    <div className="p-[3px] relative scale-90 md:scale-100">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                        <div className="px-2 py-1 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                            <IconEdit size={16} />
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] h-[154px] p-0 rounded-[10px]'>
                    <ColorPicker height={100} hideAlpha hideInput color={color} onChange={(color) => onChange(color, type)} />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ChangeColorFeature