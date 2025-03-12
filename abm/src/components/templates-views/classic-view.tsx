import React, { Fragment } from 'react'
import { Doc } from '../../../convex/_generated/dataModel'
import Image from 'next/image'
import PaymentMethodsWidget from '../payment-methods-widget'
import DeliverMethodsWidget from '../deliver-methods-widget'
import ContactInfoWidget from '../contact-info-widget'

const ClassicView = ({ template: { layout, header, combos, paymentMethods, contact, deliverMethods } }: { template: Doc<"templates"> }) => {
    const isheaderImg = header.imgUrl?.localImg || header.imgUrl.uploadImgUrl
    return (
        <div className="w-[90%] flex flex-col gap-4 items-center overflow-y-visible">
            {
                header.title || isheaderImg ?
                    <div className='w-full min-h-20 max-h-20 flex justify-center items-center rounded-lg relative overflow-hidden'>
                        <div className="h-full w-full relative bg-gray-900">
                            {
                                isheaderImg ?
                                    <Image
                                        alt="image"
                                        className="h-full w-full object-cover scale-[2]"
                                        width="1000"
                                        height="1000"
                                        src={isheaderImg}
                                        priority
                                    /> : <></>
                            }
                            <p className="font-bold text-xl text-white absolute bottom-4 left-4 z-40">{header.title}</p>
                        </div>
                    </div> : <></>
            }
            <div className='w-full grid grid-cols-[repeat(auto-fit,_minmax(100px,_0.5fr))] md:grid-cols-[repeat(auto-fit,_minmax(150px,_0.5fr))] justify-center gap-4'>
                {
                    combos.map((c, i) => (
                        c.imgUrl[0].url ?
                            <div
                                key={i}
                                className='flex-1 h-20 flex justify-center items-center rounded-lg relative overflow-hidden'>
                                <div className="h-full w-full relative bg-gray-900">
                                    {
                                        c.imgUrl[0].url ?
                                            <Image
                                                alt="image"
                                                className="h-full w-full object-cover scale-[2]"
                                                width="1000"
                                                height="1000"
                                                src={c.imgUrl[0].url}
                                                priority
                                            /> : <></>
                                    }
                                    <p className="font-bold text-xl text-white absolute bottom-4 left-4 z-40">{c.title}</p>
                                </div>
                            </div> : <Fragment key={i}></Fragment>
                    ))
                }
            </div>
            {
                paymentMethods.length ? <PaymentMethodsWidget {...{ paymentMethods, layout }} /> : <></>
            }
            {
                deliverMethods.length ? <DeliverMethodsWidget {...{ deliverMethods, layout }} /> : <></>
            }
            {
                contact.length ? <ContactInfoWidget contact={contact} layout={layout} /> : <></>
            }
        </div>
    )
}

export default ClassicView