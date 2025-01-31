import React, { FC } from 'react'
import { IconPointFilled } from '@tabler/icons-react'
import { PaymentMethods } from '@/stores/data-store'
import { cn } from '@/lib/utils'
import ToolsWidget from './tools-widget'
import { SelectSection } from '@/interfaces'

type PaymentMethodsProps = {
    selectSection?: (type: string) => void;
    paymentMethods: PaymentMethods[];
    containerClassName?: string;
    editSection?: SelectSection;
    props?: any;
}

const PaymentMethodsPreview: FC<PaymentMethodsProps> = ({ selectSection, editSection, paymentMethods, containerClassName, props }) => {
    return (
        <>
            <div className={cn('w-full flex flex-col space-y-1 border p-2 rounded-sm border-slate-900', containerClassName)} {...props}>
                <div className='flex justify-between items-center gap-4'>
                    <span>Metodos de Pago</span>
                </div>
                <div className='flex flex-col'>
                    {
                        paymentMethods.map((pm, i) => (
                            <div
                                key={i}
                                className={`flex justify-between items-center ${!pm.active && 'opacity-50'} border-t-[1px] py-1`}
                            >
                                <span>{pm.label}</span>
                                <span className='w-[60%] ml-auto overflow-hidden text-ellipsis text-right mr-1'>{pm.comments}</span>
                                {
                                    selectSection ?
                                        <span><IconPointFilled size={18} className={`${!pm.active ? 'text-red-500' : 'text-green-500'}`} /></span> :
                                        <></>
                                }
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
        </>
    )
}

export default PaymentMethodsPreview