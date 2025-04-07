import React, { FC } from 'react'
import { PendingProps } from './types'
import Icon from '../Icon'

const Pending: FC<PendingProps> = ({ title, children }) => {
    return (
        <div className='flex flex-col gap-5 items-center'>
            <div className='flex flex-col gap-2 items-center'>
                <Icon name='clockFilled' iconProps={{ size: 80, color: 'lightblue' }} />
                <h2 className='text-center'>{title}</h2>
            </div>
            <div className='flex items-center w-full'>
                {children}
            </div>
        </div>
    )
}

export default Pending