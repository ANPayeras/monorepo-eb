import React, { ReactNode } from 'react'
import { CardDescription } from '../ui/card'
import { cn } from '@/lib/utils'

const EmptyChartInfo = ({ className, children }: { className?: string, children?: ReactNode }) => {

    if (children) return <>{children}</>

    return (
        <CardDescription
            className={cn(`h-full flex justify-center items-center opacity-50`, className)}>
            No hay informacion que mostrar
        </CardDescription>
    )
}

export default EmptyChartInfo