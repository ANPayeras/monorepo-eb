import React, { FC } from 'react'
import { Doc } from '../../convex/_generated/dataModel'

const PaymentMethodsPreview: FC<{ template: Doc<"templates"> }> = ({ template }) => {
    const { paymentMethods } = template
    return (
        <>
            {
                paymentMethods.length ?
                    <div className='w-[90%] flex flex-col space-y-1 border p-4 rounded-sm shadow-md'>
                        <div className='flex justify-between items-center gap-4'>
                            <span>Metodos de Pago</span>
                        </div>
                        <div className='flex flex-col'>
                            {
                                paymentMethods.map((pm, i) => (
                                    <div
                                        key={i}
                                        className={`flex justify-between items-center border-t-[1px] py-1`}>
                                        <span>{pm.label}</span>
                                        <span className='w-[60%] ml-auto overflow-hidden text-ellipsis text-right mr-1'>{pm.comments}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div> : <></>
            }
        </>
    )
}

export default PaymentMethodsPreview