import React, { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Card } from './ui/card'

const WidgetBaseCard = ({ containerClassName, style, children }: { containerClassName?: string, style?: CSSProperties, children: ReactNode }) => {
    return (
        <Card
            className={cn('group relative w-full bg-slate-50 bg-opacity-80 rounded-md border-slate-700', containerClassName)}
            style={style}
        >
            {children}
        </Card>
    )
}

export default WidgetBaseCard