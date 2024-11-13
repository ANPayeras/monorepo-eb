import React, { FC, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useDataStore } from '@/providers/data-store-providers'
import { IconEdit, IconTrash, IconUpload } from '@tabler/icons-react'
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'

const CombosTemplate: FC<{ combo: number }> = ({ combo }) => {
    const { combos, handleOnChangeCombos, deleteImgCombo } = useDataStore(state => state)
    const { description, price, title, imgUrl } = combos[combo]
    const [imgPos, setImgPos] = useState<number>(0)
    const imageRef = useRef<HTMLInputElement>(null);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const deleteUrl = useMutation(api.templates.deleteUrl);
    const { startUpload } = useUploadFiles(generateUploadUrl)
    const getImageUrl = useMutation(api.templates.getUrl);

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.target
        if (!files || !files?.length) return;

        try {
            const file = files[0];
            // formatBytes(file.size)
            const reader = new FileReader();
            reader.addEventListener("load", async () => {
                handleOnChangeCombos(e, combo, reader.result as string, imgPos)
                const uploaded = await startUpload([file]);
                const storageId = (uploaded[0].response as any).storageId;
                const imageUrl = await getImageUrl({ storageId });
                handleOnChangeCombos(e, combo, imageUrl!, imgPos, storageId)
            });
            reader.readAsDataURL(file);
            // const uploaded = await startUpload([file]);
            // const storageId = (uploaded[0].response as any).storageId;
            // const imageUrl = await getImageUrl({ storageId });
            // handleOnChangeCombos(e, combo, imageUrl!, imgPos, storageId)
        } catch (error) {
            console.log(error)
            //   toast({ title: 'Error uploading image', variant: 'destructive'})
        }
    }

    const clickInputFile = (imgPos: number) => {
        setImgPos(imgPos)
        imageRef?.current?.click()
    }

    const deleteImg = (pos: number) => {
        deleteUrl({ storageId: imgUrl[pos].storageId as Id<"_storage"> })
        deleteImgCombo(combo, pos)
    }

    return (
        <section className='flex w-full h-full p-4 gap-1'>
            <div className='flex justify-center h-[40%] w-full'>
                <div className='flex flex-1 flex-col justify-center items-center bg-slate-50 rounded-md m-2 p-2'>
                    <span className='h-1/4 text-center mb-8'>Podes agregar hasta 4 imagenes</span>
                    <div className='flex flex-col h-full w-full gap-4'>
                        {
                            imgUrl.slice(0, 4).map((img, i) => (
                                <div key={i} className='flex justify-between items-center w-full'>
                                    <span>
                                        Imagen {i + 1}
                                    </span>
                                    {
                                        img.url ?
                                            <div className='flex'>
                                                <span
                                                    className='cursor-pointer hover:scale-110 flex justify-center items-center'
                                                    // onClick={() => deleteImgCombo(combo, i)}
                                                    onClick={() => deleteImg(i)}
                                                >
                                                    <IconTrash size={18} className='text-red-500' />
                                                </span>
                                                <span
                                                    className='cursor-pointer hover:scale-110 flex justify-center items-center'
                                                    onClick={() => clickInputFile(i)}
                                                >
                                                    <IconEdit size={18} className='text-gray-500' />
                                                </span>
                                            </div>
                                            :
                                            <span
                                                className='cursor-pointer hover:scale-110 flex justify-center items-center'
                                                onClick={() => clickInputFile(i)}
                                            >
                                                <IconUpload size={18} className='text-gray-500' />
                                            </span>
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <Input
                        className='h-6 hidden'
                        ref={imageRef}
                        onChange={(e) => uploadImage(e)}
                        name='imgUrl'
                        type='file' />
                </div>
                <div className='flex flex-1 flex-col p-2 gap-4'>
                    <div className='flex justify-between'>
                        <Input
                            placeholder='Titulo'
                            className='h-6 w-full'
                            name='title'
                            value={title}
                            onChange={(e) => handleOnChangeCombos(e, combo)}
                            maxLength={30}
                        />
                    </div>
                    <div className='h-auto'>
                        <Textarea
                            placeholder='Descripcion'
                            rows={10}
                            maxLength={150}
                            className='min-h-[200px] max-h-[200px] resize-none'
                            name='description'
                            value={description}
                            onChange={(e) => handleOnChangeCombos(e, combo)}
                        />
                    </div>
                    <div className='flex justify-start gap-4'>
                        <span>$</span>
                        <Input
                            placeholder='Precio'
                            className='h-6 w-[50%]'
                            type='number'
                            name='price'
                            value={price || ''}
                            onChange={(e) => handleOnChangeCombos(e, combo)}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CombosTemplate