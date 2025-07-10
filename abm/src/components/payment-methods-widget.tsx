import React, { FC } from 'react'

import { cn } from '@/lib/utils'
import ToolsWidget from './tools-widget'
import { useIsSmall } from '@/hooks/use-media.query'
import { PaymentMethodsProps } from './types'
import WidgetBaseCardContainer from './widget-base-card-container'
import { useDataStore } from '@/providers/data-store-providers'

const PaymentMethodsWidget: FC<PaymentMethodsProps> = ({ selectSection, editSection, paymentMethods, layout, props, widget }) => {
    const { addWidget, widgets } = useDataStore(state => state)
    const isSmall = useIsSmall()

    const editWidget = () => {
        const existWidget = widgets.find(w => w.type === 'pm')
        if (!existWidget) {
            addWidget({
                type: 'pm',
                enabled: false,
                title: 'Métodos de pago',
                widgetHandler: 'unique',
                id: '',
            })
        }
        selectSection && selectSection('paymentMethods')
    }

    const comp =
        <>
            <div
                className={cn(`w-full min-h-16 flex flex-col space-y-1 p-2 ${!props ? 'sm:active:bg-inherit' : 'sm:active:bg-slate-400'}`)}
                style={{ color: widget?.data?.textColor || layout?.textsColor }}
                {...!isSmall && props}
            >
                <div
                    className='flex items-center'
                    style={{
                        justifyContent: widget?.data?.textAlign || 'center'
                    }}
                >
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
                    editFunc={editWidget}
                    isEditing={editSection?.section === 'paymentMethods'}
                    {...isSmall && { props }}
                />
            }
        </>

    if (layout.templateLayout === 'classic') {
        return (
            <WidgetBaseCardContainer widget={widget}>
                {comp}
            </WidgetBaseCardContainer>
        )
    } else {
        return comp
    }
}

export default PaymentMethodsWidget