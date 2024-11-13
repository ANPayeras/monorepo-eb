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
                Habilita o deshabilita metodos de pago a mostrar:
            </span>
            {
                paymentMethodsLabel.map((pm, i) => {
                    const paymentMethod = paymentMethods.find(_pm => _pm.label === pm)
                    return (
                        <div key={i} className='grid grid-cols-[1fr,1.5fr,0.5fr]'>
                            <span>{pm}</span>
                            <Input
                                className='h-6'
                                placeholder='Descripcion'
                                name='comments'
                                value={paymentMethod?.comments || ''}
                                onChange={(e) => handleOnChangePM(e, pm)}
                                disabled={!paymentMethod?.active}
                            />
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