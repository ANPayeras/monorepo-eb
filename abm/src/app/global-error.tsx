'use client'

import Button from "@/components/buttons/button"
import { IconMoodConfuzedFilled } from "@tabler/icons-react"

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
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
            </body>
        </html>
    )
}