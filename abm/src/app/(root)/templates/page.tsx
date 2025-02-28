"use client"
import React, { useState } from 'react'
import { useQuery } from 'convex/react'
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

const Templates = () => {
  const { user } = useUser()
  const listTemplates = useQuery(api.templates.listTemplates, !user ? 'skip' : undefined)
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [templateHovered, setTemplateHovered] = useState<number | null>(null);

  if (!listTemplates || !user) return <LoaderSpinner />

  const handleHoverTemplates = (templatePos: number | null) => {
    if (typeof templatePos === 'number') setIsHovered(true)
    else setIsHovered(false)
    setTemplateHovered(templatePos)
  }

  return (
    <div className='flex flex-wrap gap-4 w-full h-full'>
      {
        listTemplates?.length ?
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
                  <motion.div
                    onHoverStart={() => handleHoverTemplates(i)}
                    onHoverEnd={() => handleHoverTemplates(null)}
                    className='max-w-[400px] min-w-[300px] h-full relative'
                  >
                    <Template {...{ template: t, user }} />
                    <TemplateBtnsOptions t={t} i={i} isHovered={isHovered} templateHovered={templateHovered} />
                  </motion.div>
                </SwiperSlide>
              ))
            }
          </Swiper> :
          <EmptyTemplates
            mainTitle='Agrega Plantillas para ver las aca'
            linkTitle='Crear'
            linkUrl='/build'
          />
      }
    </div >
  )
}

export default Templates