import React from 'react'
import { api } from '../../../../../convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import Build from '@/components/build'
import { layoutFeatures } from '@/constants'

const page = async ({ params, searchParams }: { params: { id: string[] }, searchParams: { layout: string } }) => {
  const template = await fetchQuery(api.templates.getTemplateById, { templateId: params?.id ? params?.id[0] : '' })
  const layout = template?.layout.templateLayout || searchParams.layout

  return <Build template={template} templateLayout={layoutFeatures[layout]} />
}

export default page