import React, { FC } from 'react'
import { Doc } from '../../convex/_generated/dataModel'
import WidgetBaseCard from './widget-base-card'

const PaymentMethodsWidget: FC<{ template: Doc<"templates"> }> = ({ template }) => {
    const { paymentMethods, layout } = template
    return (
        <>
            {
                paymentMethods.length ?
                    <WidgetBaseCard>
                        <div
                            className='w-full flex flex-col space-y-1 p-2'
                            style={{ color: layout?.textsColor }}
                        >
                            <div className='flex justify-between items-center gap-4'>
                                <span>Metodos de Pago</span>
                            </div>
                            <div className='flex flex-col'>
                                {
                                    paymentMethods.map((pm, i) => (
                                        <div
                                            key={i}
                                            className={`flex justify-between items-center border-t-[1px] border-slate-700 py-1`}>
                                            <span>{pm.label}</span>
                                            <span className='w-[60%] ml-auto overflow-hidden text-ellipsis text-right mr-1'>{pm.comments}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </WidgetBaseCard>
                    : <></>
            }
        </>
    )
}

export default PaymentMethodsWidget