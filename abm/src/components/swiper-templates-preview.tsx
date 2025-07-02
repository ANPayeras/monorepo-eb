import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css/effect-cards';
import 'swiper/css';
import { estaticTemplates } from '@/constants';
import SectionsPreview from './sections-preview';
import { IconBrandWhatsapp, IconPhonePlus } from '@tabler/icons-react';
import LoaderSpinner from './loader-spinner';
import Link from 'next/link';
import CopyLink from './copy-link';
import BgVideoPlayer from './bg-video';
import { amountToCurrency } from '@/lib/utils';
import { SwiperTemplatesPreviewProps } from '@/interfaces';

const SwiperTemplatesPreview: FC<SwiperTemplatesPreviewProps> = ({ swiperRef, userData, layout, editSection, layoutTemplate, cart }) => {

    const [visibility, setVisibility] = useState<CSSProperties['visibility']>('visible')

    const handleSendOrder = (type: string) => {
        let orderString = ''
        cart.forEach((it) => {
            orderString += `${it.title} - x${it.quantity} ${amountToCurrency(Number(it.price))}\n`
        })
        orderString += `\nTotal: ${amountToCurrency(cart.reduce((acc, curV) => acc + (Number(curV.price) * curV.quantity), 0))}`

        if (type === 'copy') navigator.clipboard.writeText(orderString)
        if (type === 'whatsapp') window.open(`https://wa.me/${userData?.phone}?text=${encodeURIComponent(orderString)}`)
    }

    const isVideo = useMemo(() => {
        return layout.backgroundVideo?.localVideo || layout.backgroundVideo?.uploadVideoUrl
    }, [layout.backgroundVideo?.localVideo, layout.backgroundVideo?.uploadVideoUrl])

    const style = {
        display: 'flex',
        color: layout.textsColor,
        backgroundColor: !isVideo ? layout.bgColor : '',
        backgroundImage: !isVideo ? `url(${layout.backgroundImg.uploadImgUrl})` : '',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
    }

    const renderLayout = () => {
        return (
            <>
                {
                    (!editSection.section || estaticTemplates.includes(editSection.section)) &&
                    <>
                        <div>{userData.username}</div>
                        {layoutTemplate}
                    </>
                }
                <SectionsPreview section={editSection.section} combo={editSection.combo} />
            </>
        )
    }

    const onSwiperChange = useCallback((swiperEvent: SwiperType) => {
        if (swiperEvent.activeIndex === 0) setVisibility('visible')
        if (swiperEvent.activeIndex === 1) setVisibility('hidden')
    }, [])

    useEffect(() => {
        swiperRef.current?.on('slideChange', onSwiperChange)
    }, [swiperRef, onSwiperChange])

    if (layout.templateLayout === 'empty') {
        return (
            <div className='relative w-full h-full overflow-hidden shadow-lg'>
                {
                    isVideo && <BgVideoPlayer src={isVideo} />
                }
                <div
                    className='absolute w-full flex-col h-full gap-10 py-10 items-center overflow-y-auto rounded-sm border border-slate-400'
                    style={{ ...style }}
                >
                    {renderLayout()}
                </div>
            </div>
        )
    } else {
        return (
            <div className='relative w-full h-full overflow-hidden shadow-lg'>
                {
                    isVideo && <BgVideoPlayer src={isVideo} />
                }
                <Swiper
                    effect={'creative'}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: [0, 0, -400],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                    allowTouchMove={false}
                    modules={[EffectCreative]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className='w-full h-full'
                >
                    <SwiperSlide
                        className='flex-col gap-10 py-10 items-center overflow-y-auto rounded-sm border border-slate-400'
                        style={{
                            ...style,
                            visibility,
                        }}
                    >
                        {renderLayout()}
                    </SwiperSlide>
                    <SwiperSlide
                        className='justify-center p-4 py-10 rounded-sm border border-slate-400 overflow-y-auto'
                        style={{ ...style }}>
                        <div className='flex flex-col justify-start items-center w-full gap-4'>
                            <div className='w-full h-10 border-b-2 flex items-center justify-end'>
                                <span>Detalle del pedido:</span>
                            </div>
                            <div className='w-full grid grid-cols-[1.5fr,0.5fr,0.5fr,0.5fr]'>
                                <div></div>
                                <div className='flex border-b-1'>P/U</div>
                                <div className='flex border-b-1'>Cant.</div>
                                <div className='flex border-b-1'>Total</div>
                            </div>
                            <div className='w-full max-h-[400px] overflow-y-scroll'>
                                {
                                    cart.map((it, i) => (
                                        <div key={i} className='grid grid-cols-[1.5fr,0.5fr,0.5fr,0.5fr] border-b-[1px]'>
                                            <span className='text-ellipsis overflow-hidden'>
                                                {it.title}
                                            </span>
                                            <span className='text-ellipsis overflow-hidden'>
                                                {amountToCurrency(Number(it.price))}
                                            </span>
                                            <span className='text-ellipsis overflow-hidden'>
                                                {it.quantity}
                                            </span>
                                            <span className='text-ellipsis overflow-hidden'>
                                                {amountToCurrency(Number(it.price) * it.quantity)}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex items-center justify-between w-full border-b-2'>
                                <span>Total:</span>
                                <span>
                                    {amountToCurrency(cart.reduce((acc, curV) => acc + (Number(curV.price) * curV.quantity), 0))}
                                </span>
                            </div>
                            <div className='flex flex-col  gap-4 w-full'>
                                <div className='flex w-full justify-between'>
                                    {
                                        !userData ?
                                            <div className='w-full flex justify-center'>
                                                <LoaderSpinner size='sm' />
                                            </div> :
                                            <div className='flex justify-between w-full'>
                                                {
                                                    !userData.phone ?
                                                        <>
                                                            <span className='text-sm md:text-medium'>Agregá un número para recibir el detalle por WhatsApp:</span>
                                                            <Link href={'/profile'} className='flex items-center'>
                                                                <IconPhonePlus size={18} className='cursor-pointer transition-all hover:scale-105' />
                                                            </Link>
                                                        </> : <>
                                                            <span className='text-sm md:text-medium'>Enviar el pedido por WhatsApp:</span>
                                                            <button onClick={() => handleSendOrder('whatsapp')}>
                                                                <IconBrandWhatsapp size={18} className='cursor-pointer transition-all hover:scale-105' />
                                                            </button>
                                                        </>
                                                }
                                            </div>
                                    }
                                </div>
                                <div className='flex w-full justify-between'>
                                    <span className='text-sm md:text-medium'>Copiar el pedido:</span>
                                    <CopyLink iconSize={18} onClick={() => handleSendOrder('copy')} />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        )
    }
}

export default SwiperTemplatesPreview