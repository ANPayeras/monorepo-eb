import React from 'react'
import ReactiveTemplate from '@/components/reactive-template'

const page = async ({ params }: { params: { user: string } }) => {
    return (
        <ReactiveTemplate user={params.user} test />
    )
}

export default page