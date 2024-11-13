"use client"
import React from 'react'
import { useQuery } from 'convex/react'
import All from '@/components/all'
import Combo from '@/components/combo'
import Header from '@/components/header'
import Checkout from '@/components/checkout'
import Loader from '@/components/loader'
import { Id } from '../../../../../../convex/_generated/dataModel'
import { api } from '../../../../../../convex/_generated/api'

const List = ({ params }: { params: { user: Id<"users">, rest: string[] } }) => {
    const data = useQuery(api.templates.getTemplate, { user: params.user, test: true })!

    if (!data) return <Loader />

    const template = data.template

    const Component: {
        [index: string]: JSX.Element;
    } = {
        all: <All template={template[0]} />,
        combo: <Combo template={template[0]} combo={decodeURIComponent(params.rest[1])} />,
        confirmation: <Checkout />,
    }

    return (
        <section
            className='w-full h-full min-h-screen'
            style={{ backgroundColor: template[0].layout.bgColor, color: template[0].layout.textsColor }}
        >
            <div className='min-h-screen max-w-[400px] md:max-w-[600px] mx-auto p-4'>
                <Header iconUrl={`/test/${params.user}/list/confirmation`} />
                {Component[params.rest[0]]}
            </div>
        </section>
    )
}

export default List