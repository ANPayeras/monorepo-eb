"use client"

import React, { FC, useCallback, useEffect, useState } from 'react'
import SectionsEdit from '../sections-edit'
import { SheetQR } from '../sheet-qr'
import FooterBuild from '../footer-build'
import WidgetsFeatures from '../widgets-features'
import { Tabs } from '../ui/tabs'
import { IColor, useColor } from 'react-color-palette'
import { useDataStore } from '@/providers/data-store-providers'
import ChangeColorFeature from '../change-color-feature'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useToast } from '@/hooks/use-toast'
import { RightSectionInterface } from '@/interfaces'
import { Doc } from '../../../convex/_generated/dataModel'
import ChangeBgImgFeature from '../change-bg-img-feature'
import AllPageLoader from '../all-page-loader'
import ChangeBgVideoFeature from '../features/change-bg-video-feature'

const RightSection: FC<RightSectionInterface> = ({ editSection, templateLayout, swiperRef, template }) => {
    const handleOnChangeLayout = useDataStore(state => state.handleOnChangeLayout)
    const createTemplateTest = useMutation(api.templates.createTemplateTest)
    const updateTemplate = useMutation(api.templates.updateTemplate)
    const [openGenerateQr, setOpenGenerateQr] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [bgColor, setBgColor] = useColor(template.layout.bgColor || "#ffffff");
    const [textsColor, setTextsColor] = useColor(template.layout.textsColor || "#000000");
    const { toast } = useToast()

    const handleChangeColor = (color: IColor, type: string) => {
        switch (type) {
            case 'textsColor':
                setTextsColor(color)
                break;
            case 'bgColor':
                setBgColor(color)
                break;
            default:
                break;
        }
        handleOnChangeLayout(color.hex, type)
    }

    const generatePreview = async () => {
        setIsLoading(true)
        try {
            await createTemplateTest({ templateId: template._id })
            setOpenGenerateQr(true)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    const saveChanges = useCallback(async ({ feedback, data }: { feedback: boolean, data?: Doc<"templates"> }) => {
        let payload = data || template
        try {
            setIsLoading(true)
            await updateTemplate({ ...payload })
            feedback &&
                toast({
                    title: "Cambios guardados",
                    variant: 'success',
                    duration: 1000,
                })
        } catch (error) {
            toast({
                title: "Error al guardar",
                description: "Por favor intente de nuevo",
                variant: 'destructive',
                duration: 1000,
            })
        }
        setIsLoading(false)
    }, [template, toast, updateTemplate])

    useEffect(() => {
        const saveData = () => saveChanges({ feedback: false })
        window.addEventListener('beforeunload', saveData);

        return () => {
            window.removeEventListener('beforeunload', saveData)
            saveChanges({ feedback: true })
        }
    }, [saveChanges])

    return (
        <div className='flex-1 flex p-0 sm:p-4'>
            <div className='w-full h-full overflow-hidden bg-slate-300 rounded-sm'>
                {
                    !editSection.section &&
                    <div className='p-4 h-full flex flex-col justify-between gap-10 sm:gap-0'>
                        <div className='flex flex-col gap-10'>
                            <div className='flex flex-col'>
                                {
                                    templateLayout?.tabs.length ?
                                        <div className='flex items-center mb-10 pb-1 border-b'>
                                            <Tabs
                                                containerClassName='justify-around'
                                                tabs={templateLayout.tabs}
                                                onClick={(e) => swiperRef?.current?.slideTo(Number(e.value))}
                                            />
                                        </div> : <></>
                                }
                                <div className='flex flex-col gap-4'>
                                    <ChangeColorFeature
                                        title={'Color de fondo:'}
                                        type={'bgColor'}
                                        color={bgColor}
                                        onChange={handleChangeColor} />
                                    <ChangeColorFeature
                                        title={'Color de textos:'}
                                        type={'textsColor'}
                                        color={textsColor}
                                        onChange={handleChangeColor} />
                                    <ChangeBgImgFeature />
                                    <ChangeBgVideoFeature />
                                </div>
                            </div>
                            {
                                templateLayout?.widgets ?
                                    <WidgetsFeatures /> : <></>
                            }
                        </div>
                        <FooterBuild {...{ generatePreview, saveChanges: () => saveChanges({ feedback: true }) }} />
                    </div>
                }
                <SectionsEdit section={editSection.section} combo={editSection.combo} widget={editSection.widget} />
                <SheetQR open={openGenerateQr} handleChange={setOpenGenerateQr} />
                <AllPageLoader isOpen={isLoading} />
            </div>
        </div>
    )
}

export default RightSection