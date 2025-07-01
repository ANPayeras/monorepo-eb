import React from 'react'

import FreeTrialMsg from './free-trial-msg'
import ActiveSuscriptionMsg from './active-suscription-msg'
import { Switch } from '../ui/switch'
import Row from '../row'
import { getLocalDateAndTime } from '@/lib/utils'
import { SuscriptionPlansHeaderProps } from './types'

const SuscriptionPlansHeader = ({
    isAnual,
    setIsAnual,
    isFreeTrialActive,
    activeSucription,
    suscription,
}: SuscriptionPlansHeaderProps) => {
    return (
        <>
            <div className='flex flex-col md:flex-row justify-between items-center text-sm sm:text-medium gap-2 md:gap-0'>
                <div className='flex justify-center items-center gap-2'>
                    <span style={{ opacity: isAnual ? .5 : 1 }}>Mensual</span>
                    <Switch onClick={() => setIsAnual(!isAnual)} checked={isAnual} />
                    <span style={{ opacity: isAnual ? 1 : .5 }}>Anual (-40%)</span>
                </div>
                {
                    isFreeTrialActive &&
                    <FreeTrialMsg />
                }
                {
                    activeSucription && !isFreeTrialActive &&
                    <ActiveSuscriptionMsg />
                }
            </div>
            {
                activeSucription &&
                <div>
                    <Row title='Nombre del plan:' description={suscription?.reason || ''} />
                    <Row title='Precio:' description={`$ ${String(suscription?.auto_recurring?.transaction_amount || '')}`} />
                    <Row title='Próxima fecha de pago:' description={getLocalDateAndTime(suscription?.next_payment_date || '').date} />
                </div>
            }
        </>
    )
}

export default SuscriptionPlansHeader