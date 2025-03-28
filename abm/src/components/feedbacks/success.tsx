import React, { FC } from 'react'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import { SuccessProps } from './types'

const Success: FC<SuccessProps> = ({ title, children }) => {
    return (
        <div className='flex flex-col gap-5 items-center'>
            <div className='flex flex-col gap-2 items-center'>
                <IconCircleCheckFilled size={80} color='green' />
                <h2 className='text-center'>{title}</h2>
            </div>
            <div className='flex items-center w-full'>
                {children}
            </div>
        </div>
    )
}

export default Success