import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const data = [
    {
        category: "Creá",
        title: "Seleccioná un diseño y comenzà a crear.",
        src: "/card-1.png",
        content: <></>,
    },
    {
        category: "Personalizá",
        title: "Desde una lista con links, hasta un listado de de productos.",
        src: "/card-2.png",
        content: <></>,
    },
    {
        category: "Gestioná",
        title: "Administrá y usa las plantillas a tu conveniencia.",
        src: "/card-3.png",
        content: <></>,
    },
    {
        category: "Compartí",
        title: "Mostrale tu plantilla al mundo.",
        src: "/card-4-mobile.png",
        src2: "/card-4-desktop.png",
        content: <></>,
    },
    {
        category: "Medí",
        title: "Utiliza métricas para saber como se utiliza la plantilla.",
        src: "https://images.pexels.com/photos/7172774/pexels-photo-7172774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        content: <></>,
    },
    // {
    //     category: "",
    //     title: "Hiring for a Staff Software Engineer",
    //     src: "https://images.pexels.com/photos/7172774/pexels-photo-7172774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     content: <></>,
    // },
];

export function CardsCarrousel() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-4 bg-gradient-to-b from-slate-600 to-slate-500">
            {/* <h2 className="pl-4 text-center mx-auto text-xl md:text-5xl font-bold bg-gradient-to-br from-slate-200 to-slate-500 bg-clip-text font-sans text-transparent pb-4">
                Tenelo listo es simples pasos
            </h2> */}
            <Carousel items={cards} />
        </div>
    );
}