import React from 'react'
import { Widget } from '@/types'

const Link = ({ widget }: { widget: Widget }) => {
    return (
        <>
            {
                widget?.data?.value ?
                    <div className='w-[90%] py-4 px-4 flex items-center justify-center text-center border rounded-sm shadow-md cursor-pointer hover:scale-105 transition-all'>
                        {widget?.data?.value}
                    </div> : <></>
            }
        </>
    )
}

export default Link