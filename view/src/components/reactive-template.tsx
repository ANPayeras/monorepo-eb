"use client"
import React from 'react'
import { useQuery } from 'convex/react'
import Template from './template'
import Loader from './loader'
import { api } from '../../convex/_generated/api'
import TemplateNotFound from './test-not-found'
import { TextActivetNotFound, TextTestNotFound } from '@/constants'
import BrandLink from './brand-link'

const ReactiveTemplate = ({ user, test = false }: { user: string, test?: boolean }) => {
  const template = useQuery(api.templates.getTemplate, { user, test })

  if (!template) return <Loader />

  if (!template.template.length) return <TemplateNotFound text={<span className='text-center px-2'>{test ? TextTestNotFound : TextActivetNotFound}</span>} />

  return (
    <div
      className={`relative h-full w-full min-h-screen bg-slate-300 ${test && 'watermark'}`}
      style={{ backgroundColor: template.template[0].layout.bgColor }}
    >
      <Template template={template.template[0]} userData={template.user} test={test} />
      <BrandLink />
    </div>
  )
}

export default ReactiveTemplate