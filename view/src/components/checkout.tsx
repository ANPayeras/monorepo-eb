import React, { useEffect, useState } from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import { IconBrandWhatsapp, IconCopy, IconCopyCheck } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

const Checkout = () => {
    const path = usePathname()
    const user = useQuery(api.templates.getUser, { user: path.split('/')[2] })
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

    const handleSendOrder = (type: string) => {
        setIsCopy(true)
        let orderString = ''
        cart.forEach((it) => {
            orderString += `${it.label} -> ${it.quantity} x $${it.price} = $${it.quantity * it.price}\n`
        })
        orderString += `\nTotal: $${cart.reduce((acc, curV) => acc + (curV.price * curV.quantity), 0)}`

        if (type === 'copy') navigator.clipboard.writeText(orderString)
        if (type === 'whatsapp') window.open(`https://web.whatsapp.com/send?phone=${user && user[0].phone}&text=${encodeURI(orderString)}&app_absent=0`)
    }

    return (
        <section className='flex flex-col justify-start items-center w-full gap-4 pt-5 text-sm'>
            <div className='w-full grid grid-cols-[1.5fr,0.5fr,0.5fr,0.5fr] pr-3'>
                <div></div>
                <div className='flex justify-end border-b-1'>P/U</div>
                <div className='flex justify-end border-b-1'>Cant.</div>
                <div className='flex justify-end border-b-1'>Total</div>
            </div>
            <div className='w-full max-h-[400px] pr-3 overflow-y-scroll'>
                {
                    cart.map((it, i) => (
                        <div key={i} className='grid grid-cols-[1.5fr,0.5fr,0.5fr,0.5fr] border-b-[1px]'>
                            <span>
                                {it.label}
                            </span>
                            <span className='flex justify-end'>
                                ${it.price}
                            </span>
                            <span className='flex justify-end'>
                                {it.quantity}
                            </span>
                            <span className='flex justify-end'>
                                ${it.price * it.quantity}
                            </span>
                        </div>
                    ))
                }
            </div>
            <div className='flex items-center justify-between w-full border-b-2 pr-3'>
                <span>Total:</span>
                <span>
                    ${cart.reduce((acc, curV) => acc + (curV.price * curV.quantity), 0)}
                </span>
            </div>
            <div className='flex flex-col gap-4 w-full text-sm'>
                <div className='flex w-full justify-between'>
                    <span>Enviale el detalle al comercio por Whatsapp:</span>
                    <button onClick={() => handleSendOrder('whatsapp')}>
                        <IconBrandWhatsapp size={18} className='cursor-pointer hover:scale-110' />
                    </button>
                </div>
                <div className='flex w-full justify-between'>
                    <span>O copia el detalle y enviaselo por otro medio</span>
                    <button onClick={() => handleSendOrder('copy')}>
                        {
                            isCopy ? <IconCopyCheck size={18} className='cursor-pointer hover:scale-110' /> :
                                <IconCopy size={18} className='cursor-pointer hover:scale-110' />
                        }
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Checkout