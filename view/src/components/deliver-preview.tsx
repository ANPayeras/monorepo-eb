import React, { FC } from 'react'

import { deliverMethodsLabel } from '@/constants'
import { Doc } from '../../convex/_generated/dataModel'
import { Widget } from '@/types'
import WidgetBaseCardContainer from './widget-base-card-container'

const DeliverMethodsWidget: FC<{ template: Doc<"templates">, widget: Widget }> = ({ template, widget }) => {
    const { deliverMethods, layout } = template
    const { data } = widget

    return (
        <>
            {
                deliverMethods.length ?
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
                                <span>Medios de entrega</span>
                            </div>
                            <div className='flex flex-col'>
                                {
                                    deliverMethods.map((dm, i) => {
                                        const deliverMethod = deliverMethodsLabel.find(_dm => _dm.label === dm.label)
                                        return (
                                            <div
                                                key={i}
                                                className={`flex justify-between items-center border-t-[1px] border-slate-700 py-1`}>
                                                <span className='mr-1'>{deliverMethod && <deliverMethod.icon />}</span>
                                                <span className='mr-2'>{dm.label}</span>
                                                <span className='w-[60%] ml-auto text-right mr-1 overflow-hidden text-ellipsis'>{dm.comments}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </WidgetBaseCardContainer>
                    : <></>
            }
        </>
    )
}

export default DeliverMethodsWidget