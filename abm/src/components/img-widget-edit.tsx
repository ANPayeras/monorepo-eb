import React from 'react'

import { useDataStore } from '@/providers/data-store-providers'
import UpdateAssetTool from './update-img-tool'
import useUploadFile from '@/hooks/use-upload-file'
import LinkWidgetEdit from './link-widget-edit'
import { cn } from '@/lib/utils'
import { ImageWidgetInterface } from '@/interfaces'

const ImgWidgetEdit = ({ widget, title, isNestedWidget, handleNestedWidgetChanges, panel, className }: ImageWidgetInterface) => {
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)

    const { isUploading, getLocalUrls, onAccept, isSuccess, files, uploadFileCloudinary, deleteFileCloudinary } = useUploadFile()

    const getImage = (): string => {
        let img = '';
        if (widget?.type === 'resizable' && panel) {
            img = panel.img?.uploadImgUrl || ''
        } else {
            img = widget?.data?.img?.uploadImgUrl || ''
        }
        return img
    }

    const uploadImage = async (file: File) => {
        const { url, storageId } = await uploadFileCloudinary(file)
        handleNestedWidgetChanges ?
            handleNestedWidgetChanges({ img: { localImg: '', uploadImgUrl: url!, storageId: storageId } }) :
            handleWidgetChanges(widget, { img: { localImg: '', uploadImgUrl: url!, storageId: storageId } })
    }

    // const uploadImage = async (reader: FileReader, file: File) => {
    //     handleNestedWidgetChanges ?
    //         handleNestedWidgetChanges({ img: { localImg: reader.result as string } }) :
    //         handleWidgetChanges(widget, { img: { localImg: reader.result as string } })
    //     const data = await uploadFile(file)
    //     handleNestedWidgetChanges ?
    //         handleNestedWidgetChanges({ img: { localImg: '', uploadImgUrl: data.url!, storageId: data.storageId } }) :
    //         handleWidgetChanges(widget, { img: { localImg: '', uploadImgUrl: data.url!, storageId: data.storageId } })
    // }

    const deleteImg = async () => {
        const storageId = panel?.img?.storageId || widget.data?.img?.storageId
        await deleteFileCloudinary(storageId!, 'image')
        handleNestedWidgetChanges ?
            handleNestedWidgetChanges({ img: { localImg: '', uploadImgUrl: '', storageId: '' } }) :
            handleWidgetChanges(widget, { img: { localImg: '', uploadImgUrl: '', storageId: '' } })

    }

    return (
        <div className={cn('flex flex-col gap-2 p-4', className)}>
            <span className='text-center border-b'>
                {title || 'Imagen'}
            </span>
            <div className='flex justify-between'>
                <span>Subir imagen:</span>
                <UpdateAssetTool
                    isAsset={!!getImage()}
                    isSuccess={isSuccess}
                    deleteAsset={deleteImg}
                    onChangeFiles={getLocalUrls}
                    onAccept={() => onAccept(uploadImage)}
                    isUploading={isUploading}
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
            <div style={{
                ...(!isNestedWidget && { opacity: getImage() ? 'unset' : '0.5', pointerEvents: getImage() ? 'unset' : 'none', userSelect: getImage() ? 'unset' : 'none' })
            }}>
                <LinkWidgetEdit widget={widget} panel={panel} handleNestedWidgetChanges={handleNestedWidgetChanges} className='p-0' />
            </div>
        </div>
    )
}

export default ImgWidgetEdit