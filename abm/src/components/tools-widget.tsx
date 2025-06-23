import React from 'react'

import { IconChevronDown, IconChevronRight, IconEdit, IconTrash } from '@tabler/icons-react'
import {
    AnimatePresence,
    motion,
} from "framer-motion";
import Icon from './Icon';

const ToolsWidget = ({ deleteFunc, editFunc, isEditing = false, props }: { deleteFunc?: () => void, editFunc?: () => void, isEditing?: boolean, props?: any }) => {

    const _editFunc = () => {
        editFunc && editFunc()
    }

    const animation = {
        initial: { opacity: 0, scale: 0.6 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.2,
            },
        },
        exit: { opacity: 0, scale: 0.6 }
    }

    return (
        <div
            className='flex flex-col justify-between text-slate-950 absolute top-0 right-0 rounded-tr-md rounded-br-md transition-all sm:invisible group-hover:visible bg-slate-400 bg-opacity-50 py-3 h-full z-10'
            style={{
                ...(isEditing && { visibility: 'visible' })
            }}
        >
            <div className='flex flex-col'>
                {
                    deleteFunc &&
                    <button className='hover:opacity-60' onClick={deleteFunc}>
                        <IconTrash size={18} />
                    </button>
                }
                <AnimatePresence initial={false}>
                    {
                        editFunc && <>
                            {
                                isEditing ?
                                    <>
                                        <motion.div
                                            {...animation}
                                            className='hidden sm:flex'
                                        >
                                            <IconChevronRight size={18} />
                                        </motion.div>
                                        <motion.div
                                            {...animation}
                                            className='sm:hidden'
                                        >
                                            <IconChevronDown size={18} />
                                        </motion.div>
                                    </> :
                                    <motion.button
                                        {...animation}
                                        className='hover:opacity-60 text-slate-900'
                                        onClick={_editFunc}
                                    >
                                        <IconEdit size={18} />
                                    </motion.button>
                            }
                        </>
                    }
                </AnimatePresence>
            </div>
            {props &&
                <button className='flex sm:hidden touch-none' {...props}>
                    <Icon name='dotHandler' iconProps={{ size: 18 }} />
                </button>
            }
        </div>
    )
}

export default ToolsWidget