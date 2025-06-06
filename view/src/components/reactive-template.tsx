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
import { ReactiveTemplateProps } from '@/types'
import All from './all'
import Combo from './combo'
import Checkout from './checkout'
import Header from './header'

const ReactiveTemplate = ({ user, component = '', combo = '', test = false }: ReactiveTemplateProps) => {
  const { init } = useInitPosthog()

  const data = useQuery(api.templates.getTemplateView, { user, test })
  const template = data?.template
  const userData = data?.user

  useEffect(() => {
    if (template?.length && !test) {
      init(template[0])
    }
  }, [init, template, test])

  if (!template) return <Loader />

  if (!template.length) return <TemplateNotFound text={<span className='text-center px-2'>{test ? TextTestNotFound : TextActivetNotFound}</span>} />

  const { bgColor, textsColor, backgroundImg, backgroundVideo, templateLayout } = template[0].layout

  const Component: {
    [index: string]: JSX.Element;
  } = {
    all: <All template={template[0]} />,
    combo: <Combo template={template[0]} combo={decodeURIComponent(combo)} />,
    confirmation: <Checkout user={userData!} />,
  }

  return (
    <section
      className='relative h-full w-full min-h-screen flex justify-center'
      style={{
        backgroundColor: bgColor || 'black',
        color: textsColor,
        backgroundImage: backgroundVideo?.uploadVideoUrl ? '' : `url(${backgroundImg.uploadImgUrl || ''})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {
        backgroundVideo?.uploadVideoUrl &&
        <BgVideoPlayer
          src={backgroundVideo.uploadVideoUrl}
          className='rounded-none'
        />
      }
      {
        !component || templateLayout === 'empty' ?
          <Template template={template[0]} userData={userData!} /> :
          <div className='absolute w-full min-h-screen max-w-[400px] md:max-w-[600px] pt-10 p-4'>
            <Header iconUrl={`${user}/confirmation`} />
            {Component[component]}
          </div>
      }
      <BrandLink />
      {
        test && <TestLabel />
      }
    </section>
  )
}

export default ReactiveTemplate