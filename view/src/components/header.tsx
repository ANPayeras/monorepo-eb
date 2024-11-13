import React, { useEffect, useState } from 'react'
import BackButton from './back-button'
import AnimateIcon from './animate-icon'
import { IconShoppingCartPlus } from '@tabler/icons-react'
import { useDataStore } from '@/providers/data-store-providers'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = ({ iconUrl }: { iconUrl: string }) => {
    const { cart } = useDataStore(state => state)
    const path = usePathname()
    const [isActive, setIsActive] = useState<boolean>(false)
    const isConfirmation = path.includes('confirmation')

    useEffect(() => {
        const interval = setInterval(() => {
            if (isActive) setIsActive(false)
            clearInterval(interval)
        }, 100)

        return () => clearInterval(interval)
    }, [isActive])

    useEffect(() => {
        if (cart.length >= 1) setIsActive(true)
    }, [cart.length])

    return (
        <div className='flex bg-slate-800 text-white justify-between p-1 rounded-sm'>
            <BackButton />
            {
                !isConfirmation && cart.length ?
                    <AnimateIcon active={isActive}>
                        <Link href={iconUrl} className='relative'>
                            <span className='rounded-full bg-white absolute top-0 right-0 text-sm w-2 h-2' />
                            <IconShoppingCartPlus size={20} />
                        </Link>
                    </AnimateIcon> : <></>
            }
            {
                isConfirmation && <span>Detalle del pedido</span>
            }
        </div >
    )
}

export default Header