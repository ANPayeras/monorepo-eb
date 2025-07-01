"use client"

import React, { useEffect, useState } from 'react'
import Icon from './Icon'

const GlobalAlert = () => {
    const [openAlert, setOpenAlert] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('closeGlobalAlert')) {
            setOpenAlert(false)
        } else {
            setOpenAlert(true)
        }
    }, [])

    const closeAlert = () => {
        setOpenAlert(false)
        localStorage.setItem('closeGlobalAlert', 'true')
    }

    return (
        openAlert ?
            <div className='absolute w-full top-0 left-0 z-50 bg-slate-400 p-2 flex items-center justify-center gap-2 drop-shadow-md'>
                <h3 className='text-xs md:text-medium text-center text-slate-50'>
                    Estás usando una versión <span className='bg-yellow-100 text-black rounded-sm px-1'>Beta</span>, seguimos trabajando para mejorarla. Agradecemos tu feedback - oficial.estoy.link@gmail.com
                </h3>
                <button
                    onClick={closeAlert}>
                    <Icon name='xFilled' iconProps={{ className: 'text-slate-50', size: 18 }} />
                </button>
            </div> : <></>
    )
}

export default GlobalAlert