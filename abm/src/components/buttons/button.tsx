import React, { FC } from 'react'
import { Button as Btn, ButtonProps } from '../ui/button'
import LoaderSpinner from '../loader-spinner'
import { SpinnersColors } from '../types';
import Icon, { KeyTextIcons } from '../Icon';

interface ButtonInterface extends ButtonProps {
    isLoading?: boolean;
    spinnerColor?: SpinnersColors;
    leftIconName?: KeyTextIcons;
    rightIconName?: KeyTextIcons;
}

const Button: FC<ButtonInterface> = ({ isLoading, spinnerColor, leftIconName, rightIconName, children, ...props }) => {
    return (
        <Btn
            {...props}
            className='flex gap-2'
        >
            {
                leftIconName && <Icon name={leftIconName} />
            }
            {
                isLoading ? <LoaderSpinner color={spinnerColor} /> : children
            }
            {
                rightIconName && <Icon name={rightIconName} />
            }
        </Btn>
    )
}

export default Button