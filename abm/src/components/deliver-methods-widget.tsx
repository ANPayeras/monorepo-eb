import React, { FC } from 'react'

import { deliverMethodsLabel } from '@/constants'
import { cn } from '@/lib/utils'
import ToolsWidget from './tools-widget'
import { DeliverPreviewProps } from './types'
import { useIsSmall } from '@/hooks/use-media.query'
import { useDataStore } from '@/providers/data-store-providers'
import WidgetBaseCardContainer from './widget-base-card-container'

const DeliverMethodsWidget: FC<DeliverPreviewProps> = ({ selectSection, editSection, deliverMethods, layout, props, widget }) => {
    const { addWidget, widgets } = useDataStore(state => state)
    const isSmall = useIsSmall()

    const editWidget = () => {
        const existWidget = widgets.find(w => w.type === 'dm')
        if (!existWidget) {
            addWidget({
                type: 'dm',
                enabled: false,
                title: 'Medios de entrega',
                widgetHandler: 'unique',
                id: '',
            })
        }
        selectSection && selectSection('deliverMethods')
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
                    <span>Medios de entrega</span>
                </div>
                <div className='flex flex-col'>
                    {
                        deliverMethods.map((dm, i) => {
                            const deliverMethod = deliverMethodsLabel.find(_dm => _dm.label === dm.label)
                            return (
                                <div
                                    key={i}
                                    className={`flex justify-between items-center ${!dm.active && 'opacity-50'} border-t-[1px] border-slate-700 py-1`}
                                >
                                    <span className='mr-1'>{deliverMethod && <deliverMethod.icon />}</span>
                                    <span className='mr-2'>{dm.label}</span>
                                    <span className='w-[60%] ml-auto text-right mr-1 overflow-hidden text-ellipsis'>{dm.comments}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div >
            {
                selectSection &&
                <ToolsWidget
                    editFunc={editWidget}
                    isEditing={editSection?.section === 'deliverMethods'}
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

export default DeliverMethodsWidget