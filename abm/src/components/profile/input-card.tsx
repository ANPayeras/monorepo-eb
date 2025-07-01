import React, { useState } from 'react'

import {
    AnimatePresence,
    motion,
} from "framer-motion";
import ChangePassword from './change-password';
import { helperTexts } from '@/constants';
import { InputCardProps } from '@/interfaces';
import GenericInput from './generic-input';
import Verification from './verification';

const InputCard = ({ type, title = '', description = '', handleAccept, onCancel, textButton, inputValue = '', isPassword = false }: InputCardProps) => {
    const [open, setOpen] = useState(false)

    const _onCancel = () => {
        onCancel && onCancel()
        setOpen(false)
    }

    const Comp: { [key: string]: JSX.Element } = {
        username: <GenericInput {...{ description, handleAccept, onCancel: _onCancel, title, inputValue, helperText: helperTexts[type], type }} />,
        email: <GenericInput {...{ description, handleAccept, onCancel: _onCancel, title, inputValue, helperText: '', type }} />,
        phone: <GenericInput {...{ description, handleAccept, onCancel: _onCancel, title, inputValue, helperText: '', type }} />,
        password: <ChangePassword  {...{ onCancel: _onCancel, handleAccept, isPassword }} />,
        verification: <Verification  {...{ onCancel: _onCancel, handleAccept, type }} />,
        delete: <GenericInput {...{ description, handleAccept, onCancel: _onCancel, title, inputValue, helperText: helperTexts[type], type }} />,
    }

    return (
        <AnimatePresence initial={false}>
            <motion.div className='w-full md:w-[50%] flex md:justify-end'>
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
                        className='bg-slate-200 rounded-sm p-4 flex flex-col gap-4 border w-full'
                    >
                        {
                            Comp[type.split('-')[0]]
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
                                className='p-1 rounded-sm border bg-slate-100 hover:shadow-lg hover:scale-[1.01] transition-all hover:bg-slate-300'
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