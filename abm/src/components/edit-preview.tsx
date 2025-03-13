import React from 'react'
import { DirectionAwareHover } from './ui/direction-aware-hover'
import { TableCell, TableRow } from './ui/table'
import { useDataStore } from '@/providers/data-store-providers'
import { DataTable } from './custom-table'
import { Row } from '@tanstack/react-table'
import { Sections } from '@/stores/data-store'
import { IconMinus, IconPhotoScan, IconPlus, IconShoppingCartPlus } from '@tabler/icons-react'
import { columns } from './table/columns'
import Image from 'next/image'

const EditPreview = () => {
    const { sections, header, cart, handleOnChangeCart, handleOnChangeCartQuantity } = useDataStore(state => state)

    const renderSubComponent = ({ row }: { row: Row<Sections> }) => {
        const columns = row.getVisibleCells().map(e => e.column.columnDef.size)
        const style = {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        }

        return (
            row.original.items.map((it, i) => {
                const cartItem = cart.find(i => i.id === it.id)
                const img = it.itemImage?.localImg || it.itemImage?.uploadImgUrl
                return (
                    <TableRow key={i}>
                        <TableCell
                            {...{ style: { minWidth: columns[0], maxWidth: columns[0], ...style, wordBreak: 'break-word' } }}
                            className='px-0'
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
                                    <span className='text-xs sm:text-sm w-full overflow-scroll text-wrap'>
                                        {it.name || 'Nombre item'}
                                    </span>
                                    <span className='text-slate-400 text-xs sm:text-sm '>
                                        $ {it.price || '-'}
                                    </span>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell {...{ style: { minWidth: columns[2], maxWidth: columns[2] } }} className='px-0 min-w-[40px] max-w-[40px] overflow-hidden'>
                            <div className='flex justify-end items-center gap-1'>
                                {
                                    cartItem ?
                                        <>
                                            <IconMinus size={18} className='transition-all cursor-pointer hover:scale-110' onClick={() => handleOnChangeCartQuantity(cartItem, 'decrease')} />
                                            <div className='select-none'>
                                                {cartItem?.quantity}
                                            </div>
                                            <IconPlus size={18} className='transition-all cursor-pointer hover:scale-110' onClick={() => handleOnChangeCartQuantity(cartItem, 'increase')} />
                                        </> :
                                        <IconShoppingCartPlus
                                            size={18}
                                            className='transition-all cursor-pointer hover:scale-110'
                                            onClick={() => handleOnChangeCart({ price: Number(it.price), label: it.name || `Item ${i + 1}`, quantity: 1, category: row.original.name, id: it.id })}
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
        <div className='flex flex-col w-full h-full justify-start p-4 gap-4'        >
            <div className='h-20 flex justify-center items-center rounded-sm relative'>
                <DirectionAwareHover imageUrl={header.imgUrl?.localImg || header.imgUrl.uploadImgUrl}>
                    <p className="font-bold text-xl">{header.title}</p>
                </DirectionAwareHover>
            </div>
            <div className='rounded-sm overflow-scroll h-full'>
                <DataTable
                    columns={columns}
                    data={[...sections]}
                    getRowCanExpand={() => true}
                    renderSubComponent={renderSubComponent}
                />
            </div>
        </div>
    )
}

export default EditPreview