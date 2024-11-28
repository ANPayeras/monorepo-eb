import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const BaseCard = ({ containerClassName, children }: { containerClassName?: string, children: ReactNode }) => {
    return (
        <div className={cn('bg-slate-500 w-fit h-fit flex-grow transition-all rounded-sm p-1', containerClassName)}>
            {children}
        </div>
    )
}

export default BaseCard