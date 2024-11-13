import React, { useRef } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Input } from "@/components/ui/input"
import { IconCurrencyDollar, IconEdit, IconTrash, IconUpload } from '@tabler/icons-react'
import { useDataStore } from '@/providers/data-store-providers'
import { useMutation } from 'convex/react'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { api } from '../../convex/_generated/api'

const MenuTemplate = () => {
    const { sections, header, addItem, addSection, deleteItem, deleteSection, handleOnChangeItems, handleOnChangeSections, handleOnChangeHeader, deleteImgHeader } = useDataStore(state => state)
    const imageRefHeader = useRef<HTMLInputElement>(null);
    const refContainer = useRef<HTMLInputElement>(null);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const deleteUrl = useMutation(api.templates.deleteUrl);
    const { startUpload } = useUploadFiles(generateUploadUrl)
    const getImageUrl = useMutation(api.templates.getUrl);

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>, section?: string, item?: number) => {
        e.preventDefault();
        const { files, name, value } = e.target
        if (!files || !files?.length) return;

        try {
            const file = files[0];
            // formatBytes(file.size)
            const reader = new FileReader();
            reader.addEventListener("load", async () => {
                if (name === 'imgUrl') handleOnChangeHeader(e, reader.result as string)
                if (name === 'itemImage') handleOnChangeItems(e, section!, item!, reader.result as string)
                const uploaded = await startUpload([file]);
                const storageId = (uploaded[0].response as any).storageId;
                const imageUrl = await getImageUrl({ storageId });
                if (name === 'imgUrl') handleOnChangeHeader(e, imageUrl!)
                if (name === 'itemImage') handleOnChangeItems(e, section!, item!, imageUrl!)
            });
            reader.readAsDataURL(file);
        } catch (error) {
            console.log(error)
            //   toast({ title: 'Error uploading image', variant: 'destructive'})
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

    // const deleteImg = (type: string, pos: number) => {
    //     if (type === 'header') deleteImgHeader()
    //     if (type === 'item') deleteImgHeader()
    //     deleteUrl({ storageId: imgUrl[pos].storageId as Id<"_storage"> })
    // }

    return (
        <section className='flex flex-col w-full h-full justify-start p-4 gap-2'>
            <div className='h-32 flex flex-col justify-around rounded-sm border p-4'>
                <div className='w-full flex justify-between'>
                    <span>Imagen de cabecera: </span>
                    <div className='flex gap-1'>
                        {
                            header.imgUrl ?
                                <>
                                    <span
                                        className='cursor-pointer hover:scale-110 flex justify-center items-center'
                                        onClick={() => deleteImgHeader()}
                                    >
                                        <IconTrash size={18} className='text-red-500' />
                                    </span>
                                    <span
                                        className='cursor-pointer hover:scale-110 flex justify-center items-center'
                                        onClick={() => imageRefHeader?.current?.click()}
                                    >
                                        <IconEdit size={18} className='text-gray-500' />
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
                            className='h-6 hidden'
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
                                        <span className='cursor-pointer hover:scale-110' onClick={() => deleteSection(s.name)}>
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
                                                        className='h-6 hidden'
                                                        onChange={(e) => uploadImage(e, s.name, i)}
                                                        name='itemImage'
                                                        type='file' />
                                                    <div className='flex justify-end gap-1'>
                                                        <span
                                                            className='cursor-pointer hover:scale-110 flex justify-center items-center'
                                                            onClick={() => {
                                                                const el = refContainer.current?.childNodes[i].childNodes[2] as HTMLElement
                                                                el.click()
                                                            }}
                                                        >
                                                            {
                                                                it.itemImage ?
                                                                    <IconEdit size={18} className='text-gray-500' /> :
                                                                    <IconUpload size={18} className='text-gray-500' />
                                                            }
                                                        </span>
                                                        <span
                                                            className='cursor-pointer hover:scale-110 flex justify-center items-center'
                                                            onClick={() => deleteItem(s.name, i)}
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