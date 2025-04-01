import React, { ReactNode } from 'react'

const SuscriptionPlansFooter = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex justify-center'>
            {children}
        </div>
    )
}

export default SuscriptionPlansFooter