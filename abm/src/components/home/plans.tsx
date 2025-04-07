"use client"

import React, { useState } from 'react'

import SuscriptionPlansHeader from '../profile/suscription-plans-header'
import SuscriptionPlansBody from '../profile/suscription-plans-body'
import SuscriptionPlansFooter from '../profile/suscription-plans-footer'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { HoverBorderGradientButton } from './cta-home'
import Link from 'next/link'
import { Doc } from '../../../convex/_generated/dataModel'
import useFlag from '@/hooks/use-flag'

const Plans = () => {
    const isPaymentActive = useFlag('payment')
    const [isAnual, setIsAnual] = useState(true)
    const plans = useQuery(api.plans.getPlansDB)
    const [selectedPlan, setSelectedPlan] = useState<Doc<"plans">>()

    if (!isPaymentActive) return <></>

    return (
        <div className="w-full py-4 px-2 flex flex-col items-center gap-10 bg-gradient-to-b from-slate-400 to-slate-300">
            <SuscriptionPlansHeader
                isAnual={isAnual}
                setIsAnual={setIsAnual}
            />
            <SuscriptionPlansBody
                plans={plans || []}
                isAnual={isAnual}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
            />
            <SuscriptionPlansFooter>
                <Link href='/sign-up'>
                    <HoverBorderGradientButton>
                        Comienza gratis
                    </HoverBorderGradientButton>
                </Link>
            </SuscriptionPlansFooter>
        </div>
    )
}

export default Plans