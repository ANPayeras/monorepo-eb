import React, { FC } from 'react'

import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useDataStore } from '@/providers/data-store-providers'
import useUploadFile from '@/hooks/use-upload-file'
import UpdateAssetTool from './update-img-tool'

const CombosTemplate: FC<{ combo: number }> = ({ combo }) => {
    const { combos, handleOnChangeCombos, deleteImgCombo, handleOnChangeImgCombos } = useDataStore(state => state)
    const { description, price, title, imgUrl } = combos[combo]

    const { isUploading, isSuccess, files, onAccept, getLocalUrls, uploadFileCloudinary, deleteFileCloudinary } = useUploadFile()

    const uploadImage = async (file: File, _storageId: string, pos: number) => {
        try {
            if (_storageId) await deleteFileCloudinary(imgUrl[pos].storageId, 'image')
            const { url, storageId } = await uploadFileCloudinary(file)
            handleOnChangeImgCombos(combo, pos, url, storageId)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteImg = async (pos: number) => {
        await deleteFileCloudinary(imgUrl[pos].storageId, 'image')
        deleteImgCombo(combo, pos)
    }

    return (
        <section className='flex w-full h-full p-4 gap-1'>
            <div className='flex flex-col justify-center w-full'>
                <div className='flex p-2 h-fit'>
                    <div className='flex flex-col items-center bg-slate-50 rounded-md text-sm sm:text-medium py-2 w-full'>
                        <span className='text-center mb-8'>Podes agregar hasta 4 imagenes</span>
                        <div className='flex flex-col w-full gap-4 px-3'>
                            {
                                imgUrl.slice(0, 4).map((img, i) => (
                                    <div key={i} className='flex justify-between items-center w-full'>
                                        <span>
                                            Imagen {i + 1}
                                        </span>
                                        <UpdateAssetTool
                                            isAsset={!!img.url}
                                            deleteAsset={() => deleteImg(i)}
                                            onChangeFiles={getLocalUrls}
                                            onAccept={() => onAccept((file) => uploadImage(file, img.storageId, i))}
                                            isUploading={isUploading}
                                            isSuccess={isSuccess}
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
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='flex flex-1 flex-col p-2 gap-4'>
                    <span className='text-sm'>Título:</span>
                    <div className='flex justify-between'>
                        <Input
                            placeholder='Titulo'
                            className='h-6 w-full'
                            name='title'
                            value={title}
                            onChange={(e) => handleOnChangeCombos(e, combo)}
                            maxLength={30}
                        />
                    </div>
                    <span className='text-sm'>Descripción:</span>
                    <div className='h-auto'>
                        <Textarea
                            placeholder='Descripcion'
                            rows={10}
                            maxLength={150}
                            className='min-h-[200px] max-h-[200px] resize-none'
                            name='description'
                            value={description}
                            onChange={(e) => handleOnChangeCombos(e, combo)}
                        />
                    </div>
                    <span className='text-sm'>Precio:</span>
                    <div className='flex justify-start gap-4'>
                        <span>$</span>
                        <Input
                            placeholder='Precio'
                            className='h-6 w-full'
                            type='number'
                            name='price'
                            value={price || ''}
                            onChange={(e) => handleOnChangeCombos(e, combo)}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CombosTemplate