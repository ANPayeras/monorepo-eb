"use client"
import React from 'react'
import BaseView from '@/components/base-view'
import { IconMoodConfuzedFilled } from '@tabler/icons-react'

const error = () => {
    return (
        <BaseView>
            <div className='w-80 h-40 border rounded-sm flex justify-center items-center text-slate-50 base-card'>
                <div className='text-center flex flex-col justify-center items-center gap-2'>
                    <span><IconMoodConfuzedFilled /></span>
                    <span>
                        Ups parece que hay un error, ponte en contacto con el administrador.
                    </span>
                </div>
            </div>
        </BaseView>
    )
}

export default error