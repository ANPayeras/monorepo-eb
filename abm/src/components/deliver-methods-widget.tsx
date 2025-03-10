import React, { FC } from 'react'
import { deliverMethodsLabel } from '@/constants'
import { DeliverMethods, Layout } from '@/stores/data-store'
import { cn } from '@/lib/utils'
import ToolsWidget from './tools-widget'
import { SelectSection } from '@/interfaces'
import WidgetBaseCard from './widget-base-card'

type DeliverPreviewProps = {
    selectSection?: (type: string) => void;
    deliverMethods: DeliverMethods[];
    containerClassName?: string;
    editSection?: SelectSection;
    props?: any
    layout?: Layout;
}

const DeliverMethodsWidget: FC<DeliverPreviewProps> = ({ selectSection, editSection, deliverMethods, containerClassName, layout, props }) => {
    return (
        <WidgetBaseCard>
            <div
                className={cn(`w-full flex flex-col space-y-1 p-2 rounded-md ${!props ? 'active:bg-inherit' : 'active:bg-slate-400'} touch-none`, containerClassName)}
                style={{ color: layout?.textsColor }}
                {...props}>
                <div className='flex justify-between items-center gap-4'>
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
                selectSection ?
                    <ToolsWidget
                        editFunc={() => selectSection('deliverMethods')}
                        isEditing={editSection?.section === 'deliverMethods'} />
                    : <></>
            }
        </WidgetBaseCard>
    )
}

export default DeliverMethodsWidget