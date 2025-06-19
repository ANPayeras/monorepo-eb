import React, { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { headers } from "next/headers";

const layout = ({ children }: { children: ReactNode }) => {
    const heads = headers()
    const pathname = heads.get("x-url") || "";

    const title = pathname.includes('terms') ? 'TÉRMINOS Y CONDICIONES' : 'POLÍTICA DE PRIVACIDAD'

    return (
        <section className='bg-slate-500 h-screen p-10 overflow-y-scroll box-content'>
            <div className='max-w-[1000px] mx-auto flex flex-col gap-5'>
                <div className='flex flex-col gap-5 border-b'>
                    <div className='flex justify-start items-center gap-2'>
                        <Link href={'/'} className='rounded-full'>
                            <Image src={'/logo.png'}
                                alt='logo-terms'
                                width={40}
                                height={40}
                                className='rounded-full'
                            />
                        </Link>
                        <h1 className='font-bold'>{title}</h1>
                    </div>
                    <p><strong>Última actualización:</strong> 16 de junio de 2025</p>
                </div>
                {children}
                <div className='font-bold'>
                    Si tienes alguna pregunta o comentario, no dudes en contactarnos - oficial.estoy.link@gmail.com.
                </div>
            </div>
        </section>
    )
}

export default layout