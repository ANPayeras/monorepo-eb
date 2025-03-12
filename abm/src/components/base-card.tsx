import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Card } from './ui/card'

const BaseCard = ({ containerClassName, children }: { containerClassName?: string, children: ReactNode }) => {
    return (
        <Card className={cn('w-fit h-fit flex-grow transition-all rounded-sm p-1', containerClassName)}>
            {children}
        </Card>
    )
}

export default BaseCard