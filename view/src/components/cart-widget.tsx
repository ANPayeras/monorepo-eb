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
                    <div className='flex justify-between border p-2 rounded-full fixed bottom-1 right-1 md:bottom-4 md:right-4 bg-slate-800'>
                        {/* <span>
                            Tenes un pedido pendiente
                        </span> */}
                        <AnimateIcon active={true}>
                            <Link href={`${user}/list/confirmation`} className='relative'>
                                {/* {
                                    cart.length ?
                                        <span className='rounded-full bg-white absolute top-0 right-0 text-sm w-2 h-2' /> : <></>
                                } */}
                                <IconShoppingCartFilled size={20} className='text-slate-50' />
                            </Link>
                        </AnimateIcon>
                    </div> : <></>
            }
        </>
    )
}

export default CartWidget