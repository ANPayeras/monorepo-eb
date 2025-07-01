// import { useMutation } from 'convex/react';
// import { api } from '../../convex/_generated/api';
// import { useUploadFiles } from '@xixixao/uploadstuff/react';
// import { Id } from '../../convex/_generated/dataModel';
import { checkAsset } from '@/lib/utils';
import { useToast } from './use-toast';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/constants/envs';

const useUploadFile = () => {
    // const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    // const { startUpload, isUploading } = useUploadFiles(generateUploadUrl)
    // const getImageUrl = useMutation(api.templates.getUrl);
    // const _deleteFile = useMutation(api.files.deleteFile)
    const [files, setFiles] = useState<File[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const { toast } = useToast()

    // const uploadFile = async (file: File) => {
    //     const uploaded = await startUpload([file]);
    //     const storageId = (uploaded[0].response as any).storageId;
    //     const url = await getImageUrl({ storageId });
    //     return {
    //         url,
    //         storageId,
    //     }
    // }

    // const deleteFile = async (storageId: Id<"_storage">) => {
    //     await _deleteFile({ storageId })
    // }

    // const bulkDeleteFiles = (storageIds: Id<"_storage">[]) => {
    //     const promises = storageIds.map(storageId => deleteFile(storageId))
    //     Promise.all(promises).then(() => console.log('ok')).catch(e => console.log(e))
    // }

    const uploadAsset = (e: React.ChangeEvent<HTMLInputElement>, uploadCallback: (reader: FileReader, file: File) => Promise<void>) => {
        e.preventDefault();
        const { files } = e.target
        if (!files || !files?.length) return;

        try {
            const file = files[0];
            const reader = new FileReader();
            checkAsset(file)
            reader.addEventListener("load", async () => {
                await uploadCallback(reader, file)
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

    const getLocalUrls = (files: File[]) => {
        setFiles(files);
    }

    const onAccept = (uploadCallback: (file: File) => Promise<void>) => {
        setIsUploading(true)
        const promises: Promise<void>[] = []
        files.forEach(file => {
            promises.push(uploadCallback(file))
        })
        Promise.all(promises)
            .then(() => setIsSuccess(true))
            .catch(() => setIsSuccess(false))
            .finally(() => {
                setIsUploading(false)
                setFiles([])
            })
    }

    const uploadFileCloudinary = async (file: File) => {
        const fd = new FormData();
        fd.append("file", file);

        try {
            const data = await fetch(`${BASE_URL}/api/files`, { method: "POST", body: fd })
            const { public_id, secure_url } = await data.json()

            return {
                url: secure_url,
                storageId: public_id,
            }
        } catch (error) {
            throw Error(error as string)
        }
    }

    const deleteFileCloudinary = async (publicId: string, resourceType: string) => {
        const fd = new FormData();
        fd.append("public_id", publicId);
        fd.append("resource_type", resourceType);

        try {
            fetch(`${BASE_URL}/api/files`, { method: "DELETE", body: fd })

            return { result: 'ok' }
        } catch (error) {
            throw Error(error as string)
        }
    }

    const bulkDeleteFilesCloudinary = (data: { publicId: string, resourceType: string }[]) => {
        const promises = data.map(({ publicId, resourceType }) => deleteFileCloudinary(publicId, resourceType))
        Promise.all(promises).then(() => console.log('ok')).catch(e => console.log(e))
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isSuccess) {
            interval = setInterval(() => {
                setIsSuccess(false)
                clearInterval(interval)
            }, 500)
        }
        return () => clearInterval(interval)
    }, [isSuccess])

    return {
        uploadAsset,
        getLocalUrls,
        onAccept,
        isUploading,
        isSuccess,
        files,
        uploadFileCloudinary,
        deleteFileCloudinary,
        bulkDeleteFilesCloudinary,
    }
}

export default useUploadFile