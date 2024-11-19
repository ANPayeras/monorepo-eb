import { IconError404 } from '@tabler/icons-react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <section className='relative bg-slate-900 h-screen w-screen flex justify-center items-center'>
            <div className='w-80 md:w-[500px] h-40 md:h-[200px] md:text-lg border rounded-sm flex flex-col justify-center items-center text-slate-50 base-card shadow-md shadow-slate-50'>
                <div className='size-full flex flex-1 justify-center items-center gap-2'>
                    Ups parece que esta pagina no existe <IconError404 />
                </div>
                <div className='flex flex-1 justify-center items-center'>
                    <Link
                        href={'/'}
                        className='hover:opacity-50'
                    >
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </section>
    )
}