import React from 'react'

import ToolsWidget from './tools-widget'
import { useDataStore } from '@/providers/data-store-providers'
import Image from 'next/image'
import { ImgWidgetInterface } from '@/interfaces'
import { IconPhotoScan } from '@tabler/icons-react'
import useUploadFile from '@/hooks/use-upload-file'
import WidgetBaseCard from './widget-base-card'

const ImgWidget = ({ widget, selectSection, editWidget, props }: ImgWidgetInterface) => {
    const deleteWidget = useDataStore(state => state.deleteWidget)
    const isEditing = widget.id === editWidget?.id
    const { deleteFileCloudinary } = useUploadFile()

    const _deleteWidget = async () => {
        try {
            selectSection('', 0, {})
            const storageId = widget.data?.img?.storageId
            if (storageId) await deleteFileCloudinary(storageId, 'image')
            deleteWidget(widget)
        } catch (error) {
            console.log(error)
        }
    }

    const image = widget.data?.img?.uploadImgUrl

    return (
        <WidgetBaseCard>
            <div className={`flex w-full max-h-[200px] rounded-md relative ${!props ? 'active:bg-inherit' : 'active:bg-slate-400'} touch-none`} {...props}>
                {
                    image ?
                        <>
                            <Image
                                src={image}
                                alt='img-widget'
                                className='rounded-md object-cover'
                                width={1000}
                                height={100}
                            />
                            <span
                                className='absolute p-10 flex w-full h-full justify-center items-center overflow-hidden break-words break-all'
                                style={{ color: widget.data?.textColor }}
                            >
                                {widget.data?.value}
                            </span>
                        </> :
                        <div className='w-full h-full flex justify-center'>
                            <IconPhotoScan size={80} />
                        </div>
                }
            </div>
            {
                selectSection &&
                <ToolsWidget deleteFunc={_deleteWidget} editFunc={() => selectSection('imgWidget', 0, widget)} isEditing={isEditing} />
            }
        </WidgetBaseCard>
    )
}

export default ImgWidget