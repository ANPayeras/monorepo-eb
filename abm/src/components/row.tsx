import React from 'react'

import { RowProps } from './types'

const Row = ({ title, description }: RowProps) => {
    return (
        <div className='flex flex-col text-sm xs:text-medium md:flex-row p-2 gap-5 md:justify-between items-start min:h-14 border-b'>
            <div className='flex flex-1 flex-col xs:flex-row xs:gap-5 xs:items-center'>
                <span>{title}</span>
                <span className='font-bold'>{description}</span>
            </div>
        </div>
    )
}

export default Row