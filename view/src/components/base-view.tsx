import React, { ReactNode } from 'react'
import BrandLink from './brand-link'

const BaseView = ({ children }: { children: ReactNode }) => {
    return (
        <section className='relative bg-slate-900 h-screen w-screen flex justify-center items-center'>
            {children}
            <BrandLink />
        </section>
    )
}

export default BaseView