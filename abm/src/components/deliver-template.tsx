import React from 'react'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { useDataStore } from '@/providers/data-store-providers'
import { deliverMethodsLabel } from '@/constants'

const DeliverMethodsTemplate = () => {
    const { deliverMethods, handleOnChangeDM, handleOnChangeDMSwitch } = useDataStore(state => state)
    return (
        <div className='flex flex-col gap-4 p-4'>
            <span className='text-center'>
                Habilita o deshabilita los metodos de entrega:
            </span>
            {
                deliverMethodsLabel.map((dm, i) => {
                    const deliverMethod = deliverMethods.find(_pm => _pm.label === dm.label)
                    return (
                        <div key={i} className='grid grid-cols-[1fr,1.5fr,0.5fr]'>
                            <span>{dm.label}</span>
                            <Input
                                className='h-6'
                                placeholder='Descripcion'
                                name='comments'
                                value={deliverMethod?.comments || ''}
                                onChange={(e) => handleOnChangeDM(e, dm.label)}
                                disabled={!deliverMethod?.active}
                            />
                            <div className='flex justify-end'>
                                <Switch
                                    className='data-[state=checked]:bg-green-400'
                                    name='enabled'
                                    onClick={() => handleOnChangeDMSwitch(!!deliverMethod?.active, dm.label)}
                                    checked={!!deliverMethod?.active}
                                />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DeliverMethodsTemplate