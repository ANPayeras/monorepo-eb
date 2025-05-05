"use client"

import { useDataStore } from '@/providers/data-store-providers'
import React, { useEffect, useRef, useState } from 'react'
import { Swiper as SwiperType } from 'swiper/types'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Doc } from '../../convex/_generated/dataModel'
import { AlertDialogComponent } from './dialog'
import { useRouter } from 'next/navigation'
import LoaderSpinner from './loader-spinner'
import EmptyLayout from './templates-layout/empty-layout'
import ClassicLayout from './templates-layout/classic-layout'
import NavBuild from './nav-build'
import SwiperTemplatesPreview from './swiper-templates-preview'
import { Widget } from '@/stores/data-store'
import { useUser } from '@clerk/nextjs'
import EmptyTemplates from './empty-templates'
import RightSection from './build/right-section';
import { layoutFeatures } from '@/constants'
import { useToast } from '@/hooks/use-toast'

const Build = ({ template }: { template: Doc<"templates"> | null }) => {
    const { user } = useUser()
    const userConvex = useQuery(api.users.getCurrentUser, !user ? 'skip' : undefined)
    const listTemplates = useQuery(api.templates.listTemplates, !user ? 'skip' : undefined)
    const createTemplate = useMutation(api.templates.createTemplate)
    const router = useRouter()
    const { toast } = useToast()
    const swiperRef = useRef<SwiperType>()

    const { layout, paymentMethods, contact, cart, deliverMethods, setTemplateData, resetState } = useDataStore(state => state)

    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [editSection, setEditSection] = useState({
        section: '',
        combo: 0,
        widget: {}
    })

    const selectSection = (type: string, combo: number = 0, widget: Widget | {} = {}) => {
        setEditSection((prev) => ({
            ...prev,
            section: type,
            combo,
            widget,
        }))
    }

    const backButton = () => {
        setEditSection((prev) => ({
            ...prev,
            section: '',
            combo: 0,
            widget: {},
        }))
    }

    useEffect(() => {
        if (template) {
            setTemplateData({ ...template, cart: [], templateBuildId: template._id })
        }
    }, [setTemplateData, template, router])

    const resetTemplate = () => {
        resetState()
        saveChanges()
    }

    const saveChanges = async () => {
        try {
            const id = await createTemplate({ layout: layout.templateLayout })
            router.replace(`/build/${id}`)
        } catch (error) {
            toast({
                title: "Error al resetar",
                description: "Por favor intente de nuevo",
                variant: 'destructive'
            })
        }
    }

    const openModal = () => {
        setOpenDialog(true)
    }

    const layoutTemplate: { [key: string]: JSX.Element } = {
        empty: <EmptyLayout {...{ selectSection, editSection, data: { layout, contact, paymentMethods, deliverMethods } }} />,
        classic: <ClassicLayout {...{ selectSection, editSection }} />,
    }

    if (!userConvex || !listTemplates) return <LoaderSpinner />

    if (!listTemplates?.length) return (
        <EmptyTemplates
            mainTitle={'Todavia no creaste ninguna plantilla seleccioná un diseño y comenzá a crear'}
            linkTitle={'Ver diseños'}
            linkUrl={'/layouts'} />
    )

    return (
        <section className='size-full flex max-w-[1000px] m-auto flex-col sm:flex-row'>
            <div className='flex-1 flex flex-col p-4 gap-1 w-full sm:w-1/2'>
                <NavBuild
                    leftIconFunction={backButton}
                    leftIcon={!!editSection.section}
                    iconRefreshFunction={openModal}
                />
                <SwiperTemplatesPreview
                    swiperRef={swiperRef}
                    layout={layout}
                    cart={cart}
                    editSection={editSection}
                    layoutTemplate={layoutTemplate[layout.templateLayout]}
                    userData={userConvex}
                />
            </div>
            <RightSection
                editSection={editSection}
                templateLayout={layoutFeatures[layout.templateLayout]}
                swiperRef={swiperRef}
                template={template!}
                userConvex={userConvex} />
            <AlertDialogComponent
                open={openDialog}
                onOpenChange={() => setOpenDialog(false)}
                onConfirm={() => resetTemplate()}
                title='Desea crear un nuevo template?'
                description='Cualquier cambio no guardado se perdera'
            />
        </section>
    )
}

export default Build