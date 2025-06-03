import React, { useEffect, useState } from 'react'

import { UpdateImgToolProps } from '@/interfaces'
import LoaderSpinner from './loader-spinner'
import { FileUpload } from './ui/file-upload'
import Button from './buttons/button'
import Icon from './Icon'

const UpdateAssetTool = ({ isAsset, deleteAsset, isUploading, modalTexts, dropzoneOptions, onChangeFiles, onAccept, isSuccess }: UpdateImgToolProps) => {
    const [openModal, setOpenModal] = useState(false)

    const uploadClick = () => {
        setOpenModal(true)
    }

    const _onAccept = () => {
        onAccept()
    }

    useEffect(() => {
        if (isSuccess) setOpenModal(false)
    }, [isSuccess])

    return (
        <>
            <div className='flex gap-1'>
                {
                    isUploading ?
                        <LoaderSpinner size='sm' /> :
                        <>

                            <span
                                className='cursor-pointer transition-all hover:scale-110 flex justify-center items-center'
                                onClick={uploadClick}
                            >
                                {
                                    isAsset ?
                                        <Icon name='edit' iconProps={{ size: 18, className: 'text-gray-500' }} /> :
                                        <Icon name='upload' iconProps={{ size: 18, className: 'text-gray-500' }} />
                                }
                            </span>
                            {
                                isAsset &&
                                <span
                                    className='cursor-pointer transition-all hover:scale-110 flex justify-center items-center'
                                    onClick={deleteAsset}
                                >
                                    <Icon name='trash' iconProps={{ size: 18, className: 'text-red-500' }} />
                                </span>
                            }
                        </>
                }
            </div>
            {
                openModal &&
                <div className='absolute top-0 left-0 bg-black w-full h-full bg-opacity-50 z-[100] flex flex-col gap-2 items-center justify-center'>
                    <FileUpload
                        containerClassName='w-[90%] md:w-[80%] max-w-[700px]'
                        dropzoneOptions={{ ...dropzoneOptions }}
                        onChange={onChangeFiles}
                        {...modalTexts}
                    />
                    <Button
                        onClick={_onAccept}
                        disabled={isUploading}
                        isLoading={isUploading}
                        spinnerColor='current'
                    >
                        Aceptar
                    </Button>
                </div >
            }
        </>
    )
}

export default UpdateAssetTool