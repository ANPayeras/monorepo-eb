"use client"
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import Link from 'next/link'
import CopyLink from '../copy-link'
import LoaderSpinner from '../loader-spinner'
import Template from '../template'
import { useUser } from '@clerk/nextjs'

const ActiveTemplate = () => {
    const { user } = useUser()
    const template = useQuery(api.templates.getActiveTemplate, !user ? 'skip' : undefined)

    const viewUrl = `${process.env.NEXT_PUBLIC_VIEW_URL}${user?.username}`

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
                                        <Link href={`/build/${template[0]?._id}`} className='bg-slate-300 p-1 rounded-sm text-slate-900 hover:text-slate-50 hover:bg-slate-800'>
                                            <span>
                                                Modificar
                                            </span>
                                        </Link> : <></>
                                }
                            </div>
                            {
                                template?.length ?
                                    <div className='flex items-center justify-between'>
                                        <Link href={viewUrl} target='_blank' className='hover:underline'>
                                            <span>{viewUrl}</span>
                                        </Link>
                                        <CopyLink url={viewUrl} />
                                    </div> : <></>
                            }
                        </div>
                        {
                            template?.length ?
                                <Template {...{ template: template[0], user: user! }} /> :
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