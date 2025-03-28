import React from 'react'
import { Spinner } from "@nextui-org/spinner";
import { cn } from '@/lib/utils';
import { LoaderSpinnerProps } from './types';

const LoaderSpinner = ({ size = 'lg', className, color }: LoaderSpinnerProps) => {
    return (
        <div className={cn('h-full w-full flex justify-center items-center', className)}>
            <Spinner size={size} color={color} />
        </div>
    )
}

export default LoaderSpinner