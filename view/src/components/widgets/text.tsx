import React from 'react'
import { Widget } from '@/types'

const Text = ({ widget }: { widget: Widget }) => {
    return (
        <>
            {
                widget?.data?.value ?
                    <div className='w-[90%] p-4 flex items-center justify-center text-center border rounded-sm'>
                        {widget?.data?.value}
                    </div> : <></>
            }
        </>
    )
}

export default Text