import React, { ReactNode } from 'react'
import BrandLink from './brand-link'
import { cn } from '@/lib/utils'

const BaseView = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <section className={cn('relative bg-slate-900 h-screen w-screen flex justify-center items-center', className)}>
            {children}
            <BrandLink />
        </section>
    )
}

export default BaseView