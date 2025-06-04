import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Input } from "@/components/ui/input"
import { IconCurrencyDollar, IconTrash } from '@tabler/icons-react'
import { useDataStore } from '@/providers/data-store-providers'
import useUploadFile from '@/hooks/use-upload-file'
import { Id } from '../../convex/_generated/dataModel'
import UpdateAssetTool from './update-img-tool'
import { useToast } from '@/hooks/use-toast'
import { Items } from '@/stores/data-store'

const MenuTemplate = () => {
    const { sections, header, addItem, addSection, deleteItem, deleteSection, handleOnChangeItems, handleOnChangeSections, handleOnChangeHeader, deleteImgHeader, handleOnChangeImgHeader, handleOnChangeImgItems, deleteImgItem } = useDataStore(state => state)
    const { isUploading, isSuccess, files, onAccept, getLocalUrls, uploadFileCloudinary, deleteFileCloudinary, bulkDeleteFilesCloudinary } = useUploadFile()
    const { toast } = useToast()

    const uploadImage = async (file: File, type: string, _storageId?: Id<"_storage">, section?: string, item?: number) => {
        try {
            if (_storageId) {
                await deleteImg(type, _storageId, section, item)
            }
            const { url, storageId } = await uploadFileCloudinary(file)
            if (type === 'header') handleOnChangeImgHeader(url, storageId)
            if (type === 'itemImage') handleOnChangeImgItems(url, storageId, section!, item!)
        } catch (error) {
            const err = error as Error
            toast({
                title: "Error al subir",
                description: err.message,
                variant: 'destructive',
                duration: 5000,
            })
            console.log(error)
        }
    }

    // const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>, section?: string, item?: number) => {
    //     e.preventDefault();
    //     const { files, name } = e.target
    //     if (!files || !files?.length) return;

    //     try {
    //         const file = files[0];
    //         const reader = new FileReader();
    //         checkAsset(file)
    //         reader.addEventListener("load", async () => {
    //             if (name === 'imgUrl') handleOnChangeHeader(e, reader.result as string)
    //             if (name === 'itemImage') handleOnChangeItems(e, section!, item!, reader.result as string)
    //             // const { url, storageId } = await uploadFile(file)
    //             // if (name === 'imgUrl') handleOnChangeHeader(e, '', url!, storageId)
    //             // if (name === 'itemImage') handleOnChangeItems(e, section!, item!, '', url!, storageId)
    //         });
    //         reader.readAsDataURL(file);
    //     } catch (error) {
    //         const err = error as Error
    //         toast({
    //             title: "Error al subir",
    //             description: err.message,
    //             variant: 'destructive',
    //             duration: 5000,
    //         })
    //         console.log(error)
    //     }
    // }

    const deleteImg = async (type: string, storageId: Id<"_storage">, section?: string, item?: number) => {
        if (type === 'header') {
            deleteImgHeader()
        } else {
            deleteImgItem(section!, item!)
        }
        await deleteFileCloudinary(storageId, 'image')
    }

    const onDeleteItem = async (item: Items, section: string, itemPos: number) => {
        const { itemImage: { storageId } } = item
        if (storageId) await deleteImg('itemImage', storageId as Id<"_storage">, section, itemPos)
        deleteItem(section, itemPos)
    }

    const _deleteSection = (section: string) => {
        const storageIds = sections.find(s => s.name === section)?.items.filter(it => it.itemImage.storageId).map(it => it.itemImage.storageId)
        const dataToDelete = Array.from(storageIds!, (sId, _i) => ({ publicId: sId, resourceType: 'image' }))
        if (storageIds?.length) bulkDeleteFilesCloudinary(dataToDelete)
        deleteSection(section)
    }

    return (
        <section className='flex flex-col w-full h-full justify-start p-4 gap-2'>
            <div className='h-32 flex flex-col justify-around rounded-sm border p-4'>
                <div className='w-full flex justify-between'>
                    <div className='flex flex-col text-sm md:text-medium'>
                        <span>Imagen de cabecera: </span>
                    </div>
                    <UpdateAssetTool
                        isAsset={header.imgUrl.uploadImgUrl}
                        deleteAsset={() => deleteImg('header', header.imgUrl.storageId as Id<"_storage">)}
                        onChangeFiles={getLocalUrls}
                        onAccept={() => onAccept((file) => uploadImage(file, 'header', header.imgUrl.storageId as Id<"_storage">))}
                        isUploading={isUploading}
                        isSuccess={isSuccess}
                        dropzoneOptions={{
                            accept: {
                                'image/jpeg': [],
                                'image/png': []
                            },
                            maxFiles: 1,
                            disabled: files.length === 1,
                        }}
                        modalTexts={{
                            description: 'Formato: jpg, jpeg, png / Max: 25 MB / Max: 1'
                        }}
                    />
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
            <div className="w-full h-full overflow-scroll sm:p-4">
                <button
                    className='bg-slate-400 p-2 rounded-sm text-slate-100 hover:text-black w-40'
                    onClick={addSection}
                >
                    Añadir categoria
                </button>
                <div className='flex flex-col gap-1 mt-5'>
                    {sections.map((s, i) => (
                        <Accordion key={s.name}
                            type="multiple"
                            className='hover:bg-slate-200 rounded-sm p-1'
                        >
                            <AccordionItem value={`item-${i}`}>
                                <div className='flex justify-between items-center h-8 py-2 box-content'>
                                    <Input
                                        className='w-[40%] h-full text-sm sm:text-medium'
                                        name={`section ${i + 1}`}
                                        value={s.label}
                                        onChange={handleOnChangeSections}
                                        placeholder='Categoria' />
                                    <div className='flex justify-center items-center gap-2'>
                                        <AccordionTrigger className='hover:text-gray-500' />
                                        <span
                                            className='cursor-pointer transition-all hover:scale-110'
                                            onClick={() => _deleteSection(s.name)}
                                        >
                                            <IconTrash className='text-red-500 size-[18px]' />
                                        </span>
                                        <div className='cursor-pointer hover:text-gray-500 text-sm sm:text-medium' onClick={() => addItem(s.name)}>
                                            Añadir item
                                        </div>
                                    </div>
                                </div>
                                <AccordionContent className='pt-4'>
                                    <div className='flex flex-col gap-3 justify-start'>
                                        {s?.items &&
                                            s?.items?.map((it, i) => (
                                                <div key={`${s.name}${i}`} className='justify-center items-center flex flex-col ml-1 gap-1'>
                                                    <div className='flex gap-1'>
                                                        <Input
                                                            className='h-6 text-sm'
                                                            name={`name`}
                                                            value={it.name}
                                                            onChange={(e) => handleOnChangeItems(e, s.name, i)}
                                                            placeholder='Nombre'
                                                        />
                                                        <div className='flex justify-center items-center'>
                                                            <IconCurrencyDollar />
                                                            <Input
                                                                className='h-6 text-sm'
                                                                name={`price`}
                                                                value={it.price || ''}
                                                                onChange={(e) => handleOnChangeItems(e, s.name, i)}
                                                                placeholder='Precio'
                                                                type='number' />
                                                        </div>
                                                        <span
                                                            className='cursor-pointer transition-all hover:scale-110 flex justify-center items-center'
                                                            onClick={() => onDeleteItem(it, s.name, i)}
                                                        >
                                                            <IconTrash className='text-red-500 size-[18px]' />
                                                        </span>
                                                    </div>
                                                    <div className='flex w-full justify-between px-1 bg-slate-50 rounded-b'>
                                                        <span>
                                                            Imagen:
                                                        </span>
                                                        <UpdateAssetTool
                                                            isAsset={it.itemImage.uploadImgUrl}
                                                            deleteAsset={() => deleteImg('itemImage', it.itemImage.storageId as Id<"_storage">, s.name, i)}
                                                            onChangeFiles={getLocalUrls}
                                                            onAccept={() => onAccept((file) => uploadImage(file, 'itemImage', it.itemImage.storageId as Id<"_storage">, s.name, i,))}
                                                            isUploading={isUploading}
                                                            isSuccess={isSuccess}
                                                            dropzoneOptions={{
                                                                accept: {
                                                                    'image/jpeg': [],
                                                                    'image/png': []
                                                                },
                                                                maxFiles: 1,
                                                                disabled: files.length === 1,
                                                            }}
                                                            modalTexts={{
                                                                description: 'Formato: jpg, jpeg, png / Max: 25 MB / Max: 1'
                                                            }}
                                                        />
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