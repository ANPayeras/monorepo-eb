"use client"

import React from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../Icon';

const Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
            }}
            className="relative flex flex-col gap-2 py-28 px-4 bg-gradient-to-t from-slate-400 to-slate-300"
        >
            <div className='flex gap-4 items-center justify-around'>
                <div className="flex items-center dark:text-white">
                    <Image
                        src={'/logo.png'}
                        alt='logo-footer'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                </div>
                <div className="flex dark:text-neutral-200 gap-20 md:gap-40">
                    {/* <div className='flex flex-col gap-1'>
                    <p className='font-bold hover:text-slate-300 cursor-pointer'>Producto:</p>
                    <ul className='children:mt-2 children:text-sm hover:children:text-slate-300 children:cursor-pointer'>
                        <li>Precio</li>
                        <li>Tutoriales</li>
                    </ul>
                </div> */}
                    <div className='flex flex-col'>
                        <p className='hover:text-slate-300 font-bold text-sm md:text-medium'>Contacto:</p>
                        <ul className='children:mt-2 children:text-sm hover:children:text-slate-300 children:cursor-pointer'>
                            <li>
                                <Link target='_blank' href={'mailto:oficial.estoy.link@gmail.com'} className='flex gap-2 items-center'>
                                    <Icon name='mail' iconProps={{ size: 18 }} />
                                    <span>oficial.estoy.link@gmail.com</span>
                                </Link>
                            </li>
                            <li>
                                <Link target='_blank' href='https://www.instagram.com/estoy.link?igsh=MW5nZzhoeDg5MHF1cQ==' className='flex gap-2 items-center'>
                                    <Icon name='instagram' iconProps={{ size: 18 }} />
                                    <span>estoy.link</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <div>
                <Link href="http://qr.afip.gob.ar/?qr=it9N2LOJWZibM4TuXUkVyw,," target="_F960AFIPInfo" className='flex w-fit h-fit'>
                    <Image src={'/qr-afip.jpg'} width={30} height={30} alt="qr-afip" />
                </Link>
            </div> */}
            <div className='flex items-center gap-2 text-slate-900 absolute bottom-0 right-0 px-4 py-4'>
                <Link href={'/terms'} className='text-xs hover:text-slate-700'>
                    Terminos y Condiciones
                </Link>
                <span className='w-1 h-1 bg-slate-900 rounded-full' />
                <Link href={'/privacy'} className='text-xs hover:text-slate-700'>
                    Politica de Privacidad
                </Link>
            </div>
        </motion.div>
    )
}

export default Contact