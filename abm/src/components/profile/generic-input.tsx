import React, { ChangeEvent, useMemo, useState } from 'react'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { GenericInputProps } from '@/interfaces'
import { ClerkAPIError } from '@clerk/types/dist/index'

const errors: { [key: string]: { type: string, msg: string } } = {
    usernameo: {
        type: 'username',
        msg: 'El nombre de usuario ya existe',
    },
    generic: {
        type: 'generic',
        msg: 'Ha ocurrido un error, por favor vuelva a intentar'
    }
}

const GenericInput = ({ title, description, onCancel, handleAccept, inputValue = '', helperText, type }: GenericInputProps) => {
    const [value, setValue] = useState<string>(inputValue)
    const [errMsg, setErrMsg] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setErrMsg('')
        if (type === 'username') {
            if (!/^[A-Za-z0-9_-]*$/.test(value)) return
            setValue(e.target.value.trim())
        } else {
            setValue(e.target.value.trim())
        }
    }

    const onSubmit = async () => {
        try {
            await handleAccept({ value })
            if (type === 'phone') return
            onCancel()
        } catch (error) {
            const _err = error as Error
            const err = JSON.parse(_err.message) as ClerkAPIError
            const errorFormatted = errors[err.meta?.paramName!]
            setErrMsg(errorFormatted?.msg || errors['generic'].msg)
        }
    }

    const isBtnDisabled = useMemo(() => !value || value === inputValue || type === 'delete' && value !== 'Eliminar cuenta', [inputValue, type, value])

    return <>
        <div className='font-bold'>{title}</div>
        <div className='text-sm'>{description}</div>
        <div className='flex flex-col gap-2'>
            <div className='relative flex items-center'>
                {
                    type === 'phone' ?
                        <span className='flex justify-center border rounded-tl-sm rounded-bl-sm absolute h-10 w-10 text-sm py-2 px-1 bg-background'>
                            +54
                        </span>
                        : <></>
                }
                <Input
                    style={{ paddingLeft: type === 'phone' ? '48px' : '12px' }}
                    type={type === 'phone' ? 'number' : 'text'} value={value} onChange={handleChange} />
            </div>
            <span
                className='ml-4 text-xs opacity-50'
                style={{ color: errMsg ? 'red' : '' }}
            >
                {errMsg || helperText}
            </span>
        </div>
        <div className='flex justify-end gap-2'>
            <Button className='text-black bg-transparent hover:bg-slate-300' onClick={onCancel}>Cancel</Button>
            <Button
                onClick={onSubmit}
                disabled={isBtnDisabled}
            >
                Aceptar
            </Button>
        </div>
    </>
}

export default GenericInput