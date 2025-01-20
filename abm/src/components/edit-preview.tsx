import React from 'react'
import { DirectionAwareHover } from './ui/direction-aware-hover'
import { TableCell, TableRow } from './ui/table'
import { useDataStore } from '@/providers/data-store-providers'
import { DataTable } from './custom-table'
import { Row } from '@tanstack/react-table'
import { Sections } from '@/stores/data-store'
import { IconMinus, IconPhotoScan, IconPlus, IconShoppingCartPlus } from '@tabler/icons-react'
import { Input } from './ui/input'
import { columns } from './table/columns'
import Image from 'next/image'

const EditPreview = () => {
    const { layout, sections, header, cart, handleOnChangeCart, handleOnChangeCartQuantity } = useDataStore(state => state)

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
                    <TableRow key={i}>
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
                                        /> : <span><IconPhotoScan size={18} /></span>
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
                                            <IconMinus size={22} className='cursor-pointer hover:scale-110' onClick={() => handleOnChangeCartQuantity(cartItem, 'decrease')} />
                                            <Input
                                                className='h-full w-6 p-0 cursor-default text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                type='number'
                                                value={cartItem?.quantity}
                                                readOnly
                                            />
                                            <IconPlus size={22} className='cursor-pointer hover:scale-110' onClick={() => handleOnChangeCartQuantity(cartItem, 'increase')} />
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
        <div className='flex flex-col w-full h-full justify-start p-4 gap-4'        >
            <div className='h-20 flex justify-center items-center rounded-sm relative'>
                <DirectionAwareHover imageUrl={header.imgUrl}>
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