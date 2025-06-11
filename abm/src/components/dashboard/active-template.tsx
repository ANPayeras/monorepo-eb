"use client"

import React from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import Link from 'next/link'
import CopyLink from '../copy-link'
import LoaderSpinner from '../loader-spinner'
import Template from '../template'
import { useUser } from '@clerk/nextjs'
import { VIEW_URL } from '@/constants/envs'
import { useRouter } from 'next/navigation'
import Icon from '../Icon'

const ActiveTemplate = () => {
    const { user } = useUser()
    const template = useQuery(api.templates.getActiveTemplate, !user ? 'skip' : undefined)
    const changeLastBuild = useMutation(api.templates.changeLastBuild)
    const router = useRouter()

    const viewUrl = `${VIEW_URL}/${user?.username}`

    const editTemplate = async () => {
        try {
            await changeLastBuild({ _id: template![0]._id })
            router.push(`/build/${template![0]._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-full w-full max-w-[400px] flex flex-col gap-2 flex-1'>
            {
                !template ? <LoaderSpinner /> :
                    <>
                        <div className='bg-slate-50 border rounded-sm p-2 flex flex-col gap-4'>
                            <div className='flex items-center justify-between'>
                                <span>Plantilla activa</span>
                                {
                                    template?.length ?
                                        <button
                                            className='hover:scale-105 transition-all'
                                            onClick={editTemplate}
                                        >
                                            <Icon name='edit' iconProps={{ size: 18 }} />
                                        </button> : <></>
                                }
                            </div>
                            {
                                template?.length ?
                                    <div className='flex items-center justify-between'>
                                        <Link href={viewUrl} target='_blank' className='overflow-hidden text-ellipsis text-nowrap hover:underline'>
                                            <span>{viewUrl}</span>
                                        </Link>
                                        <CopyLink text={viewUrl} />
                                    </div> : <></>
                            }
                        </div>
                        {
                            template?.length ?
                                <Template {...{ template: template[0], username: user?.username || '' }} /> :
                                <div className='bg-slate-50 border rounded-sm p-2 text-center text-medium flex flex-col gap-4 h-full justify-center'>
                                    <p>Ups, parece que todavia no tienes una plantilla activa</p>
                                    <p>Agrega una para comenzar a usar EBrochure</p>
                                    <Link href='/templates' className='bg-slate-300 p-1 rounded-sm text-slate-900 hover:text-slate-50 hover:bg-slate-800'>
                                        <span>
                                            Activar plantilla
                                        </span>
                                    </Link>
                                </div>
                        }
                    </>
            }
        </div>
    )
}

export default ActiveTemplate