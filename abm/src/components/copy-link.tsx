"use client"
import React, { useEffect, useState } from 'react'
import Icon from './Icon'

const CopyLink = ({ url }: { url: string }) => {
    const [isCopy, setIsCopy] = useState(false)

    const copyLink = () => {
        setIsCopy(true)
        navigator.clipboard.writeText(url)
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
        <button onClick={copyLink} className='hover:scale-105'>
            {
                isCopy ? <Icon name='copyCheck' iconProps={{ size: 18 }} /> : <Icon name='copy' iconProps={{ size: 18 }} />
            }
        </button>
    )
}

export default CopyLink