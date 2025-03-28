import React, { FC } from 'react'
import { ErrosProps } from './types'
import { IconCircleXFilled } from '@tabler/icons-react'

const Error: FC<ErrosProps> = ({ title, children }) => {
    return (
        <div className='flex flex-col gap-5 items-center'>
            <div className='flex flex-col gap-2 items-center'>
                <IconCircleXFilled size={80} color='red' />
                <h2 className='text-center'>{title}</h2>
            </div>
            <div className='flex justify-center w-full'>
                {children}
            </div>
        </div>
    )
}

export default Error