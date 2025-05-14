import React from 'react'
import { Switch } from './ui/switch'
import { IconCirclePlus } from '@tabler/icons-react'
import { useDataStore } from '@/providers/data-store-providers'

const Widgtes = [
    {
        type: 'text',
        enabled: false,
        title: 'Texto',
        widgetHandler: 'multiple',
        id: '',
    },
    {
        type: 'link',
        enabled: false,
        title: 'Link',
        widgetHandler: 'multiple',
        id: '',
    },
    {
        type: 'pm',
        enabled: false,
        title: 'Metodos de pago',
        widgetHandler: 'unique',
        id: '',
    },
    {
        type: 'dm',
        enabled: false,
        title: 'Metodos de entrega',
        widgetHandler: 'unique',
        id: '',
    },
    {
        type: 'socials',
        enabled: false,
        title: 'Redes sociales',
        widgetHandler: 'unique',
        id: '',
    },
    {
        type: 'resizable',
        enabled: false,
        title: 'Redimensionable',
        widgetHandler: 'multiple',
        id: '',
    },
    {
        type: 'img',
        enabled: false,
        title: 'Imagen',
        widgetHandler: 'multiple',
        id: '',
    },
]

const WidgetsFeatures = () => {
    const addWidget = useDataStore(state => state.addWidget)
    const widgets = useDataStore(state => state.widgets)
    return (
        <div className='flex flex-col gap-2'>
            <h3 className='bg-white px-2 py-1 rounded-sm'>Widgets</h3>
            <div className='flex flex-wrap gap-4'>
                {
                    Widgtes.map((w, i) => {
                        const widget = widgets.find(wid => wid.type === w.type)
                        return (
                            <div key={w.type} className='bg-slate-100 flex gap-2 border rounded-sm p-1'>
                                <span>{w.title}</span>
                                <span className='flex items-center'>
                                    {
                                        w.widgetHandler === 'multiple' ?
                                            <IconCirclePlus
                                                className='cursor-pointer hover:scale-105 transition-all' onClick={() => addWidget(w)} /> :
                                            <Switch
                                                className='data-[state=checked]:bg-green-400'
                                                name='enabled'
                                                onClick={() => addWidget(w)}
                                                checked={widget?.enabled || w.enabled}
                                            />
                                    }
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WidgetsFeatures