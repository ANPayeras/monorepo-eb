import React from 'react'
import { Widget } from '@/stores/data-store'

const Text = ({ widget }: { widget: Widget }) => {
    return (
        <div className='w-full flex items-center justify-center text-center'>
            {widget?.data?.value}
        </div>
    )
}

export default Text