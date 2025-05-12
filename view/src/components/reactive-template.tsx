"use client"

import React, { useEffect } from 'react'
import { useQuery } from 'convex/react'
import Template from './template'
import Loader from './loader'
import { api } from '../../convex/_generated/api'
import TemplateNotFound from './test-not-found'
import { TextActivetNotFound, TextTestNotFound } from '@/constants'
import BrandLink from './brand-link'
import TestLabel from './test-label'
import useInitPosthog from '@/hooks/use-init-posthog'
import BgVideoPlayer from './bg-video'

const ReactiveTemplate = ({ user, test = false }: { user: string, test?: boolean }) => {
  const { init } = useInitPosthog()

  const template = useQuery(api.templates.getTemplate, { user, test })

  useEffect(() => {
    if (template?.template[0] && !test) {
      init(template.template[0])
    }
  }, [init, template, test])

  if (!template) return <Loader />

  if (!template.template.length) return <TemplateNotFound text={<span className='text-center px-2'>{test ? TextTestNotFound : TextActivetNotFound}</span>} />

  const { layout: { bgColor, textsColor, backgroundImg, backgroundVideo } } = template.template[0]

  return (
    <div
      className='relative h-full w-full min-h-screen'
      style={{
        backgroundColor: bgColor || 'black',
        color: textsColor,
        backgroundImage: `url(${backgroundImg.uploadImgUrl || ''})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {
        backgroundVideo?.uploadVideoUrl && <BgVideoPlayer src={backgroundVideo.uploadVideoUrl} className='rounded-none' />
      }
      <Template template={template.template[0]} userData={template.user} />
      <BrandLink />
      {
        test && <TestLabel />
      }
    </div>
  )
}

export default ReactiveTemplate