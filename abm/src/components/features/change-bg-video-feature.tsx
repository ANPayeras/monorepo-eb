import React, { useRef } from 'react'
import { IconEdit, IconTrash, IconUpload } from '@tabler/icons-react'
import useUploadFile from '@/hooks/use-upload-file';
import { useDataStore } from '@/providers/data-store-providers';
import { Input } from '../ui/input';
import { Id } from '../../../convex/_generated/dataModel';
import LoaderSpinner from '../loader-spinner';
import { useToast } from '@/hooks/use-toast';
import { checkAsset } from '@/lib/utils';

const ChangeBgVideoFeature = () => {
    const { layout: { backgroundVideo }, handleOnChangeBgLayoutVideo, deleteBgLayoutVideo } = useDataStore(state => state)
    const videoRef = useRef<HTMLInputElement>(null);
    const { uploadFile, deleteFile, isUploading } = useUploadFile()
    const { toast } = useToast()

    const uploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.target
        if (!files || !files?.length) return;

        try {
            const file = files[0];
            const reader = new FileReader();
            checkAsset(file)
            reader.addEventListener("load", async () => {
                if (backgroundVideo.localVideo || backgroundVideo.uploadVideoUrl) {
                    await deleteVideo()
                }
                handleOnChangeBgLayoutVideo(reader.result as string)
                const data = await uploadFile(file)
                handleOnChangeBgLayoutVideo('', data.url!, data.storageId)
            });
            reader.readAsDataURL(file);
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

    const deleteVideo = async () => {
        await deleteFile(backgroundVideo.storageId as Id<"_storage">)
        videoRef.current!.value = ''
        deleteBgLayoutVideo()
    }

    const isVideo = backgroundVideo?.localVideo || backgroundVideo?.uploadVideoUrl

    return (
        <div className='flex justify-between items-center h-8'>
            <div className='flex flex-col text-sm md:text-medium'>
                <span>Video de Fondo:</span>
                <span className='text-xs text-slate-700'>Formato: mp4 / Max: 25MB</span>
            </div>
            <div className='flex gap-2'>
                {
                    isUploading ?
                        <LoaderSpinner size='sm' /> :
                        <>
                            <span
                                className='cursor-pointer transition-all hover:scale-110 flex justify-center items-center'
                                onClick={() => videoRef.current?.click()}
                            >
                                {
                                    isVideo ?
                                        <IconEdit size={18} className='text-gray-500' /> :
                                        <IconUpload size={18} className='text-gray-500' />
                                }
                            </span>
                            {
                                isVideo &&
                                <span
                                    className='cursor-pointer transition-all hover:scale-110 flex justify-center items-center'
                                    onClick={deleteVideo}
                                >
                                    <IconTrash size={18} className='text-red-500' />
                                </span>
                            }
                        </>
                }
            </div>
            <Input
                className='hidden'
                ref={videoRef}
                onChange={(e) => uploadVideo(e)}
                name='layoutBgVideo'
                type='file'
                accept=".mp4"
            />
        </div>
    )
}

export default ChangeBgVideoFeature