import React, { useEffect, useState } from 'react'
import {
    AnimatePresence,
    motion,
} from "framer-motion";
import ChangePassword from './change-password';
import { helperTexts } from '@/constants';
import { InputCardProps } from '@/interfaces';
import GenericInput from './generic-input';

const InputCard = ({ type, openType, title, description, handleAccept, textButton, inputValue = '' }: InputCardProps) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (openType === type) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [openType, type])

    const Comp: { [key: string]: JSX.Element } = {
        username: <GenericInput {...{ description, handleAccept, setOpen, title, inputValue, helperText: helperTexts[type], type }} />,
        email: <GenericInput {...{ description, handleAccept, setOpen, title, inputValue, helperText: '', type }} />,
        phone: <GenericInput {...{ description, handleAccept, setOpen, title, inputValue, helperText: '', type }} />,
        password: <ChangePassword  {...{ setOpen, handleAccept }} />,
    }

    return (
        <AnimatePresence>
            <motion.div>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: 10,
                            transition: {
                                delay: 0.05,
                            },
                        }}
                        transition={{ delay: 0.05 }}
                        className='bg-slate-200 rounded-sm p-4 flex flex-col gap-4 border'
                    >
                        {
                            Comp[type]
                        }
                    </motion.div>
                )}
                {
                    !open && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: 10,
                                transition: {
                                    delay: 0.05,
                                },
                            }}
                            transition={{ delay: 0.05 }}
                        >
                            <button
                                className='p-1 rounded-sm border bg-slate-100 hover:scale-90 transition-all hover:bg-slate-300'
                                onClick={() => setOpen(true)}
                            >
                                {textButton}
                            </button>
                        </motion.div>
                    )
                }
            </motion.div>
        </AnimatePresence>
    )
}

export default InputCard