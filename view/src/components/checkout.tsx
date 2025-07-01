import React, { useEffect, useState } from 'react'

import { useDataStore } from '@/providers/data-store-providers'
import { IconBrandWhatsapp, IconCopy, IconCopyCheck } from '@tabler/icons-react'
import useSentEvent from '@/hooks/use-sent-events'
import { Doc } from '../../convex/_generated/dataModel'
import { amountToCurrency } from '@/lib/utils'

const Checkout = ({ user }: { user: Doc<"users"> }) => {
    const { sentEvent } = useSentEvent()
    const { cart } = useDataStore(state => state)
    const [isCopy, setIsCopy] = useState(false)

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

    const handleSendOrder = (type: 'copy' | 'whatsapp') => {
        setIsCopy(true)
        let orderString = ''
        cart.forEach((it) => {
            orderString += `${it.label} -> ${it.quantity} x ${amountToCurrency(it.price)} = ${amountToCurrency(it.quantity * it.price)}\n`
        })
        orderString += `\nTotal: $${cart.reduce((acc, curV) => acc + (curV.price * curV.quantity), 0)}`

        if (type === 'copy') navigator.clipboard.writeText(orderString)
        if (type === 'whatsapp') window.open(`https://wa.me/${user?.phone}?text=${encodeURI(orderString)}`)

        sentEvent(`checkout_${type}`)
    }

    return (
        <section className='flex flex-col justify-start items-center w-full gap-4 pt-5 text-sm'>
            <div className='w-full grid grid-cols-[1.5fr,0.5fr,0.5fr,0.5fr] pr-3'>
                <div></div>
                <div className='flex border-b-1'>P/U</div>
                <div className='flex border-b-1'>Cant.</div>
                <div className='flex border-b-1'>Total</div>
            </div>
            <div className='w-full max-h-[400px] overflow-y-scroll'>
                {
                    cart.map((it, i) => (
                        <div key={i} className='grid grid-cols-[1.5fr,0.5fr,0.5fr,0.5fr] border-b-[1px]'>
                            <span className='text-ellipsis overflow-hidden'>
                                {it.label}
                            </span>
                            <span className='text-ellipsis overflow-hidden'>
                                {amountToCurrency(it.price)}
                            </span>
                            <span className='text-ellipsis overflow-hidden'>
                                {it.quantity}
                            </span>
                            <span className='text-ellipsis overflow-hidden'>
                                {amountToCurrency(it.price * it.quantity)}
                            </span>
                        </div>
                    ))
                }
            </div>
            <div className='flex items-center justify-between w-full border-b-2'>
                <span>Total:</span>
                <span>
                    {amountToCurrency(cart.reduce((acc, curV) => acc + (curV.price * curV.quantity), 0))}
                </span>
            </div>
            <div className='flex flex-col gap-4 w-full text-sm'>
                {
                    user.phone ?
                        <div className='flex w-full justify-between'>
                            <span>Enviar el pedido por WhatsApp:</span>
                            <button onClick={() => handleSendOrder('whatsapp')}>
                                <IconBrandWhatsapp size={18} className='cursor-pointer hover:scale-105' />
                            </button>
                        </div> : <></>
                }
                <div className='flex w-full justify-between'>
                    <span>Copiar el pedido:</span>
                    <button onClick={() => handleSendOrder('copy')}>
                        {
                            isCopy ? <IconCopyCheck size={18} className='cursor-pointer hover:scale-105' /> :
                                <IconCopy size={18} className='cursor-pointer hover:scale-105' />
                        }
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Checkout