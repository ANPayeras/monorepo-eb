import React, { FC, MutableRefObject } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css/effect-cards';
import 'swiper/css';
import { estaticTemplates } from '@/constants';
import SectionsPreview from './sections-preview';
import { IconBrandWhatsapp, IconCopy, IconPhonePlus } from '@tabler/icons-react';
import { ItemCart, Layout } from '@/stores/data-store';
import LoaderSpinner from './loader-spinner';
import Link from 'next/link';
import { Doc } from '../../convex/_generated/dataModel';
import CopyLink from './copy-link';

type SwiperTemplatesPreviewProps = {
    swiperRef: MutableRefObject<SwiperType | undefined>;
    userData: Doc<"users">,
    layout: Layout,
    editSection: { section: string, combo: number }
    layoutTemplate: JSX.Element,
    cart: ItemCart[]
}

const SwiperTemplatesPreview: FC<SwiperTemplatesPreviewProps> = ({ swiperRef, userData, layout, editSection, layoutTemplate, cart }) => {

    const handleSendOrder = (type: string) => {
        let orderString = ''
        cart.forEach((it) => {
            orderString += `${it.label} - x${it.quantity} $${it.price}\n`
        })
        orderString += `\nTotal: $${cart.reduce((acc, curV) => acc + (curV.price * curV.quantity), 0)}`

        if (type === 'copy') navigator.clipboard.writeText(orderString)
        if (type === 'whatsapp') window.open(`https://web.whatsapp.com/send?phone=${userData?.phone}&text=${encodeURI(orderString)}&app_absent=0`)
    }

    const style = {
        display: 'flex',
        backgroundColor: layout.bgColor,
        color: layout.textsColor,
        backgroundImage: `url(${layout.backgroundImg?.localImg || layout.backgroundImg.uploadImgUrl})`,
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

    if (layout.templateLayout === 'empty') {
        return (
            <div className='w-full min-h-[80vh] max-h-[80vh] sm:min-h-0 sm:max-h-full h-full overflow-hidden'>
                <div
                    className='flex-col h-full gap-10 py-10 items-center overflow-y-auto rounded-sm border-gray-500 border'
                    style={style}
                >
                    {renderLayout()}
                </div>
            </div>
        )
    } else {
        return (
            <div className='w-full min-h-[80vh] max-h-[80vh] sm:min-h-0 sm:max-h-full h-full overflow-hidden'>
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
                        className='flex-col gap-10 py-10 items-center overflow-y-auto rounded-sm border-gray-500 border'
                        style={style}
                    >
                        {renderLayout()}
                    </SwiperSlide>
                    <SwiperSlide className='flex justify-center p-4 rounded-sm' style={style}>
                        <div className='flex flex-col justify-start items-center w-full gap-4'>
                            <div className='w-full h-10 border-b-2 flex items-center justify-end'>
                                <span>Detalle del pedido:</span>
                            </div>
                            <div className='w-full grid grid-cols-[1.5fr,0.5fr,0.5fr,0.5fr] pr-3'>
                                <div></div>
                                <div className='flex justify-end border-b-1'>P/U</div>
                                <div className='flex justify-end border-b-1'>Cant.</div>
                                <div className='flex justify-end border-b-1'>Total</div>
                            </div>
                            <div className='w-full max-h-[400px] pr-3 overflow-y-scroll'>
                                {
                                    cart.map((it, i) => (
                                        <div key={i} className='grid grid-cols-[1.5fr,0.5fr,0.5fr,0.5fr] border-b-[1px]'>
                                            <span>
                                                {it.label}
                                            </span>
                                            <span className='flex justify-end'>
                                                ${it.price}
                                            </span>
                                            <span className='flex justify-end'>
                                                {it.quantity}
                                            </span>
                                            <span className='flex justify-end'>
                                                ${it.price * it.quantity}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex items-center justify-between w-full border-b-2 pr-3'>
                                <span>Total:</span>
                                <span>
                                    ${cart.reduce((acc, curV) => acc + (curV.price * curV.quantity), 0)}
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
                                                            <span>Agrege un numero para reicibr el detalle por Whatsapp:</span>
                                                            <Link href={'/profile'}>
                                                                <IconPhonePlus className='cursor-pointer transition-all hover:scale-105' />
                                                            </Link>
                                                        </> : <>
                                                            <span>Enviale el detalle al comercio por Whatsapp:</span>
                                                            <button onClick={() => handleSendOrder('whatsapp')}>
                                                                <IconBrandWhatsapp className='cursor-pointer transition-all hover:scale-105' />
                                                            </button>
                                                        </>
                                                }
                                            </div>
                                    }
                                </div>
                                <div className='flex w-full justify-between'>
                                    <span>Copia el detalle y enviaselo al vendedor</span>
                                    <CopyLink iconSize={24} onClick={() => handleSendOrder('copy')} />
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