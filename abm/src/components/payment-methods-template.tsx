import React from 'react'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { useDataStore } from '@/providers/data-store-providers'
import { paymentMethodsLabel } from '@/constants'

const PaymentMethodsTemplate = () => {
    const { paymentMethods, handleOnChangePM, handleOnChangePMSwitch } = useDataStore(state => state)
    return (
        <div className='flex flex-col gap-4 p-4'>
            <span className='text-center'>
                Habilita o deshabilita metodos de pago:
            </span>
            {
                paymentMethodsLabel.map((pm, i) => {
                    const paymentMethod = paymentMethods.find(_pm => _pm.label === pm)
                    return (
                        <div key={i} className='grid grid-cols-[2.5fr,0.5fr] relative mb-10 sm:mb-0'>
                            <div className='flex flex-col sm:flex-row justify-between'>
                                <span>{pm}</span>
                                <Input
                                    className='h-6 w-full sm:w-1/2 -bottom-8 sm:bottom-0 absolute sm:relative'
                                    placeholder='Descripcion'
                                    name='comments'
                                    value={paymentMethod?.comments || ''}
                                    onChange={(e) => handleOnChangePM(e, pm)}
                                    disabled={!paymentMethod?.active}
                                />
                            </div>
                            <div className='flex justify-end'>
                                <Switch
                                    className='data-[state=checked]:bg-green-400'
                                    name='enabled'
                                    onClick={() => handleOnChangePMSwitch(!!paymentMethod?.active, pm)}
                                    checked={!!paymentMethod?.active}
                                />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PaymentMethodsTemplate