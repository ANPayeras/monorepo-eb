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

const ReactiveTemplate = ({ user, component = '', test = false }: ReactiveTemplateProps) => {
  const { init } = useInitPosthog()

  const data = useQuery(api.templates.getTemplateView, { user, test })
  const template = data?.template
  const userData = data?.user

  useEffect(() => {
    if (template?.length && userData && !test) {
      init(template[0], userData)
    }
  }, [init, template, test, userData])

  if (!template) return <Loader />

  if (!template.length) return <TemplateNotFound text={<span className='text-center px-2'>{test ? TextTestNotFound : TextActivetNotFound}</span>} />

  const { bgColor, textsColor, backgroundImg, backgroundVideo, templateLayout } = template[0].layout

  const Component: {
    [index: string]: JSX.Element;
  } = {
    all: <All template={template[0]} />,
    combo: <Combo template={template[0]} />,
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
        backgroundSize: '100% 100%',
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
          <div className='absolute w-full flex flex-col items-center py-10 max-h-screen overflow-hidden overflow-y-visible'>
            <div className="w-[90%] max-w-[400px] md:max-w-[600px] flex flex-col items-center">
              <Header iconUrl={`/${decodeURIComponent(user)}/confirmation`} />
              {Component[component]}
            </div>
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