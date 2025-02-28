import React, { useRef } from 'react'
import { IconEdit, IconTrash, IconUpload } from '@tabler/icons-react'
import { Input } from './ui/input'
import useUploadFile from '@/hooks/use-upload-file';
import { useDataStore } from '@/providers/data-store-providers';
import { Id } from '../../convex/_generated/dataModel';

const ChangeBgImgFeature = () => {
    const { layout: { backgroundImg }, handleOnChangeBgLayoutImg, deleteBgLayoutImg } = useDataStore(state => state)
    const imageRef = useRef<HTMLInputElement>(null);
    const { uploadFile, deleteFile } = useUploadFile()

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.target
        if (!files || !files?.length) return;

        try {
            const file = files[0];
            const reader = new FileReader();
            reader.addEventListener("load", async () => {
                handleOnChangeBgLayoutImg(reader.result as string)
                const data = await uploadFile(file)
                handleOnChangeBgLayoutImg('', data.url!, data.storageId)
            });
            reader.readAsDataURL(file);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteImg = () => {
        deleteFile(backgroundImg.storageId as Id<"_storage">)
        imageRef.current!.value = ''
        deleteBgLayoutImg()
    }

    const isImage = backgroundImg?.localImg || backgroundImg?.uploadImgUrl
    return (
        <div className='flex justify-between items-center'>
            <div className='flex gap-4'>
                <span>Imagen de Fondo:</span>
            </div>
            <div className='flex gap-2'>
                <span
                    className='cursor-pointer transition-all hover:scale-110 flex justify-center items-center'
                    onClick={() => imageRef.current?.click()}
                >
                    {
                        isImage ?
                            <IconEdit size={18} className='text-gray-500' /> :
                            <IconUpload size={18} className='text-gray-500' />
                    }
                </span>
                {
                    isImage &&
                    <span
                        className='cursor-pointer transition-all hover:scale-110 flex justify-center items-center'
                        onClick={deleteImg}
                    >
                        <IconTrash size={18} className='text-red-500' />
                    </span>
                }
            </div>
            <Input
                className='hidden'
                ref={imageRef}
                onChange={(e) => uploadImage(e)}
                name='layoutBgImg'
                type='file' />
        </div>
    )
}

export default ChangeBgImgFeature