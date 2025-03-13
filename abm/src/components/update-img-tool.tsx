import React from 'react'
import { IconEdit, IconTrash, IconUpload } from '@tabler/icons-react'
import { Input } from './ui/input'
import { UpdateImgToolProps } from '@/interfaces'

const UpdateImgTool = ({ imageRef, isImage, deleteImg, uploadImage, widget, panel }: UpdateImgToolProps) => {
    const uploadClick = () => {
        panel ?
            imageRef.current[panel.id].current?.click() :
            imageRef.current?.click()
    }

    return (
        <>
            <div className='flex gap-1'>
                <span
                    className='cursor-pointer transition-all hover:scale-110 flex justify-center items-center'
                    onClick={uploadClick}
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
            {
                widget?.data?.resizables?.length ? widget?.data?.resizables?.map((_, i) => (
                    <Input
                        key={i}
                        className='hidden'
                        ref={imageRef.current[i]}
                        onChange={(e) => uploadImage(e)}
                        name={`panel-${i}`}
                        type='file' />
                )) :
                    <Input
                        className='hidden'
                        ref={imageRef}
                        onChange={(e) => uploadImage(e)}
                        name='layoutBgImg'
                        type='file' />
            }
        </>
    )
}

export default UpdateImgTool