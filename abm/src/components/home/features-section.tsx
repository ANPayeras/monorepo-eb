import React from 'react'
import {
    IconAdjustmentsBolt,
    IconCloud,
    IconCurrencyDollar,
    IconEaseInOut,
    IconHeart,
    IconHelp,
    IconRouteAltLeft,
    IconTerminal2,
} from "@tabler/icons-react";
import { Feature } from './feature';

const FeaturesSection = () => {
    const features = [
        {
            title: "Hecho para emprendedores",
            description:
                "Una herramienta facil de usar.",
            icon: <IconTerminal2 color='white' />,
        },
        {
            title: "Bajos costos",
            description:
                "Apalanca tu negocio con costos bajos",
            icon: <IconEaseInOut color='white' />,
        },
        {
            title: "Responsive",
            description:
                "Diseñado tanto para celulares como para computadoras.",
            icon: <IconCurrencyDollar color='white' />,
        },
        {
            title: "Metricas",
            description: "Visualiza metricas sobre el uso de tu plantilla.",
            icon: <IconCloud color='white' />,
        },
        {
            title: "IA",
            description: "Con el poder de la I.A. conoce cuales son las tendencias de los usuarios.",
            icon: <IconRouteAltLeft color='white' />,
        },
        {
            title: "Soporte personlaizado",
            description:
                "Atencion al cliente a la altura de los clientes.",
            icon: <IconHelp color='white' />,
        },
        {
            title: "Blockchain",
            description:
                "If you donot like EveryAI, we will convince you to like us.",
            icon: <IconAdjustmentsBolt color='white' />,
        },
        {
            title: "And everything else",
            description: "I just ran out of copy ideas. Accept my sincere apologies",
            icon: <IconHeart color='white' />,
        },
    ];

    return (
        <div className="w-full min-h-screen py-4 px-2 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-0 py-10 max-w-7xl mx-auto gap-1">
                {features.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </div>
        </div>

    );
}

export default FeaturesSection