"use client"
import React, { FC } from 'react'
import { motion } from "framer-motion";
import Link from 'next/link';
import { EmptyTemplatesInterface } from '@/interfaces';

const EmptyTemplates: FC<EmptyTemplatesInterface> = ({ mainTitle, linkTitle, linkUrl }) => {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <motion.h3
                initial={{ opacity: 0.5, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.5,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="max-w-[1000px] bg-gradient-to-br from-slate-500 to-slate-900 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent"
            >
                {mainTitle}
            </motion.h3>
            <Link href={linkUrl}>
                <motion.button
                    initial={{ opacity: 0.5, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{
                        scale: 1.1
                    }}
                    className='px-5 py-1 bg-black text-white rounded-sm font-bold'>
                    {linkTitle}
                </motion.button>
            </Link>
        </div>
    )
}

export default EmptyTemplates