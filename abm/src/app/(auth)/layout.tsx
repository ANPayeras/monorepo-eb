import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='h-screen relative w-full bg-slate-100'>
            {children}
        </main>
    )
}

export default layout