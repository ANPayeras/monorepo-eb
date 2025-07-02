import React from 'react'

import useUploadFile from '@/hooks/use-upload-file';
import { useDataStore } from '@/providers/data-store-providers';
import UpdateAssetTool from './update-img-tool';

const ChangeBgImgFeature = () => {
    const { layout: { backgroundImg }, handleOnChangeBgLayoutImg, deleteBgLayoutImg } = useDataStore(state => state)
    const { getLocalUrls, onAccept, isUploading, isSuccess, files, deleteFileCloudinary, uploadFileCloudinary } = useUploadFile()

    const uploadImage = async (file: File) => {
        try {
            if (backgroundImg.uploadImgUrl) await deleteImg()
            const { url, storageId } = await uploadFileCloudinary(file)
            handleOnChangeBgLayoutImg('', url!, storageId)
        } catch (error) {
            console.log(error)
        }
    }

    // const uploadImage = async (reader: FileReader, file: File) => {
    //     if (backgroundImg.localImg || backgroundImg.uploadImgUrl) {
    //         await deleteImg()
    //     }
    //     // handleOnChangeBgLayoutImg(reader.result as string)
    //     const data = await uploadFile(file)
    //     handleOnChangeBgLayoutImg('', data.url!, data.storageId)
    // }

    const deleteImg = async () => {
        try {
            await deleteFileCloudinary(backgroundImg.storageId, 'image')
            deleteBgLayoutImg()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-between items-center h-8'>
            <div className='flex flex-col text-sm md:text-medium'>
                <span>Imagen de fondo:</span>
            </div>
            <UpdateAssetTool
                isAsset={!!backgroundImg?.uploadImgUrl}
                deleteAsset={deleteImg}
                onChangeFiles={getLocalUrls}
                onAccept={() => onAccept(uploadImage)}
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
    )
}

export default ChangeBgImgFeature