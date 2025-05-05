"use client"

import React from 'react'
import { IconMoodConfuzedFilled } from '@tabler/icons-react'
import Button from '@/components/buttons/button'

const Error = ({ reset }: {
    error: Error & { digest?: string }
    reset: () => void
}) => {
    return (
        <div className='w-full h-screen bg-slate-200 flex items-center justify-center'>
            <div className='text-center flex flex-col justify-center items-center gap-5'>
                <span><IconMoodConfuzedFilled /></span>
                <span>
                    Ups parece que hubo un error, ponte en contacto con el administrador.
                </span>
                <Button onClick={reset}>
                    Reintentar
                </Button>
            </div>
        </div>
    )
}

export default Error