import React from 'react'
import { IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()
    return (
        <button
            onClick={() => router.back()}
            className='cursor-pointer hover:scale-110' >
            <IconArrowLeft size={20} />
        </button>
    )
}

export default BackButton