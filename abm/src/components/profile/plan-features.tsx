import React from 'react'

const texts = {
    free: {
        title: 'Plan gratuito',
        features: ['Hasta 3 Plantillas', 'Opciones de diseño limitadas']
    },
    premium: {
        title: 'Plan premium',
        features: ['Hasta 10 Plantillas', 'Opciones de diseño ampliadas', 'Metricas de uso', 'I.A. para ayudarte con los diseños']
    },
}

const PlanFeatures = ({ type }: { type: keyof typeof texts }) => {
    return (
        <div
            className='flex flex-col pt-4'
            style={{ paddingLeft: type === 'free' ? '10px' : 0, paddingRight: type === 'free' ? 0 : '10px' }}
        >
            <span
                style={{ textAlign: type === 'free' ? 'left' : 'right' }}
                className='mb-2 font-bold'
            >
                {texts[type].title}
            </span>
            <ul>
                {texts[type].features.map((f, i) => (
                    <li key={i}
                        style={{ flexDirection: type === 'free' ? 'row' : 'row-reverse' }}
                        className='flex items-center gap-2'>
                        <span className='w-1 h-1 bg-slate-900 rounded-full' />
                        <span>{f}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PlanFeatures