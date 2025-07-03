import React from 'react'
import { IconMinus, IconPlus, IconShoppingCartPlus } from '@tabler/icons-react'
import { useDataStore } from '@/providers/data-store-providers'
import { Doc } from '../../convex/_generated/dataModel'
import CarrouselWrapped from './carrousel-wrapped'
import useSentEvent from '@/hooks/use-sent-events'
import { useSearchParams } from 'next/navigation'

const Combo = ({ template }: { template: Doc<"templates"> }) => {
    const searchParams = useSearchParams()
    const combo = `combo ${searchParams.get('combo')}`
    const { cart, handleOnChangeCart, handleOnChangeCartQuantity } = useDataStore(state => state)
    const { sentEvent } = useSentEvent()
    const { description, price, title, imgUrl, id } = template.combos.find((c => c.id === combo))!
    const cartItem = cart.find(i => i.category === combo)

    const handleBuyItem = ({ price, label, quantity, category, id }: { price: number, label: string, quantity: number, category: string, id: string }) => {
        handleOnChangeCart({ price, label, quantity, category, id })
        sentEvent('combo_cart_item_added', {
            type: 'combo_item',
            label,
            price,
            category,
            img: imgUrl[0].url,
        })
    }

    return (
        <section
            className='flex flex-col justify-center w-full gap-4 py-5 box-content'
        >
            <div className='flex flex-1 justify-center items-center h-full bg-slate-900 rounded-sm border'>
                {
                    imgUrl[0].url ?
                        <CarrouselWrapped data={imgUrl} /> :
                        <span className='text-slate-50'>Aqui veras las imagenes que agregues</span>
                }
            </div>
            <div className='flex flex-1 flex-col p-2 gap-4'>
                <div className='h-6 border-b-[1px]'>
                    {title || 'Titulo'}
                </div>
                <div className='h-[100px] border-[1px] rounded-sm p-1'>
                    {description || 'Descripcion'}
                </div>
                <div className='flex w-full'>
                    <div className='flex flex-1 justify-start border-b-[1px] gap-4'>
                        <span>$</span>
                        <span>{price || '-'}</span>
                    </div>
                    <div className='flex flex-[2] justify-end items-center'>
                        {
                            cartItem ?
                                <>
                                    <IconMinus size={18} className='cursor-pointer transition-all hover:scale-110' onClick={() => handleOnChangeCartQuantity(cartItem, 'decrease')} />
                                    <span
                                        className='h-full px-1'
                                    >
                                        {cartItem.quantity}
                                    </span>
                                    <IconPlus size={18} className='cursor-pointer transition-all hover:scale-110' onClick={() => handleOnChangeCartQuantity(cartItem, 'increase')} />
                                </> :
                                <IconShoppingCartPlus
                                    size={18}
                                    className='cursor-pointer hover:scale-110'
                                    onClick={() => handleBuyItem({ price: Number(price), label: title, quantity: 1, category: combo, id })}
                                />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Combo