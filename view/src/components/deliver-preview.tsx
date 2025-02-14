import React, { FC } from 'react'
import { deliverMethodsLabel } from '@/constants'
import { Doc } from '../../convex/_generated/dataModel'

const DeliverMethodsWidget: FC<{ template: Doc<"templates"> }> = ({ template }) => {
    const { deliverMethods } = template
    return (
        <>
            {
                deliverMethods.length ?
                    <div className='w-[90%] flex flex-col space-y-1 border p-4 rounded-sm shadow-md'>
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
                                            className={`flex justify-between items-center border-t-[1px] py-1`}>
                                            <span className='mr-1'>{deliverMethod && <deliverMethod.icon />}</span>
                                            <span className='mr-2'>{dm.label}</span>
                                            <span className='w-[60%] ml-auto text-right mr-1 overflow-hidden text-ellipsis'>{dm.comments}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> : <></>
            }
        </>
    )
}

export default DeliverMethodsWidget