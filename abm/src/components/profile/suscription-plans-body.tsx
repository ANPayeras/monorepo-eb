import React, { useCallback } from 'react'

import { Card, CardDescription, CardTitle } from '../ui/card'
import { IconRosetteDiscountCheck } from '@tabler/icons-react'
import { SuscriptionPlansBodyProps } from './types'
import { Doc } from '../../../convex/_generated/dataModel'

const SuscriptionPlansBody = ({ plans, setSelectedPlan, selectedPlan, isAnual, hasFreeTrial }: SuscriptionPlansBodyProps) => {

    const premiunValidation = useCallback((plan: Doc<"plans">) => {
        const { _id } = plan
        return _id === selectedPlan?._id
    }, [selectedPlan?._id])

    return (
        <div className='flex flex-wrap flex-col xs:flex-row justify-center items-center gap-5'>
            {
                plans?.map((p) => (
                    <Card
                        key={p._id}
                        onClick={() => setSelectedPlan(p)}
                        style={{
                            border: premiunValidation(p) ? '1px solid green' : '',
                            transform: premiunValidation(p) ? 'scaleX(1.05) scaleY(1.05)' : '',
                            backgroundColor: premiunValidation(p) ? '#00800050' : ''
                        }}
                        className='relative p-2 cursor-pointer w-[95%] xs:w-[300px] xs:h-[400px] flex flex-col justify-between hover:scale-[1.01] hover:shadow-md hover:shadow-slate-800 transition-all'
                    >
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex justify-between'>
                                    <CardTitle className='text-lg sm:text-2xl'>
                                        {p.title}
                                    </CardTitle>
                                    {
                                        p?.anual?.price && p?.monthly?.price &&
                                        <CardDescription className='absolute text-black top-0 right-0 bg-orange-300 rounded-tr-lg rounded-bl-lg p-1 shadow-lg'>
                                            {
                                                isAnual ? `$${p.anual.price} al año` : `$${p.monthly.price} al mes`
                                            }
                                        </CardDescription>
                                    }
                                </div>
                                {
                                    p.description &&
                                    <CardDescription
                                        style={{
                                            color: premiunValidation(p) ? 'white' : ''
                                        }}
                                        className='transition-all'
                                    >
                                        {
                                            !hasFreeTrial && p.description
                                        }
                                    </CardDescription>
                                }
                            </div>
                            <ul>
                                {
                                    p.features.map((f, i) => (
                                        <li key={i} className='flex gap-1'>
                                            <IconRosetteDiscountCheck className='text-green-500' size={18} />
                                            <span className='text-sm'>{f}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}

export default SuscriptionPlansBody