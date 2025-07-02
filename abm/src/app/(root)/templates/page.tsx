"use client"

import React, { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import EmptyTemplates from '@/components/empty-templates'
import TemplateBtnsOptions from '@/components/template-btns-options'
import LoaderSpinner from '@/components/loader-spinner'
import Template from '@/components/template'
import { useUser } from '@clerk/nextjs'
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import RowPlanLimits from '@/components/row-plan-limits'
import useCheckPremium from '@/hooks/use-check-premium'
import { Doc } from '../../../../convex/_generated/dataModel'
import { revalidatePathAction } from '@/actions/actions'
import { useToast } from '@/hooks/use-toast'
import Icon from '@/components/Icon'
import CopyLink from '@/components/copy-link'
import { VIEW_URL } from '@/constants/envs'
import Link from 'next/link'


const Templates = () => {
  const { user } = useUser()
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [templateHovered, setTemplateHovered] = useState<number | null>(null);
  const { limit, isPremium } = useCheckPremium('activeTemplates')
  const listTemplates = useQuery(api.templates.listTemplates, !user ? 'skip' : undefined)
  const activesTemplates = useQuery(api.templates.getActivesTemplates, listTemplates?.length ? { templates: listTemplates } : 'skip')
  const activeTemplate = useMutation(api.templates.activeTemplate)

  if (!listTemplates || !user) return <LoaderSpinner />

  const handleHoverTemplates = (templatePos: number | null) => {
    if (typeof templatePos === 'number') setIsHovered(true)
    else setIsHovered(false)
    setTemplateHovered(templatePos)
  }

  const onActiveTemplate = async (template: Doc<"templates">, isActive: boolean) => {
    if (isPremium) {
      const existName = activesTemplates?.find(t => t.name === template.name)
      if (existName && isActive) {
        toast({
          title: "No pueden existir dos plantillas activas con el mismo nombre",
          variant: 'destructive',
          duration: 5000,
        })
        return
      } else if (activesTemplates?.length! >= limit && isActive) {
        toast({
          title: "Has alcanzado el máximo de plantillas activas, desactiva alguna plantilla para continuar",
          variant: 'destructive',
          duration: 5000,
        })
        return
      }
    }

    try {
      await activeTemplate({ templateId: template._id })
      await revalidatePathAction(`/build/${template._id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-4 w-full h-full'>
      {
        listTemplates?.length ?
          <>
            <div className='flex gap-2'>
              <span className='text-slate-900'>Plantillas activas:</span>
              <div className='flex'>
                {
                  activesTemplates ?
                    <RowPlanLimits quantity={activesTemplates?.length || 0} limit={limit} /> : <LoaderSpinner size='sm' />
                }
              </div>
            </div>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              grabCursor={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              breakpoints={{
                0: {
                  centeredSlides: false
                },
                450: {
                  centeredSlides: false,
                },
                768: {
                  slidesPerView: 2,
                  centeredSlides: false
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="w-full max-w-6xl h-full"
            >
              {
                listTemplates?.map((t, i) => (
                  <SwiperSlide key={i}>
                    {
                      isPremium &&
                      <div className='flex justify-between bg-slate-400 px-1 rounded-t-sm'>
                        <span className='text-slate-50'>Nombre: <span className='font-bold'>{t.name}</span></span>
                        <div className='flex gap-2 text-slate-50 items-center'>
                          <Link href={`${VIEW_URL}/${t.name}`} target='_blank' className='transition-all hover:scale-105'>
                            <Icon name='redirect' iconProps={{ size: 18 }} />
                          </Link>
                          <CopyLink text={`${VIEW_URL}/${t.name}`} />
                        </div>
                      </div>
                    }
                    <motion.div
                      onHoverStart={() => handleHoverTemplates(i)}
                      onHoverEnd={() => handleHoverTemplates(null)}
                      className='max-w-[400px] min-w-[300px] h-full relative'
                    >
                      <Template {...{ template: t, username: user.username || '' }} />
                      <TemplateBtnsOptions
                        t={t}
                        i={i}
                        isHovered={isHovered}
                        templateHovered={templateHovered}
                        onActiveTemplate={onActiveTemplate}
                        isPremium={!!isPremium}
                        activesTemplates={activesTemplates as Doc<"templates">[]}
                      />
                    </motion.div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </> :
          <EmptyTemplates
            mainTitle='Agregá plantillas para ver las acá'
            linkTitle='Crear'
            linkUrl='/build'
          />
      }
    </div >
  )
}

export default Templates