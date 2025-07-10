import React, { useMemo } from 'react'

import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarTrigger,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
} from '../ui/menubar'
import { ColorPicker, IColor, useColor } from 'react-color-palette';
import Icon, { KeyTextIcons } from '../Icon';
import { ResizableItem, WidgetData } from '@/stores/data-store';
import { useDataStore } from '@/providers/data-store-providers';
import { cn } from '@/lib/utils';
import '@/app/globals.css'
import { borders, shadows, textAligns } from '@/constants/designs';
import { Slider } from '../ui/slider';
import { MenuBarProps } from '../types';

const MenuBarEdit = ({ widget, panel, handleNestedWidgetChanges }: MenuBarProps) => {
    const { data } = widget
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)
    const [bgColorFeature, setBgColor] = useColor(data?.container?.bgColor || "#d5c9c9");
    const [textsColorFeature, setTextsColor] = useColor(data?.textColor || "#000000");
    const [borderColorFeature, setBorderColor] = useColor(data?.container?.border?.color || "#000000");

    const handleChangeColor = (color: IColor, type: string) => {
        switch (type) {
            case 'textsColor':
                setTextsColor(color)
                onChangeProps({ textColor: color.hex })
                break;
            case 'bgColor':
                setBgColor(color)
                onChangeProps({ container: { bgColor: color.hex } })
                break;
            case 'borderColor':
                setBorderColor(color)
                onChangeProps({ container: { border: { color: color.hex } } }, true)
                break;
            default:
                break;
        }
    }

    const onChangeProps = (value: Partial<WidgetData>, general?: boolean) => {
        if (general) {
            handleWidgetChanges(widget, value)
            return
        }
        handleNestedWidgetChanges ?
            handleNestedWidgetChanges({ ...(value.container ? { ...value.container } : { ...value }) } as ResizableItem) :
            handleWidgetChanges(widget, value)
    }

    const iconTextAlign = useMemo(() =>
        textAligns.find(i => i.className === data?.textAlign || i.className === panel?.textAlign)?.iconName as KeyTextIcons,
        [data?.textAlign, panel?.textAlign])

    return (
        <Menubar className='border-slate-400 border-[0.5px] drop-shadow-sm overflow-hidden overflow-x-scroll'>
            <MenubarMenu>
                <MenubarTrigger className='cursor-pointer'>
                    Borde
                </MenubarTrigger>
                <MenubarContent className='border-slate-400 border-[0.5px] min-w-fit'>
                    <MenubarSub>
                        <MenubarSubTrigger>Estilo</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarRadioGroup
                                value={data?.container?.border?.type || 'solid'}
                                onValueChange={(v) => onChangeProps({ container: { border: { type: v } } }, true)}
                            >
                                <MenubarRadioItem
                                    className="relative pl-0 flex select-none items-center rounded text-[13px] leading-none text-slate-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted"
                                    value={'none'}
                                    data-indicator='false'
                                >
                                    <div className='flex items-center justify-center w-full text-red-400'>
                                        Quitar borde
                                    </div>
                                </MenubarRadioItem>
                                {borders.map((b) => (
                                    <MenubarRadioItem
                                        className="relative pl-0 flex select-none items-center rounded text-[13px] leading-none text-slate-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted"
                                        key={b.name}
                                        value={b.className}
                                        data-indicator='true'
                                    >
                                        <div className='flex items-center justify-center w-full'>
                                            <div
                                                className={cn('h-10 w-10 box-content relative flex justify-center items-center rounded-full border-transparent border-[5px]')}
                                                style={{
                                                    borderStyle: b.className,
                                                    borderColor: 'black',
                                                }}
                                            >
                                                <span className='absolute w-[38px] h-[38px] bg-slate-50 rounded-full'></span>
                                            </div>
                                        </div>
                                    </MenubarRadioItem>
                                ))}
                            </MenubarRadioGroup>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                        <MenubarSubTrigger>Color</MenubarSubTrigger>
                        <MenubarSubContent>
                            <ColorPicker
                                height={100} hideInput={['hsv', 'rgb']}
                                color={borderColorFeature}
                                onChange={(color) => handleChangeColor(color, 'borderColor')}
                            />
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                        <MenubarSubTrigger>Radio</MenubarSubTrigger>
                        <MenubarSubContent className='flex items-center h-10 gap-2'>
                            <Slider
                                max={200}
                                className='w-20'
                                value={[Number(data?.container?.border?.rounded) || 0]}
                                onValueChange={(v) => onChangeProps({ container: { border: { rounded: `${v[0]}` } } }, true)}
                            />
                            <span>{`${data?.container?.border?.rounded || 0}px`}</span>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                        <MenubarSubTrigger>Espesor</MenubarSubTrigger>
                        <MenubarSubContent className='flex items-center h-10 gap-2'>
                            <Slider
                                max={100}
                                className='w-20'
                                value={[Number(data?.container?.border?.width) || 0]}
                                onValueChange={(v) => onChangeProps({ container: { border: { width: `${v[0]}` } } }, true)}
                            />
                            <span>{`${data?.container?.border?.width || 0}px`}</span>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
            <MenubarSeparator aria-orientation='vertical' className='bg-slate-400 min-w-[0.5px] h-full' />
            <MenubarMenu>
                <MenubarTrigger className='cursor-pointer'>
                    <Icon name='letterAFilled' />
                </MenubarTrigger>
                <MenubarContent className='border-slate-400 border-[0.5px]'>
                    <ColorPicker
                        height={100} hideInput={['hsv', 'rgb']}
                        color={textsColorFeature}
                        onChange={(color) => handleChangeColor(color, 'textsColor')}
                    />
                </MenubarContent>
            </MenubarMenu>
            <MenubarSeparator aria-orientation='vertical' className='bg-slate-400 min-w-[0.5px] h-full' />
            <MenubarMenu>
                <MenubarTrigger className='cursor-pointer'>
                    <Icon name='palletteFilled' />
                </MenubarTrigger>
                <MenubarContent className='border-slate-400 border-[0.5px]'>
                    <ColorPicker
                        height={100}
                        hideInput={['hsv', 'rgb']}
                        color={bgColorFeature}
                        onChange={(color) => handleChangeColor(color, 'bgColor')}
                    />
                </MenubarContent>
            </MenubarMenu>
            <MenubarSeparator aria-orientation='vertical' className='bg-slate-400 min-w-[0.5px] h-full' />
            <MenubarMenu>
                <MenubarTrigger className='cursor-pointer'>
                    <Icon name={iconTextAlign || 'textCenter'} />
                </MenubarTrigger>
                <MenubarContent className='border-slate-400 border-[0.5px] min-w-fit'>
                    {
                        textAligns.map((t, i) => (
                            <MenubarCheckboxItem
                                key={i}
                                className="relative gap-1 pl-0 flex select-none items-center rounded text-[13px] leading-none text-slate-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted"
                                checked={iconTextAlign === t.iconName || !iconTextAlign && t.className === 'center'}
                                onCheckedChange={() => onChangeProps({ textAlign: t.className })}
                            >
                                <Icon name={t.iconName as KeyTextIcons} />
                            </MenubarCheckboxItem>
                        ))
                    }
                </MenubarContent>
            </MenubarMenu>
            <MenubarSeparator aria-orientation='vertical' className='bg-slate-400 min-w-[0.5px] h-full' />
            <MenubarMenu>
                <MenubarTrigger className='cursor-pointer'>
                    <Icon name='iconShadow' />
                </MenubarTrigger>
                <MenubarContent className='border-slate-400 border-[0.5px] min-w-fit'>
                    {
                        shadows.map((s, i) => (
                            <MenubarCheckboxItem
                                key={i}
                                className="relative gap-1 pl-0 flex select-none items-center rounded text-[13px] leading-none text-slate-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted"
                                checked={s.className === data?.container?.shadow || !data?.container?.shadow && s.className === 'shadow-sm'}
                                onCheckedChange={(v) => onChangeProps({ container: { shadow: s.className } }, true)}
                            >
                                {s.name}
                            </MenubarCheckboxItem>
                        ))
                    }
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default MenuBarEdit