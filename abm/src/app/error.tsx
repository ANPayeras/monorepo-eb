"use client"

import React from 'react'
import { IconMoodConfuzedFilled } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import Button from '@/components/buttons/button'

const error = () => {
    const router = useRouter()
    return (
        <div className='w-full h-screen bg-slate-200 flex items-center justify-center'>
            <div className='text-center flex flex-col justify-center items-center gap-5'>
                <span><IconMoodConfuzedFilled /></span>
                <span>
                    Ups parece que hubo un error, ponte en contacto con el administrador.
                </span>
                <Button onClick={() => router.refresh()}>
                    Reintentar
                </Button>
            </div>
        </div>
    )
}

export default error