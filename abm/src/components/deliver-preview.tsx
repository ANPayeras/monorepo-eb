import React, { FC } from 'react'
import { IconPointFilled } from '@tabler/icons-react'
import { deliverMethodsLabel } from '@/constants'
import { DeliverMethods } from '@/stores/data-store'
import { cn } from '@/lib/utils'
import ToolsWidget from './tools-widget'
import { SelectSection } from '@/interfaces'

type DeliverPreviewProps = {
    selectSection?: (type: string) => void;
    deliverMethods: DeliverMethods[];
    containerClassName?: string;
    editSection?: SelectSection;
    props?: any
}

const DeliverPreview: FC<DeliverPreviewProps> = ({ selectSection, editSection, deliverMethods, containerClassName, props }) => {
    return (
        <>
            <div 
            className={cn('w-full flex flex-col space-y-1 border p-2 rounded-sm border-slate-900', containerClassName)}
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
                                    className={`flex justify-between items-center ${!dm.active && 'opacity-50'} border-t-[1px] py-1`}
                                >
                                    <span className='mr-1'>{deliverMethod && <deliverMethod.icon />}</span>
                                    <span className='mr-2'>{dm.label}</span>
                                    <span className='w-[60%] ml-auto text-right mr-1 overflow-hidden text-ellipsis'>{dm.comments}</span>
                                    {
                                        selectSection ?
                                            <span><IconPointFilled size={18} className={`${!dm.active ? 'text-red-500' : 'text-green-500'}`} /></span> :
                                            <></>
                                    }
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
        </>
    )
}

export default DeliverPreview