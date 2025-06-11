import React, { FC } from 'react'
import { Layout, PaymentMethods } from '@/stores/data-store'
import { cn } from '@/lib/utils'
import ToolsWidget from './tools-widget'
import { SelectSection } from '@/interfaces'
import WidgetBaseCard from './widget-base-card'

type PaymentMethodsProps = {
    selectSection?: (type: string) => void;
    paymentMethods: PaymentMethods[];
    containerClassName?: string;
    editSection?: SelectSection;
    props?: any;
    layout?: Layout;
}

const PaymentMethodsWidget: FC<PaymentMethodsProps> = ({ selectSection, editSection, paymentMethods, containerClassName, layout, props }) => {
    return (
        <WidgetBaseCard>
            <div
                className={cn(`w-full flex flex-col space-y-1 p-2 rounded-md ${!props ? 'active:bg-inherit' : 'active:bg-slate-400'} touch-none`, containerClassName)}
                style={{ color: layout?.textsColor }}
                {...props}>
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
                selectSection ?
                    <ToolsWidget
                        editFunc={() => selectSection('paymentMethods')}
                        isEditing={editSection?.section === 'paymentMethods'} />
                    : <></>
            }
        </WidgetBaseCard>
    )
}

export default PaymentMethodsWidget