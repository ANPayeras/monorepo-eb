import React from 'react'

import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { useDataStore } from '@/providers/data-store-providers'
import { icons } from '@/constants'
import MenuBarEdit from './build/menu-bar-edit'

const ContactWidgetEdit = () => {
    const { contact, widgets, handleOnChangeContact, handleOnChangeContactSwitch } = useDataStore(state => state)
    const widget = widgets.find(w => w.type === 'socials')!

    return (
        <div className='flex flex-col gap-4 p-4'>
            <div className='flex flex-col w-full gap-2'>
                <span className='text-center'>
                    Redes sociales
                </span>
                <MenuBarEdit widget={widget} />
            </div>
            {
                icons.map((ic, i) => {
                    const socialMedia = contact.find(c => c.title === ic.name)
                    return (
                        <div key={i} className='flex justify-between items-center gap-4'>
                            <ic.icon size={30} className='hover:scale-110 transition-all' />
                            <Input
                                className='h-6'
                                placeholder={ic.name === 'mail' ? 'Mail' : 'Url'}
                                name='url'
                                value={socialMedia?.url || ''}
                                onChange={(e) => handleOnChangeContact(e, ic.name)}
                                disabled={!socialMedia?.enabled}
                            />
                            <Switch
                                className='data-[state=checked]:bg-green-400'
                                name='enabled'
                                onClick={() => handleOnChangeContactSwitch(!!socialMedia?.enabled, ic.name)}
                                checked={!!socialMedia?.enabled}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ContactWidgetEdit