import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { Id } from '../../convex/_generated/dataModel';

const useUploadFile = () => {
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const { startUpload, isUploading } = useUploadFiles(generateUploadUrl)
    const getImageUrl = useMutation(api.templates.getUrl);
    const _deleteFile = useMutation(api.files.deleteFile)

    const uploadFile = async (file: File) => {
        const uploaded = await startUpload([file]);
        const storageId = (uploaded[0].response as any).storageId;
        const url = await getImageUrl({ storageId });
        return {
            url,
            storageId,
        }
    }

    const deleteFile = async (storageId: Id<"_storage">) => {
        await _deleteFile({ storageId })
    }

    const bulkDeleteFiles = (storageIds: Id<"_storage">[]) => {
        const promises = storageIds.map(storageId => deleteFile(storageId))
        Promise.all(promises).then(() => console.log('ok')).catch(e => console.log(e))
    }

    return {
        uploadFile,
        deleteFile,
        bulkDeleteFiles,
        isUploading,
    }
}

export default useUploadFile