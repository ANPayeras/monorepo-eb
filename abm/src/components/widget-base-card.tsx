import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Card } from './ui/card'

const WidgetBaseCard = ({ containerClassName, children }: { containerClassName?: string, children: ReactNode }) => {
    return (
        <Card className={cn('group relative w-full bg-slate-50 bg-opacity-80 rounded-md border-slate-700', containerClassName)}>
            {children}
        </Card>
    )
}

export default WidgetBaseCard