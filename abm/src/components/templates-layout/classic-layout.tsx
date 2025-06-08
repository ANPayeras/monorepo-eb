import React from 'react'

import EmptyInfo from '../empty-info'
import { useDataStore } from '@/providers/data-store-providers'
import Image from 'next/image'
import PaymentMethodsWidget from '../payment-methods-widget'
import DeliverMethodsWidget from '../deliver-methods-widget'
import ContactInfoWidget from '../contact-info-widget'
import { combosArr } from '@/constants'
import { SelectSection } from '@/interfaces'
import { DirectionAwareHover } from '../ui/direction-aware-hover'

const ClassicLayout = ({ selectSection, editSection }: { selectSection: (type: string, combo?: number) => void, editSection: SelectSection }) => {
    const { layout, header, combos, paymentMethods, contact, deliverMethods } = useDataStore(state => state)
    const isheaderImg = header.imgUrl.uploadImgUrl
    return (
        <div className="w-[90%] flex flex-col gap-4 items-center">
            <button
                className='w-full min-h-20 h-20 flex justify-center items-center rounded-lg relative'
                onClick={() => selectSection('menu')}
            >
                {
                    header.title || isheaderImg ?
                        <DirectionAwareHover imageUrl={isheaderImg}>
                            <p className="font-bold text-xl">{header.title}</p>
                        </DirectionAwareHover> : <EmptyInfo />
                }
            </button>
            <div className='w-full grid grid-cols-2 gap-4'>
                {
                    combosArr.map((_c, i) => (
                        <div
                            key={i}
                            className='flex-1 h-20 flex justify-center items-center rounded-lg relative cursor-pointer overflow-hidden'
                            onClick={() => selectSection('combos', i)}>
                            {
                                combos[i]?.imgUrl?.length > 1 || combos[i]?.title ?
                                    <div className="h-full w-full relative bg-gray-900">
                                        {
                                            combos[i].imgUrl[0].url ?
                                                <Image
                                                    alt="image"
                                                    className="h-full w-full object-cover scale-[2]"
                                                    width="1000"
                                                    height="1000"
                                                    src={combos[i].imgUrl[0].url}
                                                    priority
                                                /> : <></>
                                        }
                                        <p className="font-bold text-xl absolute bottom-4 left-4 z-40">{combos[i].title}</p>
                                    </div> : <EmptyInfo />
                            }
                        </div>
                    ))
                }
            </div>
            <PaymentMethodsWidget {...{ selectSection, editSection, paymentMethods, layout }} />
            <DeliverMethodsWidget {...{ selectSection, editSection, deliverMethods, layout }} />
            <ContactInfoWidget {...{ selectSection, editSection, contact, layout }} />
        </div>
    )
}

export default ClassicLayout