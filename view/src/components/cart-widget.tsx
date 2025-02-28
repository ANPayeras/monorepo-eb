"use client"
import { useDataStore } from '@/providers/data-store-providers'
import React from 'react'
import AnimateIcon from './animate-icon'
import { IconShoppingCartFilled } from '@tabler/icons-react'
import Link from 'next/link'

const CartWidget = ({ user }: { user: string }) => {
    const cart = useDataStore(state => state.cart)
    return (
        <>
            {
                cart.length ?
                    <Link
                        href={`${user}/list/confirmation`}>
                        <AnimateIcon
                            active={true}
                            className='flex justify-between border p-2 rounded-full fixed bottom-1 right-1 md:bottom-4 md:right-4 bg-slate-800 hover:opacity-50 transition-all'
                        >
                            <IconShoppingCartFilled size={20} className='text-slate-50' />
                        </AnimateIcon>
                    </Link> : <></>
            }
        </>
    )
}

export default CartWidget