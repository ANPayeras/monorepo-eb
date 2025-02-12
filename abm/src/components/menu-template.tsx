import React, { useRef } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Input } from "@/components/ui/input"
import { IconCurrencyDollar, IconEdit, IconTrash, IconUpload } from '@tabler/icons-react'
import { useDataStore } from '@/providers/data-store-providers'
import useUploadFile from '@/hooks/use-upload-file'
import { Id } from '../../convex/_generated/dataModel'

const MenuTemplate = () => {
    const { sections, header, addItem, addSection, deleteItem, deleteSection, handleOnChangeItems, handleOnChangeSections, handleOnChangeHeader, deleteImgHeader } = useDataStore(state => state)
    const imageRefHeader = useRef<HTMLInputElement>(null);
    const refContainer = useRef<HTMLInputElement>(null);
    const { uploadFile, deleteFile, bulkDeleteFiles } = useUploadFile()

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>, section?: string, item?: number) => {
        e.preventDefault();
        const { files, name } = e.target
        if (!files || !files?.length) return;

        try {
            const file = files[0];
            // formatBytes(file.size)
            const reader = new FileReader();
            reader.addEventListener("load", async () => {
                if (name === 'imgUrl') handleOnChangeHeader(e, reader.result as string)
                if (name === 'itemImage') handleOnChangeItems(e, section!, item!, reader.result as string)
                const { url, storageId } = await uploadFile(file)
                if (name === 'imgUrl') handleOnChangeHeader(e, '', url!, storageId)
                if (name === 'itemImage') handleOnChangeItems(e, section!, item!, '', url!, storageId)
            });
            reader.readAsDataURL(file);
        } catch (error) {
            console.log(error)
        }
    }

    // const formatBytes = (bytes: number, decimals = 2) => {
    //     if (!+bytes) return '0 Bytes'

    //     const k = 1000
    //     const dm = decimals < 0 ? 0 : decimals
    //     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    //     const i = Math.floor(Math.log(bytes) / Math.log(k))

    //     return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    // }

    const deleteImg = (type: string, storageId?: Id<"_storage">) => {
        if (type === 'header') deleteImgHeader()
        imageRefHeader.current!.value = ''
        storageId && deleteFile(storageId)
    }

    const _deleteSection = (section: string) => {
        const storageIds = sections.find(s => s.name === section)?.items.filter(it => it.itemImage.storageId).map(it => it.itemImage.storageId)
        if (storageIds?.length) bulkDeleteFiles(storageIds as Id<"_storage">[])
        deleteSection(section)
    }

    return (
        <section className='flex flex-col w-full h-full justify-start p-4 gap-2'>
            <div className='h-32 flex flex-col justify-around rounded-sm border p-4'>
                <div className='w-full flex justify-between'>
                    <span>Imagen de cabecera: </span>
                    <div className='flex gap-1'>
                        {
                            header.imgUrl?.localImg || header.imgUrl.uploadImgUrl ?
                                <>
                                    <span
                                        className='cursor-pointer hover:scale-110 flex justify-center items-center'
                                        onClick={() => imageRefHeader?.current?.click()}
                                    >
                                        <IconEdit size={18} className='text-gray-500' />
                                    </span>
                                    <span
                                        className='cursor-pointer hover:scale-110 flex justify-center items-center'
                                        onClick={() => deleteImg('header', header.imgUrl.storageId as Id<"_storage">)}
                                    >
                                        <IconTrash size={18} className='text-red-500' />
                                    </span>
                                </>
                                :
                                <span
                                    className='cursor-pointer hover:scale-110 flex justify-center items-center'
                                    onClick={() => imageRefHeader?.current?.click()}
                                >
                                    <IconUpload size={18} className='text-gray-500' />
                                </span>
                        }
                        <Input
                            className='hidden'
                            ref={imageRefHeader}
                            onChange={(e) => uploadImage(e)}
                            name='imgUrl'
                            type='file' />
                    </div>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span>Texto de cabecera: </span>
                    <Input
                        className='h-6 w-[40%]'
                        name='title'
                        value={header.title}
                        onChange={(e) => handleOnChangeHeader(e)}
                        placeholder='Titulo'
                    />
                </div>
            </div>
            <div className="w-full h-full overflow-scroll p-4">
                <button
                    className='bg-slate-400 p-2 rounded-sm text-slate-100 hover:text-black w-40'
                    onClick={addSection}
                >
                    Añadir categoria
                </button>
                <div className='flex flex-col gap-1 mt-5'>
                    {sections.map((s, i) => (
                        <Accordion key={s.name} type="multiple" className='hover:bg-slate-200 rounded-sm p-1'>
                            <AccordionItem value={`item-${i}`}>
                                <div className='flex justify-between items-center h-8 py-2 box-content'>
                                    <Input
                                        className='w-[40%] h-full'
                                        name={`section ${i + 1}`}
                                        value={s.label}
                                        onChange={handleOnChangeSections}
                                        placeholder='Categoria' />
                                    <div className='flex justify-center items-center gap-2'>
                                        <AccordionTrigger className='hover:text-gray-500' />
                                        <span className='cursor-pointer hover:scale-110' onClick={() => _deleteSection(s.name)}>
                                            <IconTrash size={18} className='text-red-500' />
                                        </span>
                                        <div className='cursor-pointer hover:text-gray-500' onClick={() => addItem(s.name)}>
                                            Añadir item
                                        </div>
                                    </div>
                                </div>
                                <AccordionContent>
                                    <div ref={refContainer}>
                                        {s?.items &&
                                            s?.items?.map((it, i) => (
                                                <div key={`${s.name}${i}`} className='h-8 justify-center items-center grid grid-cols-[1fr,1fr,1fr,0fr] ml-1 gap-1'>
                                                    <Input
                                                        className='h-6'
                                                        name={`name`}
                                                        value={it.name}
                                                        onChange={(e) => handleOnChangeItems(e, s.name, i)}
                                                        placeholder='Nombre' />
                                                    <div className='flex justify-center items-center'>
                                                        <IconCurrencyDollar />
                                                        <Input
                                                            className='h-6'
                                                            name={`price`}
                                                            value={it.price || ''}
                                                            onChange={(e) => handleOnChangeItems(e, s.name, i)}
                                                            placeholder='Precio'
                                                            type='number' />
                                                    </div>
                                                    <Input
                                                        className='hidden'
                                                        onChange={(e) => uploadImage(e, s.name, i)}
                                                        name='itemImage'
                                                        type='file' />
                                                    <div className='flex justify-end gap-1'>
                                                        <span
                                                            className='cursor-pointer hover:scale-110 flex justify-center items-center'
                                                            onClick={() => {
                                                                const el = refContainer.current?.childNodes[i].childNodes[2] as HTMLInputElement
                                                                el.click()
                                                            }}
                                                        >
                                                            {
                                                                it.itemImage?.localImg || it.itemImage.uploadImgUrl ?
                                                                    <IconEdit size={18} className='text-gray-500' /> :
                                                                    <IconUpload size={18} className='text-gray-500' />
                                                            }
                                                        </span>
                                                        <span
                                                            className='cursor-pointer hover:scale-110 flex justify-center items-center'
                                                            onClick={() => {
                                                                const el = refContainer.current?.childNodes[i].childNodes[2] as HTMLInputElement
                                                                el.value = ''
                                                                deleteImg('item', it.itemImage.storageId as Id<"_storage">)
                                                                deleteItem(s.name, i)
                                                            }}
                                                        >
                                                            <IconTrash size={18} className='text-red-500' />
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MenuTemplate