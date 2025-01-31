import React from 'react'
import LoaderSpinner from './loader-spinner'

const AllPageLoader = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <>
            {
                isOpen &&
                <div className='absolute z-[100] bg-opacity-80 bg-slate-400 w-full h-full top-0 left-0'>
                    <LoaderSpinner size='lg' />
                </div>
            }
        </>
    )
}

export default AllPageLoader