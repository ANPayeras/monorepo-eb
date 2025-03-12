"use client"
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Loader } from 'lucide-react'
import All from './all'
import Combo from './combo'
import Checkout from './checkout'
import Header from './header'

const ReactiveRoutes = ({ user, component, combo = '', test = false }: { user: string, component: string, combo: string, test?: boolean }) => {
    const data = useQuery(api.templates.getTemplate, { user, test })!

    if (!data) return <Loader />

    const template = data.template

    const Component: {
        [index: string]: JSX.Element;
    } = {
        all: <All template={template[0]} />,
        combo: <Combo template={template[0]} combo={decodeURIComponent(combo)} />,
        confirmation: <Checkout user={data.user} />,
    }

    return (
        <section
            className='w-full h-full min-h-screen'
            style={{ backgroundColor: template[0].layout.bgColor, color: template[0].layout.textsColor }}
        >
            <div className='min-h-screen max-w-[400px] md:max-w-[600px] mx-auto p-4'>
                <Header iconUrl={`/${test ? 'test' : 't'}/${user}/list/confirmation`} />
                {Component[component]}
            </div>
        </section>
    )
}

export default ReactiveRoutes