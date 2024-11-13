import React, { FC } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { MouseEvent } from 'react';

const EmptyInfo: FC<{ onClick?: (e: MouseEvent<HTMLDivElement>) => void }> = ({ onClick }) => {
    return (
        <div className='bg-gray-900 w-full h-full rounded-sm flex justify-center items-center'>
            <div onClick={onClick} className='w-16 h-16 border-4 border-slate-400 text-slate-100 rounded-full flex justify-center items-center cursor-pointer hover:border-slate-100 hover:text-slate-500'>
                <IconPlus />
            </div>
        </div>
    )
}

export default EmptyInfo