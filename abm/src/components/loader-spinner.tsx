import React from 'react'
import { Spinner } from "@nextui-org/spinner";

const LoaderSpinner = ({ size = 'lg' }: { size?: "sm" | "md" | "lg" | undefined }) => {
    return (
        <div className='h-full w-full flex justify-center items-center'>
            <Spinner size={size} />
        </div>
    )
}

export default LoaderSpinner