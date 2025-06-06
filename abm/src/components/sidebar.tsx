"use client"

import React, { useState } from 'react'
import { SidebarBody, SidebarLink, Sidebar } from './ui/sidebar'
import { IconArrowLeft, IconBrandTabler, IconBrush, IconChartBarPopular, IconLayout, IconTemplate, IconTool, IconUserCircle } from '@tabler/icons-react';
import { useClerk, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Link from 'next/link';
import { useDataStore } from '@/providers/data-store-providers';

const links = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Construir",
        href: "/build",
        icon: (
            <IconTool className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        id: "build",
    },
    {
        label: "Tus plantillas",
        href: "/templates",
        icon: (
            <IconTemplate className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Diseños",
        href: "/layouts",
        icon: (
            <IconLayout className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Editar imagen",
        href: "/tools",
        icon: (
            <IconBrush className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    }
];

const premiumLinks = [
    {
        label: "Métricas",
        href: "/metrics",
        icon: (
            <IconChartBarPopular className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
]

const LeftSidebar = () => {
    const { signOut } = useClerk()
    const pathname = usePathname()
    const { isSignedIn } = useUser()
    const { templateBuildId } = useDataStore(state => state)
    const user = useQuery(api.users.getCurrentUser, !isSignedIn ? 'skip' : undefined)
    const [open, setOpen] = useState<boolean>(false)

    const checkUrlBuild = (): string => {
        return templateBuildId ? `/build/${templateBuildId}` : '/build'
    }

    const _links = [...links, ...(user?.isPremium && premiumLinks || [])]

    return (
        <section className='fixed h-auto w-full md:w-auto md:h-full z-50'>
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-10 md:border-r-1">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <Link href={'/'} className='w-fit'>
                            <Image
                                className='h-full w-10 rounded-sm'
                                src={'/logo.png'}
                                alt={'logo'}
                                width={100}
                                height={100}
                            />
                        </Link>
                        <div className="mt-8 flex flex-col gap-2">
                            {_links.map((link, idx) => {
                                const isActive = pathname.includes(link.href)
                                return (
                                    link.href === '/build' ?
                                        <span key={idx}>
                                            <SidebarLink {...{ onClick: () => setOpen(false) }} className={`${isActive && 'bg-slate-200'} transition-all hover:bg-slate-200 rounded-sm`} link={{ ...link, href: checkUrlBuild() }} />
                                        </span> :
                                        < SidebarLink {...{ onClick: () => setOpen(false) }} className={`${isActive && 'bg-slate-200'} transition-all hover:bg-slate-200 rounded-sm`} key={idx} link={link} />
                                )
                            })}
                            <SidebarLink
                                {...{
                                    onClick: () => {
                                        setOpen(false)
                                        signOut()
                                    }
                                }}
                                className='hover:bg-slate-200 transition-all rounded-sm'
                                link={{
                                    label: "Cerrar sesion",
                                    href: "/",
                                    icon: (
                                        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                    )
                                }} />
                        </div>
                    </div>
                    <div className='overflow-y-auto overflow-x-hidden'>
                        <SidebarLink
                            {...{ onClick: () => setOpen(false) }}
                            className='hover:bg-slate-200 transition-all rounded-sm'
                            link={{
                                label: "Perfil",
                                href: "/profile",
                                icon: (
                                    <IconUserCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
        </section>
    )
}

export default LeftSidebar