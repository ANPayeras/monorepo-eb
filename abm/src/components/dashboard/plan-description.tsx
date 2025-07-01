"use client"

import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { checkLoadingQuery } from '@/lib/utils'
import LoaderSpinner from '../loader-spinner'
import { Badge } from '../ui/badge'
import { planDescriptionTexts } from '@/constants'

const PlanDescription = () => {
    const { isSignedIn } = useUser()
    const planStatus = useQuery(api.users.checkPlanStatus, isSignedIn ? undefined : 'skip')
    return (
        <div className='flex items-center gap-2'>
            {
                checkLoadingQuery(planStatus) ? <LoaderSpinner size='sm' /> :
                    <>
                        <span className='text-sm md:text-lg'>Tipo de plan:</span>
                        <Link href={'/profile/price'}>
                            <Badge variant={planDescriptionTexts[planStatus].variant}>
                                {planDescriptionTexts[planStatus].title}
                            </Badge>
                        </Link>
                    </>
            }
        </div>
    )
}

export default PlanDescription