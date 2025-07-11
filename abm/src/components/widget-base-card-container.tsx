// Creado para los widgets del template classic, borrar cuando se migren
import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import WidgetBaseCard from './widget-base-card'
import { Widget } from '@/stores/data-store'

const WidgetBaseCardContainer = ({ containerClassName, children, widget }: { containerClassName?: string, children: ReactNode, widget?: Widget }) => {
    const data = widget?.data
    return (
        <WidgetBaseCard
            containerClassName={cn(`${containerClassName} ${data?.container?.shadow}`)}
            style={{
                backgroundColor: data?.container?.bgColor || '',
                borderStyle: data?.container?.border?.type || '',
                borderColor: data?.container?.border?.color || '',
                borderRadius: `${data?.container?.border?.rounded ? `${data?.container?.border?.rounded}px` : ''}`,
                borderWidth: `${data?.container?.border?.width ? `${data?.container?.border?.width}px` : ''}`,
            }}
        >
            {children}
        </WidgetBaseCard>
    )
}

export default WidgetBaseCardContainer