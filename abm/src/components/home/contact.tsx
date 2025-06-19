"use client"

import React from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';

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
                        <p className='hover:text-slate-300 font-bold'>Contacto:</p>
                        <ul className='children:mt-2 children:text-sm hover:children:text-slate-300 children:cursor-pointer'>
                            <li>
                                <Link href={'mailto:oficial.estoy.link@gmail.com'}>
                                    oficial.estoy.link@gmail.com
                                </Link>
                            </li>
                            {/* <li>Instagram</li>
                        <li>Linkedin</li> */}
                        </ul>
                    </div>
                </div>
            </div>
            {/* <div>
                <Link href="http://qr.afip.gob.ar/?qr=it9N2LOJWZibM4TuXUkVyw,," target="_F960AFIPInfo" className='flex w-fit h-fit'>
                    <Image src={'/qr-afip.jpg'} width={30} height={30} alt="qr-afip" />
                </Link>
            </div> */}
        </motion.div>
    )
}

export default Contact