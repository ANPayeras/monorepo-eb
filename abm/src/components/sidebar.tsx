"use client"
import React, { useState } from 'react'
import { SidebarBody, SidebarLink, Sidebar } from './ui/sidebar'
import { IconArrowLeft, IconBrandTabler, IconLayout, IconTemplate, IconTool, IconUserCircle } from '@tabler/icons-react';
import { useClerk } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

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
        label: "Cerrar sesion",
        href: "/",
        icon: (
            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        id: 'logout',
    },
];

const LeftSidebar = () => {
    const { signOut } = useClerk()
    const pathname = usePathname()
    const [open, setOpen] = useState<boolean>(false)

    const checkUrlBuild = (): string => {
        const isEditing = pathname.includes('build') && pathname.split('/').length === 3
        return isEditing ? pathname : '/build'
    }

    return (
        <section className='fixed h-auto w-full md:w-auto md:h-full z-50'>
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-10 md:border-r-1">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <div>
                            <Image
                                className='h-full w-10 rounded-sm'
                                src={'/logo.png'}
                                alt={'logo'}
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => {
                                const isActive = pathname.includes(link.href)
                                return (
                                    link.id === 'logout' ?
                                        <span key={idx} onClick={() => signOut()}>
                                            <SidebarLink className='hover:bg-slate-200 rounded-sm' link={link} />
                                        </span> :
                                        link.id === 'build' ?
                                            <span key={idx}>
                                                <SidebarLink className='hover:bg-slate-200 rounded-sm' link={{ ...link, href: checkUrlBuild() }} />
                                            </span> :
                                            < SidebarLink className={`${isActive && 'bg-slate-200'} hover:bg-slate-200 rounded-sm`} key={idx} link={link} />
                                )
                            })}
                        </div>
                    </div>
                    <div className='overflow-y-auto overflow-x-hidden'>
                        <SidebarLink
                            className='hover:bg-slate-200 rounded-sm'
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