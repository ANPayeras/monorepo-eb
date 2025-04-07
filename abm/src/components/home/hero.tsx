"use client"
import React from 'react'
import { AuroraBackground } from '../ui/aurora-background'
import { motion } from "framer-motion";
import { HoverBorderGradientButton } from './cta-home';
import Link from 'next/link';

const Hero = () => {
    return (
        <AuroraBackground className="bg-slate-600">
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4 z-0"
            >
                <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                    El folleto electronico que nadie pidio...
                </div>
                <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                    ...Pero que era super necesario
                </div>
                <div className='flex gap-4'>
                    <Link href='/sign-up'>
                        <HoverBorderGradientButton>
                            Comienza gratis
                        </HoverBorderGradientButton>
                    </Link>
                    <Link href='/sign-in'>
                        <HoverBorderGradientButton>
                            Iniciar sesion
                        </HoverBorderGradientButton>
                    </Link>
                </div>
            </motion.div>
        </AuroraBackground>
    )
}

export default Hero