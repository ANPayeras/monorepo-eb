import React from 'react'
import BaseView from './base-view'

const Loader = () => {
    return (
        <BaseView>
            <div className='flex gap-2'>
                <span className='bg-slate-100 w-3 h-3 rounded-full dot-animation' />
                <span className='bg-slate-100 w-3 h-3 rounded-full dot-animation delay-100' />
                <span className='bg-slate-100 w-3 h-3 rounded-full dot-animation delay-200' />
            </div>
        </BaseView>
    )
}

export default Loader