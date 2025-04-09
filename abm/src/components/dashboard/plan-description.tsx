"use client"

import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { checkLoadingQuery, cn } from '@/lib/utils'
import LoaderSpinner from '../loader-spinner'

const PlanDescription = () => {
    const { isSignedIn } = useUser()
    const activeSuscription = useQuery(api.suscriptions.getActiveSuscription, isSignedIn ? undefined : 'skip')
    return (
        <div className='flex items-center gap-2 text-[12px]'>
            {
                checkLoadingQuery(activeSuscription) ? <LoaderSpinner size='sm' /> :
                    <>
                        <span className={cn('p-1 rounded-sm', activeSuscription ? 'bg-green-500' : 'bg-red-300')}>
                            {!activeSuscription ? 'Gratuito' : 'Premium'}
                        </span>
                        <Link href={'/profile/price'} className='hover:underline transition-all'>
                            {!activeSuscription ? 'Cambiar de plan' : 'Ver'}
                        </Link>
                    </>
            }
        </div>
    )
}

export default PlanDescription