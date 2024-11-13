import React, { FC } from 'react'
import { TooltipComponent } from './tooltip'
import { IconArrowLeft, IconRefresh } from '@tabler/icons-react'

type NavBuildParams = {
    leftIcon: boolean;
    leftIconFunction: () => void;
    iconRefreshFunction: () => void;
}

const NavBuild: FC<NavBuildParams> = ({ leftIcon, leftIconFunction, iconRefreshFunction }) => {
    return (
        <div className='flex items-center justify-start gap-1 boder rounded-sm bg-slate-300 px-1'>
            <button className='cursor-pointer hover:scale-110' onClick={leftIconFunction}>
                {leftIcon && <IconArrowLeft size={18} />}
            </button>
            <div className='flex items-center justify-between w-full'>
                <span className='text-center'>
                    Vista Previa
                </span>
                {
                    !leftIcon &&
                    <TooltipComponent
                        content={<span>Crear nuevo template</span>}
                    >
                        <button onClick={iconRefreshFunction}>
                            <IconRefresh size={18} className='hover:-rotate-90 transition-all ease-out' />
                        </button>
                    </TooltipComponent>
                }
            </div>
        </div>
    )
}

export default NavBuild