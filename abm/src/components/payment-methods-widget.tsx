import React, { FC } from 'react'

import { cn } from '@/lib/utils'
import ToolsWidget from './tools-widget'
import WidgetBaseCard from './widget-base-card'
import { useIsSmall } from '@/hooks/use-media.query'
import { PaymentMethodsProps } from './types'

const PaymentMethodsWidget: FC<PaymentMethodsProps> = ({ selectSection, editSection, paymentMethods, containerClassName, layout, props }) => {
    const isSmall = useIsSmall()
    return (
        <WidgetBaseCard>
            <div
                className={cn(`w-full min-h-16 flex flex-col space-y-1 p-2 rounded-md ${!props ? 'sm:active:bg-inherit' : 'sm:active:bg-slate-400'} ${isSmall ? '' : 'touch-none'}`, containerClassName)}
                style={{ color: layout?.textsColor }}
                {...!isSmall && props}
            >
                <div className='flex justify-between items-center gap-4'>
                    <span>Métodos de Pago</span>
                </div>
                <div className='flex flex-col'>
                    {
                        paymentMethods.map((pm, i) => (
                            <div
                                key={i}
                                className={`flex justify-between items-center ${!pm.active && 'opacity-50'} border-t-[1px] border-slate-700 py-1`}
                            >
                                <span>{pm.label}</span>
                                <span className='w-[60%] ml-auto overflow-hidden text-ellipsis text-right mr-1'>{pm.comments}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                selectSection &&
                <ToolsWidget
                    editFunc={() => selectSection('paymentMethods')}
                    isEditing={editSection?.section === 'paymentMethods'}
                    {...isSmall && { props }}
                />
            }
        </WidgetBaseCard>
    )
}

export default PaymentMethodsWidget