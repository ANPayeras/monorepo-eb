import React from 'react'

import useUploadFile from '@/hooks/use-upload-file';
import { useDataStore } from '@/providers/data-store-providers';
import UpdateAssetTool from '../update-img-tool';

const ChangeBgVideoFeature = () => {
    const { layout: { backgroundVideo }, handleOnChangeBgLayoutVideo, deleteBgLayoutVideo } = useDataStore(state => state)
    const { isUploading, getLocalUrls, onAccept, isSuccess, files, uploadFileCloudinary, deleteFileCloudinary } = useUploadFile()

    const uploadVideo = async (file: File) => {
        if (backgroundVideo.uploadVideoUrl) await deleteVideo()
        const { url, storageId } = await uploadFileCloudinary(file)
        handleOnChangeBgLayoutVideo('', url!, storageId)
    }

    // const uploadVideo = async (reader: FileReader, file: File) => {
    //     if (backgroundVideo.localVideo || backgroundVideo.uploadVideoUrl) {
    //         await deleteVideo()
    //     }
    //     handleOnChangeBgLayoutVideo(reader.result as string)
    //     // const data = await uploadFile(file)
    //     // handleOnChangeBgLayoutVideo('', data.url!, data.storageId)
    // }

    const deleteVideo = async () => {
        await deleteFileCloudinary(backgroundVideo.storageId, 'video')
        deleteBgLayoutVideo()
    }

    return (
        <div className='flex justify-between items-center h-8'>
            <div className='flex flex-col text-sm md:text-medium'>
                <span>Video de Fondo:</span>
            </div>
            <UpdateAssetTool
                isAsset={backgroundVideo?.uploadVideoUrl}
                deleteAsset={deleteVideo}
                onAccept={() => onAccept(uploadVideo)}
                onChangeFiles={getLocalUrls}
                isUploading={isUploading}
                isSuccess={isSuccess}
                dropzoneOptions={{
                    accept: {
                        'video/mp4': [],
                    },
                    maxFiles: 1,
                    disabled: files.length === 1,
                }}
                modalTexts={{
                    description: 'Formato: mp4 / Max: 25 MB / Max: 1'
                }}
            />
        </div>
    )
}

export default ChangeBgVideoFeature