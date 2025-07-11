import React, { FC } from 'react'

import { Doc } from '../../convex/_generated/dataModel'
import { Widget } from '@/types'
import WidgetBaseCardContainer from './widget-base-card-container'

const PaymentMethodsWidget: FC<{ template: Doc<"templates">, widget: Widget }> = ({ template, widget }) => {
    const { paymentMethods, layout } = template
    const { data } = widget

    return (
        <>
            {
                paymentMethods.length ?
                    <WidgetBaseCardContainer widget={widget}>
                        <div
                            className='w-full flex flex-col space-y-1 p-2'
                            style={{ color: data?.textColor || layout?.textsColor }}
                        >
                            <div
                                className='flex items-center'
                                style={{
                                    justifyContent: data?.textAlign || 'center'
                                }}
                            >
                                <span>Métodos de Pago</span>
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
                    </WidgetBaseCardContainer>
                    : <></>
            }
        </>
    )
}

export default PaymentMethodsWidget