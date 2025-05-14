import React from 'react'
import ReactiveTemplate from '@/components/reactive-template'

const View = ({ params }: { params: { user: string, rest: string[] } }) => {
  const { user, rest } = params
  return <ReactiveTemplate user={user} component={decodeURIComponent(rest ? rest[0] : '')} combo={rest ? rest[1] : ''} />
}

export default View