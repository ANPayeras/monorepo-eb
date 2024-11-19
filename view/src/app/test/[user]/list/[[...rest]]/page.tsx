import React from 'react'
import ReactiveRoutes from '@/components/reactive-routes'

const List = ({ params }: { params: { user: string, rest: string[] } }) => {
    const { user, rest } = params
    return <ReactiveRoutes user={user} component={decodeURIComponent(rest[0])} combo={rest[1]} test />
}

export default List