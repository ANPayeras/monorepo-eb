"use client"

import React, { useEffect, useState } from 'react'
import Icon from './Icon'

const CopyLink = ({ text = '', iconSize = 18, onClick }: { text?: string, iconSize?: number, onClick?: () => void }) => {
    const [isCopy, setIsCopy] = useState(false)

    const copyLink = () => {
        setIsCopy(true)
        onClick ? onClick() : navigator.clipboard.writeText(text)
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isCopy) {
            interval = setInterval(() => {
                setIsCopy(false)
                clearInterval(interval)
            }, 500)
        }

        return () => clearInterval(interval)
    }, [isCopy])

    return (
        <button onClick={copyLink} className='transition-all hover:scale-105'>
            {
                isCopy ? <Icon name='copyCheck' iconProps={{ size: iconSize }} /> : <Icon name='copy' iconProps={{ size: iconSize }} />
            }
        </button>
    )
}

export default CopyLink