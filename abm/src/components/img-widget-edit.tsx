import React, { createRef, MutableRefObject, useLayoutEffect, useRef, useState } from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import UpdateImgTool from './update-img-tool'
import useUploadFile from '@/hooks/use-upload-file'
import { Id } from '../../convex/_generated/dataModel'
import LinkWidgetEdit from './link-widget-edit'
import { cn } from '@/lib/utils'
import { ImageWidgetInterface } from '@/interfaces'

const ImgWidgetEdit = ({ widget, title, isNestedWidget, handleNestedWidgetChanges, panel, className }: ImageWidgetInterface) => {
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)
    const imageRef = useRef([]);
    const [mount, setMount] = useState(false)

    const { uploadFile, deleteFile } = useUploadFile()

    useLayoutEffect(() => {
        if (widget.type === 'resizable' && panel) {
            imageRef.current = Array(widget.data?.resizables?.length).fill('').map((_, i) => imageRef.current[i] || createRef())
            setMount(!mount)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widget, panel])

    const getImage = (): string => {
        let img = '';
        if (widget.type === 'resizable' && panel) {
            img = panel.img?.localImg || panel.img?.uploadImgUrl || ''
        } else {
            img = widget.data?.img?.localImg || widget.data?.img?.uploadImgUrl || ''
        }
        return img
    }

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.target
        if (!files || !files?.length) return;

        try {
            const file = files[0];
            const reader = new FileReader();
            reader.addEventListener("load", async () => {
                handleNestedWidgetChanges ?
                    handleNestedWidgetChanges({ img: { localImg: reader.result as string } }) :
                    handleWidgetChanges(widget, { img: { localImg: reader.result as string } })
                const data = await uploadFile(file)
                handleNestedWidgetChanges ?
                    handleNestedWidgetChanges({ img: { localImg: '', uploadImgUrl: data.url!, storageId: data.storageId } }) :
                    handleWidgetChanges(widget, { img: { localImg: '', uploadImgUrl: data.url!, storageId: data.storageId } })
            });
            reader.readAsDataURL(file);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteImg = () => {
        const storageId = panel?.img?.storageId || widget.data?.img?.storageId
        const panelRef = panel && (imageRef.current[panel.id] as MutableRefObject<HTMLInputElement>).current
        const ref = panelRef || imageRef.current as unknown as HTMLInputElement
        if (storageId) {
            ref.value = ''
            deleteFile(storageId as Id<"_storage">)
            handleNestedWidgetChanges ?
                handleNestedWidgetChanges({ img: { localImg: '', uploadImgUrl: '', storageId: '' } }) :
                handleWidgetChanges(widget, { img: { localImg: '', uploadImgUrl: '', storageId: '' } })
        }
    }

    return (
        <div className={cn('flex flex-col gap-2 p-4', className)}>
            <span className='text-center border-b'>
                {title || 'Imagen'}
            </span>
            <div className='flex justify-between'>
                <span>Subir imagen:</span>
                <UpdateImgTool
                    imageRef={imageRef}
                    isImage={getImage()}
                    deleteImg={deleteImg}
                    uploadImage={uploadImage}
                    panel={panel}
                    widget={widget}
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