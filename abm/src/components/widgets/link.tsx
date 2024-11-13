import { Widget } from '@/stores/data-store'
import React from 'react'

const Link = ({ widget }: { widget: Widget }) => {
    return (
        <div className='w-full py-4 px-4 flex items-center justify-center text-center border rounded-sm'>
            {widget?.data?.value}
        </div>
    )
}

export default Link