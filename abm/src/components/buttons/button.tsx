import React, { FC } from 'react'
import { Button as Btn, ButtonProps } from '../ui/button'
import LoaderSpinner from '../loader-spinner'
import { SpinnersColors } from '../types';

interface ButtonInterface extends ButtonProps {
    isLoading?: boolean;
    spinnerColor?: SpinnersColors;
}

const Button: FC<ButtonInterface> = ({ isLoading, spinnerColor, children, ...props }) => {
    return (
        <Btn
            {...props}
        >
            {
                isLoading ? <LoaderSpinner color={spinnerColor} /> : children
            }
        </Btn>
    )
}

export default Button