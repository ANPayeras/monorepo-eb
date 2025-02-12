import React from 'react'
import EmptyInfo from '../empty-info'
import { useDataStore } from '@/providers/data-store-providers'
import Image from 'next/image'
import PaymentMethodsPreview from '../payment-methods-preview'
import DeliverPreview from '../deliver-preview'
import ContactInfo from '../contact-info'
import { combosArr } from '@/constants'
import { SelectSection } from '@/interfaces'

const ClassicLayout = ({ selectSection, editSection }: { selectSection: (type: string, combo?: number) => void, editSection: SelectSection }) => {
    const { layout, header, combos, paymentMethods, contact, deliverMethods } = useDataStore(state => state)
    const isheaderImg = header.imgUrl?.localImg || header.imgUrl.uploadImgUrl
    return (
        <div className="w-[90%] flex flex-col gap-10 items-center">
            <div
                className='w-full min-h-20 max-h-20 flex justify-center items-center rounded-lg relative cursor-pointer overflow-hidden'
                onClick={() => selectSection('menu')}>
                {
                    header.title || isheaderImg ?
                        <div className="h-full w-full relative bg-gray-900">
                            {
                                header.imgUrl ?
                                    <Image
                                        alt="image"
                                        className="h-full w-full object-cover scale-[2]"
                                        width="1000"
                                        height="1000"
                                        src={isheaderImg}
                                        priority
                                    /> : <></>
                            }
                            <p className="font-bold text-xl absolute bottom-4 left-4 z-40">{header.title}</p>
                        </div> : <EmptyInfo />
                }
            </div>
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
            <div className='group relative w-full'>
                <PaymentMethodsPreview {...{ selectSection, editSection, paymentMethods }} />
            </div>
            <div className='group relative w-full'>
                <DeliverPreview {...{ selectSection, editSection, deliverMethods }} />
            </div>
            <div className='group relative w-full'>
                <ContactInfo {...{ selectSection, editSection, contact, layout }} />
            </div>
        </div>
    )
}

export default ClassicLayout