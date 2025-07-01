import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <section className='bg-slate-500 h-screen p-10 overflow-y-scroll box-border'>
            <div className='max-w-[1000px] mx-auto flex flex-col gap-5'>
                {children}
                <div className='font-bold'>
                    Si tienes alguna pregunta o comentario, no dudes en contactarnos - oficial.estoy.link@gmail.com.
                </div>
            </div>
        </section>
    )
}

export default layout