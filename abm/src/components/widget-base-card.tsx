import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Card } from './ui/card'

const WidgetBaseCard = ({ containerClassName, children }: { containerClassName?: string, children: ReactNode }) => {
    return (
        <Card className={cn('group relative w-full rounded-md border-slate-700 ', containerClassName)}>
            {children}
        </Card>
    )
}

export default WidgetBaseCard