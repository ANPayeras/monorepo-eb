import React, { useState } from 'react'

import { Button } from '../ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

const titleTexts: { [key: string]: string } = {
    'verification-phone': 'Ingresa el código enviado por SMS',
    'verification-email': 'Ingresa el código enviado al mail',
}

const Verification = ({ onCancel, handleAccept, type }: any) => {
    const [value, setValue] = useState<string>('')
    const [errMsg, setErrMsg] = useState<string>('')

    const onSubmit = async () => {
        try {
            await handleAccept({ value, verification: true })
            onCancel()
        } catch (error) {
            // const _err = error as Error
            // const err = JSON.parse(_err.message)
            setErrMsg('Código incorrecto')
        }
    }

    return <>
        <div className='font-bold'>{titleTexts[type]}</div>
        <div className='flex flex-col gap-2 items-center'>
            <div className='relative flex items-center'>
                <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    onChange={(value) => {
                        setValue(value)
                        setErrMsg('')
                    }}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} className='bg-slate-50' />
                        <InputOTPSlot index={1} className='bg-slate-50' />
                        <InputOTPSlot index={2} className='bg-slate-50' />
                        <InputOTPSlot index={3} className='bg-slate-50' />
                        <InputOTPSlot index={4} className='bg-slate-50' />
                        <InputOTPSlot index={5} className='bg-slate-50' />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <span
                className='ml-4 text-xs opacity-50'
                style={{ color: 'red' }}
            >
                {errMsg}
            </span>
        </div>
        <div className='flex justify-end gap-2'>
            <Button className='text-black bg-transparent hover:bg-slate-300' onClick={onCancel}>Cancel</Button>
            <Button
                onClick={onSubmit}
                disabled={value.length < 6}
            >
                Aceptar
            </Button>
        </div>
    </>
}

export default Verification