import React from 'react'
import { IconChevronRight, IconEdit, IconTrash } from '@tabler/icons-react'
import {
    AnimatePresence,
    motion,
} from "framer-motion";

const ToolsWidget = ({ deleteFunc, editFunc, isEditing = false }: { deleteFunc?: () => void, editFunc?: () => void, isEditing?: boolean }) => {

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
        <div className='flex flex-col justify-start ml-2 text-slate-950 relative'>
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
                                <motion.div
                                    {...animation}
                                >
                                    <IconChevronRight size={18} />
                                </motion.div> :
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
    )
}

export default ToolsWidget