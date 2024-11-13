import React from 'react'
import ReactiveTemplate from '@/components/reactive-template'

const View = ({ params }: { params: { user: string } }) => {
  return <ReactiveTemplate user={params.user} />
}

export default View