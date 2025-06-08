import React from 'react'
import { Row } from '@tanstack/react-table'
import { IconMinus, IconPhotoScan, IconPlus, IconShoppingCartPlus } from '@tabler/icons-react'
import Image from 'next/image'
import { Sections } from '@/types'
import { TableCell, TableRow } from './ui/table'
import { columns } from './table/columns'
import { DataTable } from './custom-table'
import { useDataStore } from '@/providers/data-store-providers'
import { Doc } from '../../convex/_generated/dataModel'
import useSentEvent from '@/hooks/use-sent-events'
import { DirectionAwareHover } from './ui/direction-aware-hover'

const All = ({ template }: { template: Doc<"templates"> }) => {
    const { cart, handleOnChangeCart, handleOnChangeCartQuantity } = useDataStore(state => state)
    const { sentEvent } = useSentEvent()

    const handleBuyItem = ({ price, label, quantity, category, id }: { price: number, label: string, quantity: number, category: string, id: string }) => {
        handleOnChangeCart({ price, label, quantity, category, id })
        sentEvent('section_cart_item_added', {
            type: 'section_item',
            label,
            price,
            category,
        })
    }

    const renderSubComponent = ({ row }: { row: Row<Sections> }) => {
        const columns = row.getVisibleCells().map(e => e.column.columnDef.size)
        const style = {
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        }

        return (
            row.original.items.map((it, i) => {
                const cartItem = cart.find(i => i.label === it.name && i.category === row.original.name)
                const img = it.itemImage.uploadImgUrl
                return (
                    <TableRow key={i}>
                        <TableCell
                            {...{ style: { minWidth: columns[0], maxWidth: columns[0], ...style, wordBreak: 'break-word' } }}
                            className='px-0 sm:px-4'
                        >
                            <div className='flex items-center justify-start gap-2 h-20'>
                                {
                                    img ?
                                        <Image
                                            className='object-cover h-full'
                                            src={img}
                                            alt={'item-image'}
                                            width={100}
                                            height={100}
                                        /> : <span><IconPhotoScan size={30} /></span>
                                }
                                <div className='flex flex-col h-full justify-between gap-1'>
                                    <span className='w-full overflow-scroll text-wrap text-xs sm:text-sm'>
                                        {it.name || 'Nombre item'}
                                    </span>
                                    <span className='text-slate-400 text-xs sm:text-sm'>
                                        $ {it.price || '-'}
                                    </span>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell {...{ style: { minWidth: columns[2], maxWidth: columns[2] } }} className='max-w-[20px] px-0 sm:px-4 overflow-hidden'>
                            <div className='flex justify-end items-center gap-1'>
                                {
                                    cartItem ?
                                        <>
                                            <IconMinus size={20} className='transition-all cursor-pointer hover:scale-110' onClick={() => handleOnChangeCartQuantity(cartItem, 'decrease')} />
                                            <div className='select-none'>
                                                {cartItem?.quantity}
                                            </div>
                                            <IconPlus size={20} className='transition-all cursor-pointer hover:scale-110' onClick={() => handleOnChangeCartQuantity(cartItem, 'increase')} />
                                        </>
                                        :
                                        <IconShoppingCartPlus
                                            size={18}
                                            className='transition-all cursor-pointer hover:scale-110'
                                            onClick={() => handleBuyItem({ price: Number(it.price), label: it.name || `Item ${i + 1}`, quantity: 1, category: row.original.name, id: it.id })}
                                        />
                                }
                            </div>
                        </TableCell>
                    </TableRow>
                )
            })
        )
    }

    return (
        <div className='flex flex-col w-full h-full justify-start gap-4 py-5'>
            <div className='min-h-20 h-20 flex justify-center items-center rounded-lg relative overflow-hidden'>
                <div className="h-full w-full relative bg-gray-900">
                    <DirectionAwareHover imageUrl={template.header.imgUrl.uploadImgUrl}>
                        <p className="font-bold text-xl">{template.header.title}</p>
                    </DirectionAwareHover>
                </div>
            </div>
            {
                template.sections.length ?
                    <div className='rounded-sm overflow-scroll h-full'>
                        <DataTable
                            columns={columns}
                            data={[...template.sections]}
                            getRowCanExpand={() => true}
                            renderSubComponent={renderSubComponent}
                            style={{
                                color: template.layout.textsColor,
                            }}
                        />
                    </div> :
                    <div className='text-center text-black font-bold mt-5'>
                        No existen items para mostrar
                    </div>
            }
        </div>
    )
}

export default All