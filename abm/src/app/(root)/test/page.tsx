"use client"

import React, { useCallback, useRef, useState } from 'react'
import { toPng } from 'html-to-image';
import { ColorPicker, IColor, useColor } from 'react-color-palette';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { checkAsset, cn } from '@/lib/utils';
import { Menubar, MenubarContent, MenubarMenu, MenubarSeparator, MenubarTrigger, MenubarRadioGroup, MenubarRadioItem, MenubarCheckboxItem } from '@/components/ui/menubar';
import Button from '@/components/buttons/button';
import UpdateAssetTool from '@/components/update-img-tool';
import './page.css'
import { useToast } from '@/hooks/use-toast';
import { IconCircleLetterAFilled, IconPaletteFilled, IconPhotoScan, IconShadow } from '@tabler/icons-react';
import "react-color-palette/css";

const Page = () => {
    const node = useRef<HTMLDivElement>(null)
    const { toast } = useToast()
    const [blobUrl, setBlobUrl] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [imgProps, setImgProps] = useState({
        img: '',
        bgColor: '',
        textsColor: '',
        text: '',
        border: '',
        background: '',
        shadowText: false,
        shadowImg: false,
    });

    const { background, border, text, shadowImg, shadowText, img } = imgProps

    const [bgColorFeature, setBgColor] = useColor("#d5c9c9");
    const [textsColorFeature, setTextsColor] = useColor("#000000");

    const handleChangeColor = (color: IColor, type: string) => {
        switch (type) {
            case 'textsColor':
                setTextsColor(color)
                break;
            case 'bgColor':
                setBgColor(color)
                break;
            default:
                break;
        }
        setImgProps((prev) => ({ ...prev, [type]: color.hex }))
    }

    const onSave = useCallback(() => {
        if (node.current === null) {
            return
        }

        const div = document.createElement('div')
        div.innerText = 'Hecho con e-brochure'
        div.className = 'absolute contrast-0 right-1 bottom-0 text-xs'
        node.current.appendChild(div)

        toPng(node.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'colaboracion.png'
                link.href = dataUrl
                link.click()
                node.current!.removeChild(div)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [node])

    const onChangeProps = (type: string, value: string | boolean) => {
        setImgProps((prev) => ({ ...prev, [type]: value }))
    }

    const getLocalUrl = (file: File[]) => {
        if (!file.length) {
            setBlobUrl('')
            return
        }
        try {
            const reader = new FileReader();
            checkAsset(file[0])
            reader.addEventListener("load", async () => {
                setBlobUrl(reader.result as string)
            });
            reader.readAsDataURL(file[0]);
        } catch (error) {
            const err = error as Error
            toast({
                title: "Error al subir",
                description: err.message,
                variant: 'destructive',
                duration: 5000,
            })
        }
    }

    const onAcept = () => {
        if (blobUrl) {
            setImgProps({
                ...imgProps,
                img: blobUrl
            })
            setBlobUrl('')
        }
        setIsSuccess(true)
        let interval = setInterval(() => {
            setIsSuccess(false)
            clearInterval(interval)
        }, 500)
    }

    const deleteImg = () => {
        setImgProps({
            ...imgProps,
            img: ''
        })
    }

    const borders = [
        {
            name: 'Borde 1',
            className: 'border1',
        },
        {
            name: 'Borde 2',
            className: 'border2',
        },
        {
            name: 'Borde 3',
            className: 'border3',
        },
        {
            name: 'Borde 4',
            className: 'border4',
        },
        {
            name: 'Borde 5',
            className: 'border5',
        },
        {
            name: 'Borde 6',
            className: 'border6',
        },
    ]

    const backgrounds = [
        {
            name: 'Fondo 1',
            className: 'background1',
        },
        {
            name: 'Fondo 2',
            className: 'background2',
        }
    ]

    return (
        <section className='size-full max-w-[700px] m-auto flex flex-col gap-5'>
            <div className='flex flex-col gap-2 border-slate-400 border-b-[0.5px] pb-5 text-sm md:text-medium'>
                <Menubar className='border-slate-400 border-[0.5px] drop-shadow-sm overflow-hidden overflow-x-scroll'>
                    <MenubarMenu>
                        <MenubarTrigger
                            disabled={!img}
                            className='min-w-fit data-[disabled]:text-muted-foreground'>
                            Borde
                        </MenubarTrigger>
                        <MenubarContent className='border-slate-400 border-[0.5px]'>
                            <MenubarRadioGroup
                                value={border}
                                onValueChange={(v) => onChangeProps('border', v)}
                            >
                                {borders.map((b) => (
                                    <MenubarRadioItem
                                        className="relative pl-0 flex select-none items-center rounded text-[13px] leading-none text-slate-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted"
                                        key={b.name}
                                        value={b.className}
                                        data-indicator='true'
                                        style={{
                                            backgroundColor: border === b.className ? '#cbd5e1' : ''
                                        }}
                                    >
                                        <div className='flex items-center justify-between w-full'>
                                            {b.name}
                                            <div className={cn('h-10 w-10 box-content relative flex justify-center items-center rounded-full border-transparent border-[5px]', b.className)}>
                                                <span className='absolute w-[38px] h-[38px] bg-slate-50 rounded-full'></span>
                                            </div>
                                        </div>
                                    </MenubarRadioItem>
                                ))}
                                <MenubarRadioItem
                                    className="relative pl-0 flex select-none items-center rounded text-[13px] leading-none text-slate-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted"
                                    value={''}
                                    data-indicator='false'
                                >
                                    <div className='flex items-center justify-between w-full text-red-400'>
                                        Quitar borde
                                    </div>
                                </MenubarRadioItem>
                            </MenubarRadioGroup>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarSeparator aria-orientation='vertical' className='bg-slate-400 min-w-[0.5px] h-full' />
                    <MenubarMenu>
                        <MenubarTrigger
                            disabled={!img}
                            className='min-w-fit data-[disabled]:text-muted-foreground'
                        >Imagen de fondo
                        </MenubarTrigger>
                        <MenubarContent className='border-slate-400 border-[0.5px]'>
                            <MenubarRadioGroup
                                value={background}
                                onValueChange={(v) => onChangeProps('background', v)}
                            >
                                {backgrounds.map((b) => (
                                    <MenubarRadioItem
                                        className="relative pl-0 flex select-none items-center rounded text-[13px] leading-none text-slate-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted"
                                        key={b.name}
                                        value={b.className}
                                        data-indicator='true'
                                        style={{
                                            backgroundColor: background === b.className ? '#cbd5e1' : ''
                                        }}
                                    >
                                        <div className='flex items-center justify-between w-full'>
                                            {b.name}
                                            <div className={cn('w-10 h-10 rounded-sm flex justify-center items-center border border-black', b.className)} />
                                        </div>
                                    </MenubarRadioItem>
                                ))}
                                <MenubarRadioItem
                                    className="relative pl-0 flex select-none items-center rounded text-[13px] leading-none text-slate-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted"
                                    value={''}
                                    data-indicator='false'
                                >
                                    <div className='flex items-center justify-between w-full text-red-400'>
                                        Quitar fondo
                                    </div>
                                </MenubarRadioItem>
                            </MenubarRadioGroup>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarSeparator aria-orientation='vertical' className='bg-slate-400 min-w-[0.5px] h-full' />
                    <MenubarMenu>
                        <MenubarTrigger
                            disabled={!img}
                            className='min-w-fit data-[disabled]:text-muted-foreground'>
                            <IconCircleLetterAFilled
                                style={{ borderColor: textsColorFeature.hex }}
                                className='border-r-2 pr-1 box-content'
                            />
                        </MenubarTrigger>
                        <MenubarContent className='border-slate-400 border-[0.5px]'>
                            <ColorPicker height={100} hideInput={['hsv', 'rgb']} color={textsColorFeature} onChange={(color) => handleChangeColor(color, 'textsColor')} />
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarSeparator aria-orientation='vertical' className='bg-slate-400 min-w-[0.5px] h-full' />
                    <MenubarMenu>
                        <MenubarTrigger
                            disabled={!img}
                            className='min-w-fit data-[disabled]:text-muted-foreground'
                        >
                            <IconPaletteFilled
                                style={{ borderColor: bgColorFeature.hex }}
                                className='border-r-2 pr-1 box-content'
                            />
                        </MenubarTrigger>
                        <MenubarContent className='border-slate-400 border-[0.5px]'>
                            <ColorPicker height={100} hideInput={['hsv', 'rgb']} color={bgColorFeature} onChange={(color) => handleChangeColor(color, 'bgColor')} />
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarSeparator aria-orientation='vertical' className='bg-slate-400 min-w-[0.5px] h-full' />
                    <MenubarMenu>
                        <MenubarTrigger
                            disabled={!img}
                            className='min-w-fit data-[disabled]:text-muted-foreground'
                        >
                            <IconShadow />
                        </MenubarTrigger>
                        <MenubarContent className='border-slate-400 border-[0.5px]'>
                            <MenubarCheckboxItem
                                className="relative gap-1 pl-0 flex select-none items-center rounded text-[13px] leading-none text-slate-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted"
                                checked={shadowText}
                                onCheckedChange={(v) => onChangeProps('shadowText', v)}
                            >
                                Texto
                            </MenubarCheckboxItem>
                            <MenubarCheckboxItem
                                className="relative gap-1 pl-0 flex select-none items-center rounded text-[13px] leading-none text-slate-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted"
                                checked={shadowImg}
                                onCheckedChange={(v) => onChangeProps('shadowImg', v)}
                            >
                                Imagen
                            </MenubarCheckboxItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
                <div className='w-full flex justify-between'>
                    <span>Imagen:</span>
                    <UpdateAssetTool
                        assetRef={''}
                        isAsset={img}
                        isSuccess={isSuccess}
                        deleteAsset={deleteImg}
                        uploadAsset={() => { }}
                        onChangeFiles={getLocalUrl}
                        onAccept={onAcept}
                        dropzoneOptions={{
                            accept: {
                                'image/jpeg': [],
                                'image/png': []
                            },
                            maxFiles: 1,
                            disabled: !!blobUrl
                        }}
                        modalTexts={{
                            description: 'Formato: jpg, jpeg, png / Max: 25 MB / Max: 1'
                        }}
                    />
                </div>
                {
                    img &&
                    <Input
                        className='border-slate-400 border-[0.5px]'
                        onChange={(e) => onChangeProps('text', e.target.value)}
                        placeholder='Texto (opcional)'
                    />
                }
            </div>
            {
                img ?
                    <>
                        <div className='flex justify-center'>
                            <div className='h-fit w-fit rounded-sm border-slate-400 border-[0.5px] shadow-lg p-[5px]'>
                                <div
                                    ref={node}
                                    className='relative h-[300px] w-[300px] flex justify-center items-center'
                                    style={{
                                        backgroundColor: bgColorFeature.hex,
                                    }}
                                >
                                    <svg
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px" y="0px"
                                        width="300px" height="300px"
                                        viewBox="0 0 300 300" enableBackground="new 0 0 300 300"
                                        className='z-10 scale-80'>
                                        <defs>
                                            <path id="criclePath" d=" M 150, 150 m -120, 0 a 120,120 0 0,1 240,0 a 120,120 0 0,1 -240,0 " />
                                        </defs>

                                        {/* <!-- <circle cx="150" cy="150" r="150" fill="#000" /> --> */}
                                        <g>
                                            <use href="#criclePath" fill="none" />
                                            <text fill={textsColorFeature.hex} className={cn(shadowText && 'shadowText')}>
                                                <textPath href="#criclePath">{text}</textPath>
                                            </text>
                                        </g>
                                    </svg>
                                    <div
                                        className={cn('absolute w-full h-full rounded-sm flex justify-center items-center', background)}
                                        style={{
                                            backgroundColor: bgColorFeature.hex
                                        }}
                                    >
                                        <div className={cn('h-40 w-40 box-content relative flex justify-center items-center rounded-full border-transparent border-[5px]', border, shadowImg && 'shadowFilter')}>
                                            <Image
                                                className='absolute rounded-full h-full w-full object-cover z-10'
                                                src={img}
                                                // src="https://images.unsplash.com/photo-1612531822780-ce3193485c08?w=900"
                                                alt="logo"
                                                width={200}
                                                height={200}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center py-2'>
                            <Button onClick={onSave}>Descargar</Button>
                        </div>
                    </> :
                    <div className='h-[300px] w-[300px] mx-auto flex flex-col gap-5 justify-center items-center rounded-sm border-slate-400 border-[0.5px] shadow-lg'>
                        <IconPhotoScan size={80} />
                        <span className='text-center'>
                            Agregá una imagen para comenzar a editar
                        </span>
                    </div>
            }
        </section>
    )
}

export default Page