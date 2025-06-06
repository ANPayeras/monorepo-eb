import React from 'react'

import Icon from './Icon'
import { TooltipComponent } from './tooltip'
import Link from 'next/link'
import { RowPlanLimitsProps } from './types'

const RowPlanLimits = ({ quantity, limit }: RowPlanLimitsProps) => {
    return (
        <div className='flex items-center gap-2 text-sm md:text-medium'>
            <span>
                {`${quantity}/${limit}`}
            </span>
            <span>
                <TooltipComponent content={<span>Ver límites</span>}>
                    <Link href={'/profile/price'}>
                        <Icon name='infoOutlined' iconProps={{ className: 'text-blue-400 size-[18px]' }} />
                    </Link>
                </TooltipComponent>
            </span>
        </div>
    )
}

export default RowPlanLimits