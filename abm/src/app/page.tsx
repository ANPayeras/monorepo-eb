import React from "react";
import Hero from "@/components/home/hero";
import { DockMenu } from "@/components/home/dockMenu";
import { CardsCarrousel } from "@/components/home/cardsCarrousel";
import Contact from "@/components/home/contact";
import FeaturesSection from "@/components/home/features-section";
import Plans from "@/components/home/plans";

const page = () => {
    return (
        <main className="absolute w-full top-0 left-0 bg-slate-600">
            <DockMenu />
            <section id="home">
                <Hero />
            </section>
            <section id="explore">
                <CardsCarrousel />
            </section>
            <section id="features">
                <FeaturesSection />
            </section>
            <section id="plans">
                <Plans />
            </section>
            <section id="contact">
                <Contact />
            </section>
        </main>

    )
}

export default page