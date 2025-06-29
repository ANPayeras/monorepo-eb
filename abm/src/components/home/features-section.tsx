import React from 'react'

import {
    IconArrowNarrowRightDashed,
    IconBulb,
    IconChartLine,
    IconDeviceGamepad,
    IconHelp,
    IconInputAi,
    IconPerspective,
    IconRecharging,
} from "@tabler/icons-react";
import { Feature } from './feature';

const FeaturesSection = () => {
    const features = [
        {
            title: "Para quienes crean y emprenden",
            description:
                "Una herramienta fácil de usar.",
            icon: <IconBulb color='white' />,
        },
        {
            title: "Bajos costos",
            description:
                "Apalanca tus ideas con costos bajos.",
            icon: <IconRecharging color='white' />,
        },
        {
            title: "Responsive",
            description:
                "Diseñado tanto para celulares como para computadoras.",
            icon: <IconPerspective color='white' />,
        },
        {
            title: "Métricas",
            description: "Visualiza métricas sobre el uso de tus plantillas.",
            icon: <IconChartLine color='white' />,
        },
        {
            title: "Soporte personalizado",
            description:
                "Te acompañamos durante todo el proceso.",
            icon: <IconHelp color='white' />,
        },
        {
            title: "I.A. (Próximamente)",
            description: "Con el poder de la I.A. conoce cuáles son las tendencias de los usuarios.",
            icon: <IconInputAi color='white' />,
        },
        {
            title: "Gamificación (Próximamente)",
            description:
                "Consigue logros por usar la plataforma.",
            icon: <IconDeviceGamepad color='white' />,
        },
        {
            title: "Esto recién empieza",
            description: "Muchas ideas en desarrollo...",
            icon: <IconArrowNarrowRightDashed color='white' />,
        },
    ];

    return (
        <div className="w-full min-h-screen py-4 px-2 flex items-center bg-gradient-to-b from-slate-500 to-slate-400">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-0 py-10 max-w-7xl mx-auto gap-1">
                {features.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </div>
        </div>

    );
}

export default FeaturesSection