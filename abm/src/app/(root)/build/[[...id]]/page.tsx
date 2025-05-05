import React from 'react'
import { api } from '../../../../../convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import Build from '@/components/build'
import { redirect, RedirectType } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

const page = async ({ params }: { params: { id: string[] } }) => {
  const user = await currentUser()
  const template = await fetchQuery(api.templates.getTemplateById, { templateId: params?.id ? params?.id[0] : '' })

  if (!template) {
    const userConvex = await fetchQuery(api.users.getCurrentUserByClerkId, { clerkId: user?.id! })
    const lastBuildTemplate = await fetchQuery(api.templates.getLastTemplateBuild, { user: userConvex._id })
    if (lastBuildTemplate) {
      redirect(`/build/${lastBuildTemplate._id}`, RedirectType.replace)
    }
  }

  return <Build template={template} />
}

export default page