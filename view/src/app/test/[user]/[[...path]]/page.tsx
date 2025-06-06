import React from 'react'

import ReactiveTemplate from '@/components/reactive-template'
import { MainPageProps } from '@/types'

const page = ({ params, searchParams }: MainPageProps) => {
    const { user, path } = params
    const { combo } = searchParams

    let _combo;
    const _path = path?.length ? path[0] : '';

    if (combo === ':combo') _combo = combo.replace(':combo', '')
    else _combo = `combo ${combo}`

    return <ReactiveTemplate user={user} component={_path} combo={_combo} test />
}

export default page