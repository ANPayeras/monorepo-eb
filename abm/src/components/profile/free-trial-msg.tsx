import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { getLocalDateAndTime } from '@/lib/utils'

const FreeTrialMsg = () => {
    const user = useQuery(api.users.getCurrentUser)

    const { date, time } = getLocalDateAndTime(user?.freeTrial?.endDate!)

    return (
        <div className='text-sm font-bold text-red-500 flex items-center text-center'>
            La prueba gratuita vence el {date} a las {time}
        </div>
    )
}

export default FreeTrialMsg