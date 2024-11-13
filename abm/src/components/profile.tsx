"use client"
import { UserProfile, useUser } from '@clerk/nextjs'
import React, { useEffect, useRef, useState } from 'react'
import { Tabs } from './ui/tabs'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCreative } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types'
// import { UserProfile } from '@clerk/clerk-react';
import InputCard from './profile/input-card';
import Link from 'next/link';
import { formSchema } from './profile/change-password';
import { z } from 'zod';
import { ClerkAPIError } from '@clerk/types/dist/index'
import LoaderSpinner from './loader-spinner';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { motion } from "framer-motion";

const Profile = () => {
    const { profile } = useParams()
    const { user } = useUser()
    const userConvex = useQuery(api.users.getCurrentUser, !user ? 'skip' : undefined)
    const updateUser = useMutation(api.users.updateUser)
    const swiperRef = useRef<SwiperType>()
    const [openType, setOpenType] = useState('')
    const [moveTabIdx, setMoveTabIdx] = useState<number>(0)

    useEffect(() => {
        if (profile?.length && user && userConvex) {
            const timeout = setTimeout(() => {
                switch (profile[0]) {
                    case 'price':
                        setMoveTabIdx(1)
                        swiperRef.current?.slideTo(1)
                        break;
                    default:
                        break;
                }
                clearTimeout(timeout)
            }, 1)
        }
    }, [profile, user, userConvex])

    if (!user || !userConvex) return <LoaderSpinner />

    const changeUsername = async (data: any) => {
        const { value, setOpen } = data
        try {
            await user?.update({ username: value })
            setOpen(false)
        } catch (error) {
            const _err = error as { errors: ClerkAPIError[] }
            const err = _err.errors[0] as ClerkAPIError
            throw new Error(JSON.stringify(err));
        }
    }

    const changePassword = async (data: z.infer<typeof formSchema>) => {
        const { check, newPassword, oldPassword } = data
        try {
            const a = await user?.updatePassword({ currentPassword: oldPassword, newPassword, signOutOfOtherSessions: Boolean(check) })
            return a
        } catch (error) {
            const _err = error as { errors: ClerkAPIError[] }
            const err = _err.errors[0] as ClerkAPIError
            throw new Error(JSON.stringify(err));

        }
    }

    const changeEmail = async (data: any) => {
        const { value, setOpen } = data
        try {
            const email = await user?.createEmailAddress({ email: value })
            email?.prepareVerification({ strategy: 'email_code' })
            setOpen(false)
        } catch (error) {
            const _err = error as { errors: ClerkAPIError[] }
            const err = _err.errors[0] as ClerkAPIError
            throw new Error(JSON.stringify(err));
        }
    }

    // const handlePhone = async (data: any) => {
    //     const { value } = data
    //     try {
    //         await user?.createPhoneNumber({ phoneNumber: `+54${value}` })
    //     } catch (error) {

    //     }
    // }

    const handlePhone = async (data: any) => {
        const { value, setOpen } = data
        try {
            await updateUser({ phone: `+54${value}` })
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='h-full mx-auto flex flex-col items-center gap-2 max-w-[1000px]'>
            <div className='bg-slate-100 w-full p-4 rounded-sm border'>
                <Tabs
                    tabClassName='hover:opacity-70'
                    tabs={
                        [
                            {
                                title: "Perfil",
                                value: '0',
                            },
                            // {
                            //     title: "Seguridad",
                            //     value: '1',
                            // },
                            {
                                title: "Precios",
                                value: '1',
                            },
                        ]}
                    onClick={(e) => swiperRef?.current?.slideTo(Number(e.value))}
                    moveTabIdx={moveTabIdx}
                />
            </div>
            <div className='bg-slate-100 w-full h-full p-4 rounded-sm border overflow-y-auto'>
                <Swiper
                    effect={'creative'}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: [0, 0, -400],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                    allowTouchMove={false}
                    modules={[EffectCreative]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className='w-full h-full'
                >
                    <SwiperSlide>
                        <div className='flex flex-col gap-4 h-full overflow-y-scroll'>
                            <div className='flex gap-2 bg-slate-300 p-2 rounded-sm'>
                                <span>Vista previa de url:</span>
                                <Link className='hover:underline' href={`https://ebrochure.com/${user?.username}`}>
                                    <span>https://ebrochure.com/{user?.username}</span>
                                </Link>
                            </div>
                            <div className='grid grid-cols-3 p-2 rounded-sm items-start'>
                                <span>Nombre de usuario:</span>
                                <span>{user?.username}</span>
                                <InputCard
                                    type='username'
                                    openType={openType}
                                    title={'Titulo'}
                                    description={'Description'}
                                    handleAccept={changeUsername}
                                    textButton='Cambiar nombre de usuario'
                                    inputValue={user?.username || ''}
                                />
                            </div>
                            <div className='grid grid-cols-3 p-2 rounded-sm items-start'>
                                <span>Contraseña:</span>
                                <span>**********</span>
                                <InputCard
                                    type='password'
                                    openType={openType}
                                    title={'Titulo'}
                                    description={'Description'}
                                    handleAccept={changePassword}
                                    textButton='Cambiar contraseña'
                                />
                            </div>
                            <div className='grid grid-cols-3 p-2 rounded-sm items-start'>
                                <span>Direccion de email:</span>
                                <div className='flex gap-1'>
                                    <span>{user?.primaryEmailAddress?.emailAddress}</span>
                                    <span className='text-xs px-1 rounded-sm flex items-center bg-slate-200'>{user?.primaryEmailAddress?.verification.status}</span>
                                </div>
                                {/* <InputCard
                                    type='email'
                                    openType={openType}
                                    title={'Titulo'}
                                    description={'Description'}
                                    handleAccept={changeEmail}
                                    textButton='Cambiar email'
                                    inputValue={user?.primaryEmailAddress?.emailAddress}
                                /> */}
                            </div>
                            <div className='grid grid-cols-3 p-2 rounded-sm items-start'>
                                <span>Numero de telefono:</span>
                                {/* {
                                    user?.primaryPhoneNumber?.phoneNumber ?
                                        <div>
                                            <span>{user?.primaryPhoneNumber?.phoneNumber}</span>
                                            <span>{user?.primaryPhoneNumber?.verification.status}</span>
                                        </div> :
                                        <InputCard
                                            type='phone'
                                            openType={openType}
                                            title={'Agregar el número de teléfono'}
                                            description={'Se enviará un mensaje de texto con un enlace de verificación a este número de teléfono.'}
                                            handleAccept={handlePhone}
                                            textButton='Agregar numero de telefono'
                                        />
                                } */}
                                {
                                    userConvex?.phone ?
                                        <>
                                            <span>{userConvex?.phone}</span>
                                            <InputCard
                                                type='phone'
                                                openType={openType}
                                                title={'Modificar numero de telefono'}
                                                description={'Cambiar numero'}
                                                handleAccept={handlePhone}
                                                textButton='Modificar numero de telefono'
                                            />
                                        </> :
                                        <InputCard
                                            type='phone'
                                            openType={openType}
                                            title={'Agregar numero de telefono'}
                                            description={'Agregar numero para que los usuarios se puedan comunicar'}
                                            handleAccept={handlePhone}
                                            textButton='Agregar numero de telefono'
                                        />
                                }
                            </div>
                            {/* <div className='grid grid-cols-3'>
                                <span>Cuentas vinculadas:</span>
                                {
                                    user?.externalAccounts[0] ?
                                        <div>
                                            <span>{user?.primaryPhoneNumber?.phoneNumber}</span>
                                            <span>{user?.primaryPhoneNumber?.verification.status}</span>
                                        </div> :
                                        <InputCard
                                            type='phone'
                                            openType={openType}
                                            title={'Titulo'}
                                            description={'Description'}
                                            handleAccept={() => console.log('bbb')}
                                            textButton='Agregar'
                                        />
                                }
                                <div>
                                    <span>{user?.primaryPhoneNumber?.phoneNumber}</span>
                                    <span>{user?.primaryPhoneNumber?.verification.status}</span>
                                </div>
                                <button onClick={() => { }}>Crear</button>
                            </div> */}
                            {/* <div className='grid grid-cols-3'>
                                <span>Elminar cuenta</span>
                                {
                                    user?.externalAccounts[0] ?
                                        <div>
                                            <span>{user?.primaryPhoneNumber?.phoneNumber}</span>
                                            <span>{user?.primaryPhoneNumber?.verification.status}</span>
                                        </div> :
                                        <InputCard
                                            type='phone'
                                            openType={openType}
                                            title={'Titulo'}
                                            description={'Description'}
                                            handleAccept={() => console.log('bbb')}
                                            textButton='Agregar'
                                        />
                                }
                                <div>
                                    <span>{user?.primaryPhoneNumber?.phoneNumber}</span>
                                    <span>{user?.primaryPhoneNumber?.verification.status}</span>
                                </div>
                                <button onClick={() => { }}>Ekiminar cuenta</button>
                            </div> */}
                        </div>
                    </SwiperSlide>
                    {/* <SwiperSlide className='flex-col justify-around items-center overflow-hidden rounded-sm bg-slate-400'>
                        <UserProfile />
                    </SwiperSlide> */}
                    <SwiperSlide>
                        <div className='flex flex-col items-center justify-center gap-4 h-full overflow-y-scroll bg-slate-100'>
                            <motion.h3
                                initial={{ opacity: 0.5, y: 0 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.5,
                                    duration: 0.8,
                                    ease: "easeInOut",
                                }}
                                className="bg-gradient-to-br from-slate-500 to-slate-900 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent"
                            >
                                Proximamente
                            </motion.h3>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}

export default Profile