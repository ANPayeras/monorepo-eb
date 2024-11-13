"use client"
import React from 'react'
import { IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()
    return (
        <button onClick={() => router.back()}>
            <IconArrowLeft size={18} />
        </button>
    )
}

export default BackButton