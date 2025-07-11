import React, { Fragment, useMemo } from 'react'

import PaymentMethodsWidget from '../payment-methods-preview'
import DeliverMethodsWidget from '../deliver-preview'
import ContactInfoWidget from '../contact-info'
import CartWidget from '../cart-widget'
import Link from 'next/link'
import { BlurImage } from '../blur-image'
import useSentEvent from '@/hooks/use-sent-events'
import { IconPhotoScan } from '@tabler/icons-react'
import { ClassicViewProps } from '@/types'
import { DirectionAwareHover } from '../ui/direction-aware-hover'

const ClassicView = ({ template }: ClassicViewProps) => {
    const { sentEvent } = useSentEvent()
    const { header, combos, paymentMethods, contact, deliverMethods, name, widgets } = template
    const contactWidget = useMemo(() => widgets.find(w => w.type === 'socials'), [widgets.length])
    const pmWidget = useMemo(() => widgets.find(w => w.type === 'pm'), [widgets.length])
    const dmWidget = useMemo(() => widgets.find(w => w.type === 'dm'), [widgets.length])

    return (
        <>
            {
                header.imgUrl.uploadImgUrl &&
                <div className='w-full min-h-20 h-20 flex justify-center items-center relative overflow-hidden rounded-lg'>
                    <Link
                        onClick={() => sentEvent('widget_click', {
                            type: 'header',
                            imgUrl: header.imgUrl.uploadImgUrl || '',
                            title: header.title
                        })}
                        className='h-full w-full relative bg-gray-900 rounded-lg'
                        href={`${name}/all`}
                    >
                        <DirectionAwareHover imageUrl={header.imgUrl.uploadImgUrl}>
                            <p className="font-bold text-xl">{header.title}</p>
                        </DirectionAwareHover>
                    </Link>
                </div>
            }
            <div className='w-full grid grid-cols-[repeat(auto-fit,_minmax(100%,_0.5fr))] mobile:grid-cols-[repeat(auto-fit,_minmax(150px,_0.5fr))] md:grid-cols-[repeat(auto-fit,_minmax(200px,_0.5fr))] justify-center gap-4'>
                {
                    combos.map((c, i) => (
                        c.imgUrl[0].url ?
                            <div
                                key={i}
                                className='flex-1 h-20 flex justify-center items-center rounded-lg relative overflow-hidden border-slate-700 border'>
                                <Link
                                    onClick={() => sentEvent('widget_click', {
                                        type: 'combo',
                                        imgUrl: c.imgUrl[0].url || '',
                                        title: c.title,
                                        comboNumber: c.id,
                                    })}
                                    className='h-full w-full relative bg-gray-900'
                                    href={`${name}/combo?combo=${c.id.split('combo ')[1]}`}
                                >
                                    {
                                        c.imgUrl[0].url ?
                                            <BlurImage
                                                alt='combos-img'
                                                width='100'
                                                height='100'
                                                className='h-full w-full object-cover hover:scale-110 transition-all'
                                                src={c.imgUrl[0].url}
                                            /> :
                                            <div className='w-full h-full flex items-center justify-center'>
                                                <IconPhotoScan size={40} className='text-slate-200' />
                                            </div>
                                    }
                                    <p className="font-bold text-xl absolute bottom-4 left-4 z-40">{c.title}</p>
                                </Link>
                            </div> : <Fragment key={i}></Fragment>
                    ))
                }
            </div>
            <CartWidget {...{ user: template.name || '' }} />
            {
                paymentMethods.length ? <PaymentMethodsWidget {...{ template, widget: pmWidget! }} /> : <></>
            }
            {
                deliverMethods.length ? <DeliverMethodsWidget {...{ template, widget: dmWidget! }} /> : <></>
            }
            {
                contact.length ? <ContactInfoWidget {...{ template, widget: contactWidget! }} /> : <></>
            }
        </>
    )
}

export default ClassicView