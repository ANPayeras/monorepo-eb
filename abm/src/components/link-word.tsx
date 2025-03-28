import Link from 'next/link'
import React from 'react'
import { LinkWordProps } from './types'

const LinkWord = ({ link, text, target = '_blank' }: LinkWordProps) => {
    return (
        <Link
            className='overflow-hidden text-ellipsis text-nowrap text-blue-400 transition-all hover:underline underline-offset-4 text-center'
            href={link}
            target={target}
        >
            {text || link}
        </Link>

    )
}

export default LinkWord