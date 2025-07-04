"use client"

import Icon from '@/components/Icon';
import { LAUNCH_DATE } from '@/constants/envs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import SlotCounter from 'react-slot-counter';

const Page = () => {
    const [seconds, setSeconds] = useState<string>('00')
    const [minutes, setMinutes] = useState<string>('00')
    const [hour, setHour] = useState<number>(0)
    const [day, setDay] = useState<number>(0)

    useEffect(() => {
        const launchDate = new Date(LAUNCH_DATE!);
        const timer = setTimeout(() => {
            const now = new Date()

            let seconds = Math.floor((launchDate.valueOf() - (now.valueOf())) / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            let days = Math.floor(hours / 24);

            hours = hours - (days * 24);
            minutes = minutes - (days * 24 * 60) - (hours * 60);
            seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

            if (now > launchDate) {
                clearTimeout(timer)
                window.location.replace('/')
                return
            }

            setSeconds(seconds < 10 ? `0${String(seconds)}` : String(seconds))
            setMinutes(minutes < 10 ? `0${String(minutes)}` : String(minutes))
            setHour(hours)
            setDay(days)
        }, 1000)
    })

    return (
        <main className="absolute h-full w-full top-0 left-0 bg-slate-400 flex items-center justify-center">
            <div className='bg-slate-100 flex flex-col items-center gap-5 w-[900px] max-w-[90%] px-10 py-10 rounded-sm drop-shadow-md'>
                <div>
                    <Image
                        src={'/logo.png'}
                        alt='logo-waitlist'
                        width={100}
                        height={100}
                        className='rounded-full drop-shadow-md'
                    />
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <h2 className='text-4xl sm:text-5xl text-center text-slate-500'>Creemos en la independencia, también la digital.</h2>
                    <p className='border p-2 rounded-sm drop-shadow-md bg-opacity-50 bg-slate-900 text-slate-100'>9/07/2025 - 12:00</p>
                </div>
                <div className='flex items-center gap-2 mt-5'>
                    <h2 className='text-3xl sm:text-5xl text-black'>Días:</h2>
                    <SlotCounter value={day} delay={2} containerClassName='text-3xl sm:text-5xl text-black' autoAnimationStart={false} />
                </div>
                <div className='flex gap-2 text-3xl sm:text-5xl mb-5'>
                    <SlotCounter value={hour < 10 ? `0${hour}` : hour} containerClassName='text-slate-600' autoAnimationStart={false} />:
                    <SlotCounter value={minutes} containerClassName='text-slate-500' autoAnimationStart={false} />:
                    <SlotCounter value={seconds} speed={8} containerClassName='text-slate-400' autoAnimationStart={false} />
                </div>
                <div className='flex gap-2 text-3xl sm:text-5xl'>
                    <h2 className='text-3xl sm:text-5xl text-slate-600'>¿Estás preparad@?</h2>
                </div>
                <div className='flex flex-col text-sm md:text-medium gap-2 items-center text-center'>
                    <h3 className='text-black'>🔔 Suscribite para que te avisemos el día del lanzamiento.</h3>
                    <Link target='_blank' href='https://www.instagram.com/estoy.link?igsh=MW5nZzhoeDg5MHF1cQ==' className='flex gap-2 items-center hover:scale-105 transition-all'>
                        <Icon name='instagram' iconProps={{ size: 30 }} />
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Page