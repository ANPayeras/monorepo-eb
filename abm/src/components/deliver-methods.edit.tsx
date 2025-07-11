import React from 'react'

import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { useDataStore } from '@/providers/data-store-providers'
import { deliverMethodsLabel } from '@/constants'
import MenuBarEdit from './build/menu-bar-edit'

const DeliverMethodsEdit = () => {
    const { deliverMethods, widgets, handleOnChangeDM, handleOnChangeDMSwitch } = useDataStore(state => state)
    const widget = widgets.find(w => w.type === 'dm')!

    return (
        <div className='flex flex-col gap-4 p-4'>
            <div className='flex flex-col w-full gap-2'>
                <span className='text-center'>
                    Medios de entrega
                </span>
                <MenuBarEdit widget={widget} />
            </div>
            {
                deliverMethodsLabel.map((dm, i) => {
                    const deliverMethod = deliverMethods.find(_pm => _pm.label === dm.label)
                    return (
                        <div key={i} className='grid grid-cols-[2.5fr,0.5fr] relative mb-10 sm:mb-0'>
                            <div className='flex flex-col sm:flex-row justify-between'>
                                <span>{dm.label}</span>
                                <Input
                                    className='h-6 w-full sm:w-1/2 -bottom-8 sm:bottom-0 absolute sm:relative'
                                    placeholder='Descripcion'
                                    name='comments'
                                    value={deliverMethod?.comments || ''}
                                    onChange={(e) => handleOnChangeDM(e, dm.label)}
                                    disabled={!deliverMethod?.active}
                                />
                            </div>
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

export default DeliverMethodsEdit