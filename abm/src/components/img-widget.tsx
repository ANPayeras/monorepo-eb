import React from 'react'

import ToolsWidget from './tools-widget'
import { useDataStore } from '@/providers/data-store-providers'
import Image from 'next/image'
import { ImgWidgetInterface } from '@/interfaces'
import useUploadFile from '@/hooks/use-upload-file'
import { useIsSmall } from '@/hooks/use-media.query'
import Icon from './Icon'

const ImgWidget = ({ widget, selectSection, editWidget, props }: ImgWidgetInterface) => {
    const { data } = widget
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

    const image = data?.img?.uploadImgUrl

    const isSmall = useIsSmall()

    return (
        <>
            <div
                className={`flex w-full max-h-[200px] relative ${!props ? 'sm:active:bg-inherit' : 'sm:active:bg-slate-400'}`}
                {...!isSmall && props}
            >
                {
                    image ?
                        <>
                            <Image
                                src={image}
                                alt='img-widget'
                                className='rounded-md object-cover'
                                style={{
                                    borderRadius: `${data?.container?.border?.rounded ? `${data?.container?.border?.rounded}px` : ''}`,
                                }}
                                width={1000}
                                height={100}
                            />
                            <span
                                className='absolute p-10 w-full h-full overflow-hidden break-words break-all whitespace-pre-line'
                                style={{
                                    color: data?.textColor,
                                    textAlign: data?.textAlign as '' || 'center',
                                }}
                            >
                                {data?.value}
                            </span>
                        </> :
                        <div className='w-full h-full flex justify-center'>
                            <Icon name='photoScan' iconProps={{ size: 80 }} />
                        </div>
                }
            </div>
            {
                selectSection &&
                <ToolsWidget
                    deleteFunc={_deleteWidget}
                    editFunc={() => selectSection('imgWidget', 0, widget)}
                    isEditing={isEditing}
                    {...isSmall && { props }}
                />
            }
        </>
    )
}

export default ImgWidget