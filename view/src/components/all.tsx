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
import { BlurImage } from './blur-image'

const All = ({ template }: { template: Doc<"templates"> }) => {
    const { cart, handleOnChangeCart, handleOnChangeCartQuantity } = useDataStore(state => state)
    const renderSubComponent = ({ row }: { row: Row<Sections> }) => {
        const columns = row.getVisibleCells().map(e => e.column.columnDef.size)
        const style = {
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        }

        return (
            row.original.items.map((it, i) => {
                const cartItem = cart.find(i => i.label === it.name && i.category === row.original.name)
                return (
                    <TableRow key={i} className='text-slate-50'>
                        <TableCell {...{ style: { minWidth: columns[0], maxWidth: columns[0], ...style } }}>
                            <div className='flex items-center justify-start gap-1'>
                                {
                                    it.itemImage ?
                                        <Image
                                            className='h-[25px] w-[25px] object-contain'
                                            src={it.itemImage}
                                            alt={''}
                                            width={100}
                                            height={100}
                                        /> : <IconPhotoScan size={18} />
                                }
                                <span className='w-full overflow-hidden text-wrap'>
                                    {it.name || 'Nombre item'}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell {...{ style: { minWidth: columns[1], maxWidth: columns[1], ...style } }}>${it.price || '-'}</TableCell>
                        <TableCell {...{ style: { minWidth: columns[2], maxWidth: columns[2] } }} className='pl-0'>
                            <div className='flex justify-end items-center gap-1'>
                                {
                                    cartItem ?
                                        <>
                                            <IconPlus size={22} className='cursor-pointer hover:scale-110'
                                                onClick={() => handleOnChangeCartQuantity(cartItem, 'increase')}
                                            />
                                            <span
                                                className='px-1'
                                            >
                                                {cartItem.quantity}
                                            </span>
                                            <IconMinus size={22} className='cursor-pointer hover:scale-110'
                                                onClick={() => handleOnChangeCartQuantity(cartItem, 'decrease')}
                                            />
                                        </> :
                                        <IconShoppingCartPlus
                                            size={18}
                                            className='cursor-pointer hover:scale-110'
                                            onClick={() => handleOnChangeCart({ price: Number(it.price), label: it.name || `Item ${i + 1}`, quantity: 1, category: row.original.name })}
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
            <div className='h-20 flex justify-center items-center rounded-lg relative overflow-hidden'>
                <div className="h-full w-full relative bg-gray-900">
                    <BlurImage
                        alt='header-img'
                        width='100'
                        height='100'
                        className='h-full w-full object-cover hover:scale-110 transition-all'
                        src={template.header.imgUrl}
                    />
                    <p className="font-bold text-xl text-white absolute bottom-4 left-4 z-40">{template.header.title}</p>
                </div>
            </div>
            <div className='rounded-sm overflow-scroll h-full'>
                <DataTable
                    columns={columns}
                    data={[...template.sections]}
                    getRowCanExpand={() => true}
                    renderSubComponent={renderSubComponent}
                />
            </div>
        </div>
    )
}

export default All