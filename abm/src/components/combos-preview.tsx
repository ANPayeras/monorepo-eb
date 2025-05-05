import React, { FC } from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import Image from 'next/image'
import { IconMinus, IconPlus, IconShoppingCartPlus } from '@tabler/icons-react'
import { amountToCurrency } from '@/lib/utils'

const CombosPreview: FC<{ combo: number }> = ({ combo }) => {
    const { combos, layout, cart, handleOnChangeCart, handleOnChangeCartQuantity } = useDataStore(state => state)
    const { description, price, title, id, imgUrl } = combos[combo]
    const cartItem = cart.find(i => i.category === id)
    return (
        <section className='flex justify-center h-full w-full p-4' style={{ color: layout.textsColor }}>
            <div className='flex flex-col w-full h-full gap-4'>
                <div className='flex flex-1 justify-center items-center h-full bg-slate-900 rounded-sm'>
                    {
                        imgUrl[0].url ?
                            <Carousel>
                                <CarouselContent>
                                    {
                                        imgUrl.length > 1 && imgUrl.slice(0, imgUrl.length - 1).map((img, i) => (
                                            <CarouselItem key={i} className='w-full relative h-[400px] flex justify-center items-center'>
                                                <Image
                                                    alt="image"
                                                    className="max-w-full max-h-full"
                                                    width={1000}
                                                    height={1000}
                                                    src={img.url}
                                                />
                                            </CarouselItem>
                                        ))
                                    }
                                </CarouselContent>
                                {
                                    imgUrl[1].url &&
                                    <>
                                        <CarouselPrevious className='left-0' />
                                        <CarouselNext className='right-0' />
                                    </>
                                }
                            </Carousel> :
                            <span className='text-slate-50 text-center'>Aqui veras las imagenes que agregues</span>
                    }

                </div>
                <div className='flex flex-1 flex-col p-2 gap-4'>
                    <div className='h-6 border-b-[1px] relative'>
                        {title || 'Titulo'}
                        <span className='absolute right-0 text-xs text-slate-950'>{title.length}/30</span>
                    </div>
                    <div className='h-[100px] border-[1px] rounded-sm p-1 relative overflow-hidden break-words'>
                        {description || 'Descripcion'}
                        <span className='absolute right-[5px] bottom-0 text-xs text-slate-950'>{description.length}/150</span>
                    </div>
                    <div className='flex w-full'>
                        <div className='flex flex-1 justify-start border-b-[1px] gap-4'>
                            <span>{amountToCurrency(Number(price)) || '-'}</span>
                        </div>
                        <div className='flex flex-[2] justify-end items-center'>
                            {
                                cartItem ?
                                    <>
                                        <IconMinus size={18} className='cursor-pointer hover:scale-110' onClick={() => handleOnChangeCartQuantity(cartItem, 'decrease')} />
                                        <span
                                            className='h-full px-1'
                                        >
                                            {cartItem.quantity}
                                        </span>
                                        <IconPlus size={18} className='cursor-pointer hover:scale-110' onClick={() => handleOnChangeCartQuantity(cartItem, 'increase')} />
                                    </> :
                                    <IconShoppingCartPlus
                                        size={18}
                                        className='cursor-pointer hover:scale-110'
                                        onClick={() => handleOnChangeCart({ price: Number(price), label: title, quantity: 1, category: `combo ${combo + 1}`, id })}
                                    />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CombosPreview