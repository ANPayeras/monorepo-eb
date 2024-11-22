"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useUser, } from '@clerk/nextjs'
import { Tabs } from './ui/tabs'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCreative } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types'
// import { UserProfile } from '@clerk/clerk-react';
import InputCard from './profile/input-card';
import { formSchema } from './profile/change-password';
import { z } from 'zod';
import { ClerkAPIError } from '@clerk/types/dist/index'
import LoaderSpinner from './loader-spinner';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { statusClerk } from '@/constants';
import { Compare } from './ui/compare';
import Plans from './profile/plans';

const Profile = () => {
    const { profile } = useParams()
    const { user } = useUser()
    const userConvex = useQuery(api.users.getCurrentUser, !user ? 'skip' : undefined)
    const updateUser = useMutation(api.users.updateUser)
    const swiperRef = useRef<SwiperType>()
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
            await user?.updatePassword({ currentPassword: oldPassword, newPassword, signOutOfOtherSessions: Boolean(check) })
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
                            <div className='flex flex-col text-sm xs:text-medium md:flex-row p-2 gap-5 md:justify-between items-start min:h-14 border-b'>
                                <div className='flex flex-1 flex-col xs:flex-row xs:gap-5 xs:items-center'>
                                    <span>Nombre de usuario:</span>
                                    <span className='font-bold'>{user?.username}</span>
                                </div>
                                <InputCard
                                    type='username'
                                    title={'Cambiar nombre de usuario'}
                                    handleAccept={changeUsername}
                                    textButton='Cambiar nombre de usuario'
                                    inputValue={user?.username || ''}
                                />
                            </div>
                            <div className='flex flex-col text-sm xs:text-medium md:flex-row p-2 gap-5 md:justify-between items-start min:h-14 border-b'>
                                <div className='flex flex-1 flex-col xs:flex-row xs:gap-5 xs:items-center'>
                                    <span>Contraseña:</span>
                                    <span className='font-bold'>{user.passwordEnabled ? '********' : 'No hay contraseña'}</span>
                                </div>
                                <InputCard
                                    type='password'
                                    isPassword={user.passwordEnabled}
                                    handleAccept={changePassword}
                                    textButton={user.passwordEnabled ? 'Cambiar contraseña' : 'Establecer contraseña'}
                                />
                            </div>
                            <div className='flex flex-col text-sm xs:text-medium md:flex-row p-2 gap-5 md:justify-between items-start min:h-14 border-b'>
                                <div className='flex flex-1 flex-col xs:flex-row xs:gap-5 xs:items-center'>
                                    <span>Direccion de email:</span>
                                    <div className='flex gap-1'>
                                        <span className='font-bold'>{user?.primaryEmailAddress?.emailAddress}</span>
                                        <span className='text-xs px-1 rounded-sm flex items-center bg-slate-200'>{statusClerk[user?.primaryEmailAddress?.verification.status || 'failed']}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col text-sm xs:text-medium md:flex-row p-2 gap-5 md:justify-between items-start min:h-14'>
                                <div className='flex flex-1 flex-col xs:flex-row xs:gap-5 xs:items-center'>
                                    <span>Numero de telefono:</span>
                                    <span className='font-bold'>{userConvex?.phone ? userConvex?.phone : 'No hay número de teléfono'}</span>
                                </div>
                                <InputCard
                                    type='phone'
                                    title={userConvex?.phone ? 'Modificar numero de telefono' : 'Agregar numero de telefono'}
                                    handleAccept={handlePhone}
                                    textButton={userConvex?.phone ? 'Modificar numero de telefono' : 'Agregar numero de telefono'}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                    {/* <SwiperSlide className='flex-col justify-around items-center overflow-hidden rounded-sm bg-slate-400'>
                        <UserProfile />
                    </SwiperSlide> */}
                    <SwiperSlide>
                        <div className='flex flex-col items-center justify-start gap-4 h-full overflow-y-scroll bg-slate-100'>
                            {/* <motion.h3
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
                            </motion.h3> */}
                            {/* <CardPayment
                                // customization={{ paymentMethods: { maxInstallments: 1, minInstallments: 1 } }}
                                initialization={{ amount: 5000 }}
                                onSubmit={() => createPlan({})}
                            /> */}
                            <div className='w-full'>
                                <Compare
                                    firstImage="https://assets.aceternity.com/code-problem.png"
                                    secondImage="https://assets.aceternity.com/code-solution.png"
                                    firstImageClassName="object-cover object-left-top"
                                    secondImageClassname="object-cover object-left-top"
                                    className="w-full"
                                    slideMode="drag"

                                />
                            </div>
                            <Plans />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}

export default Profile