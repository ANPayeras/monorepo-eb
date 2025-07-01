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
            className='flex min-w-40 gap-2'
        >
            {
                leftIconName && !isLoading &&
                <div>
                    <Icon name={leftIconName} iconProps={{ size: 20 }} />
                </div>
            }
            <div className='flex-1'>
                {
                    isLoading ? <LoaderSpinner color={spinnerColor} size='md' /> : children
                }
            </div>
            {
                rightIconName && !isLoading &&
                <div>
                    <Icon name={rightIconName} iconProps={{ size: 20 }} />
                </div>
            }
        </Btn>
    )
}

export default Button