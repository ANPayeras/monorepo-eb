import React from 'react'

import ReactiveTemplate from '@/components/reactive-template'
import { MainPageProps } from '@/types'

const page = ({ params }: MainPageProps) => {
  const { user, path } = params

  const _path = path?.length ? path[0] : '';

  return <ReactiveTemplate user={user} component={_path} />
}

export default page