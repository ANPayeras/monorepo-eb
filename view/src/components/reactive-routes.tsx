"use client"

import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Loader } from 'lucide-react'
import All from './all'
import Combo from './combo'
import Checkout from './checkout'
import Header from './header'
import BgVideoPlayer from './bg-video'

const ReactiveRoutes = ({ user, component, combo = '', test = false }: { user: string, component: string, combo: string, test?: boolean }) => {
    const data = useQuery(api.templates.getTemplate, { user, test })!

    if (!data) return <Loader />

    const template = data.template[0]

    const Component: {
        [index: string]: JSX.Element;
    } = {
        all: <All template={template} />,
        combo: <Combo template={template} combo={decodeURIComponent(combo)} />,
        confirmation: <Checkout user={data.user} />,
    }

    const { bgColor, textsColor, backgroundImg, backgroundVideo } = template.layout

    return (
        <section
            className='w-full h-full min-h-screen flex justify-center'
            style={{
                backgroundColor: bgColor, color: textsColor,
                backgroundImage: `url(${backgroundImg.uploadImgUrl || ''})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            {
                backgroundVideo?.uploadVideoUrl && <BgVideoPlayer src={backgroundVideo.uploadVideoUrl} className='rounded-none' />
            }
            <div className='absolute w-full min-h-screen max-w-[400px] md:max-w-[600px] p-4'>
                <Header iconUrl={`/${test ? 'test' : 't'}/${user}/list/confirmation`} />
                {Component[component]}
            </div>
        </section>
    )
}

export default ReactiveRoutes