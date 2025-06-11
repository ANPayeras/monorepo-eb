import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { useAction, useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { SheetPayment } from '../sheet-payment'
import SelectPaymentMethod from './select-payment-method'
import { Tab } from '../ui/tabs'
import TransferencePm from './transference-pm'
import MpBrick from '../mp-brick'
import Button from '../buttons/button'
import Error from '../feedbacks/error'
import { AlertDialogComponent } from '../dialog'
import { addDaysToDate } from '@/lib/utils'
import LinkWord from '../link-word'
import { feedbacksReferencess } from '@/constants'
import { PreApprovalResponse } from 'mercadopago/dist/clients/preApproval/commonTypes'
import SuscriptionPlansFooter from './suscription-plans-footer'
import SuscriptionPlansHeader from './suscription-plans-header'
import SuscriptionPlansBody from './suscription-plans-body'
import { Doc } from '../../../convex/_generated/dataModel'
import Pending from '../feedbacks/pending'

const SuscriptionPlans = () => {
    const { isSignedIn } = useUser()
    const createSuscription = useAction(api.payment.createSuscription)
    const getActiveSucriptionMP = useAction(api.payment.getSuscriptionMP)
    const plans = useQuery(api.plans.getPlansDB, isSignedIn ? undefined : 'skip')
    const user = useQuery(api.users.getCurrentUser, isSignedIn ? undefined : 'skip')
    const activeSucription = useQuery(api.suscriptions.getActiveSuscription, isSignedIn ? undefined : 'skip')
    const pendingSucription = useQuery(api.suscriptions.getPendingSuscription, isSignedIn ? undefined : 'skip')
    const freeTrialStatus = useQuery(api.users.checkFreeTrial, isSignedIn ? undefined : 'skip')
    const activeFreeTrial = useMutation(api.users.updateFreeTrial)
    const [isAnual, setIsAnual] = useState(true)
    const [selectedPlan, setSelectedPlan] = useState<Doc<"plans">>()
    const [openSheet, setOpenSheet] = useState<boolean>(false)
    const [pm, setSelectPM] = useState<Tab>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [ready, setReady] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [suscription, setSuscription] = useState<PreApprovalResponse>()

    const getSuscriptionFromMP = useCallback(async () => {
        const suscription = await getActiveSucriptionMP({ id: activeSucription?.subscriptionPreapprovalId! })
        setSuscription(suscription)
    }, [activeSucription?.subscriptionPreapprovalId, getActiveSucriptionMP])

    useEffect(() => {
        if (activeSucription) getSuscriptionFromMP()
    }, [activeSucription, getSuscriptionFromMP])

    const selectedRecurring = useMemo(() => {
        if (selectedPlan) {
            return isAnual ? selectedPlan?.anual : selectedPlan?.monthly
        }
    }, [selectedPlan, isAnual])

    const onSelectPM = useCallback((e: Tab) => {
        setSelectPM(e)
    }, [])

    const suscribe = async () => {
        setIsLoading(true)
        try {
            const plan = isAnual ? selectedPlan?.anual : selectedPlan?.monthly
            const cardFormData = await window?.cardPaymentBrickController?.getFormData()
            await createSuscription({
                token: cardFormData.token,
                email: "test_user_1591280665@testuser.com",
                // email: user.email,
                userId: user?._id!,
                preapproval_plan_id: plan?.id!,
            })
            onSelectPM({
                title: 'pending',
                value: '1',
                reference: 'pending'
            })
        } catch (error) {
            // console.log(error)
            onSelectPM({
                title: 'error',
                value: '1',
                reference: 'error'
            })
        }
        setIsLoading(false)
    }

    const onReady = useCallback(() => {
        setReady(true)
    }, [])

    const onUnmount = useCallback(() => {
        setReady(false)
    }, [])

    const retryPayment = () => {
        onSelectPM({
            title: "Mercado Pago",
            value: '1',
            reference: 'mp'
        })
    }

    const PaymnetMethodComponent: { [index: string]: JSX.Element } = {
        mp:
            <MpBrick
                email={user?.email!}
                amount={Number(selectedRecurring?.price)}
                description={'El pago se procesara por Mercado Pago, una vez realizado podras ver la suscripcion ahi. \n\n El pago puede demorar hasta 24hs en acreditarse'}
                onReady={onReady}
                onUnmount={onUnmount}
            />,
        transference: <TransferencePm reference={`${user?._id}-${selectedRecurring?.id?.slice(-4)}`} />,
        pending:
            <Pending title='Suscripcion en proceso'>
                <div className='flex w-full'>
                    <span className='text-center'>Una vez validado el pago, se activara la suscripcion. Este proceso puede demorar hasta 2 horas</span>
                </div>
            </Pending>,
        error:
            <Error title='Hubo un error, por favor reintente'>
                <Button
                    onClick={retryPayment}
                >
                    Reintentar
                </Button>
            </Error>
    }

    const handleChangeSheet = () => {
        setOpenSheet(!openSheet)
    }

    const primaryActionText: { [key: string]: string } = {
        never: 'Activar prueba gratuita',
        true: 'Seleccionar método de pago',
        false: 'Seleccionar método de pago',

    }

    const confirmFreeTrial = async () => {
        const startDate = new Date()
        const endDate = addDaysToDate(startDate, 7)
        await activeFreeTrial({ active: true, startDate: startDate.toISOString(), endDate: endDate.toISOString() })
    }

    const isFreeTrialActive = useMemo(() => {
        return freeTrialStatus === 'true'
    }, [freeTrialStatus])

    const hasFreeTrial = useMemo(() => {
        return freeTrialStatus !== 'never'
    }, [freeTrialStatus])

    useEffect(() => {
        if (isFreeTrialActive || activeSucription) {
            const premiunPlan = plans?.find(p => p.premium)
            setSelectedPlan(premiunPlan)
        }
    }, [isFreeTrialActive, plans, activeSucription])

    useEffect(() => {
        if (feedbacksReferencess.includes(String(pm?.reference)) && activeSucription) {
            onSelectPM({
                reference: "transference",
                title: "Transferencia",
                value: "0"
            })
            setOpenSheet(false)
        }
    }, [activeSucription, onSelectPM, pm])

    return (
        <div className='w-full h-full flex flex-col gap-10'>
            <SuscriptionPlansHeader
                activeSucription={activeSucription}
                isAnual={isAnual}
                isFreeTrialActive={isFreeTrialActive}
                setIsAnual={setIsAnual}
                suscription={suscription}
            />
            <SuscriptionPlansBody
                plans={plans || []}
                hasFreeTrial={hasFreeTrial}
                isAnual={isAnual}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
            />
            <SuscriptionPlansFooter>
                {
                    activeSucription ?
                        <LinkWord link={activeSucription?.adminUrl || ''} text='Ver suscripción' /> :
                        <Button
                            onClick={!hasFreeTrial ? () => setOpenDialog(true) : () => setOpenSheet(true)}
                            disabled={!selectedPlan || selectedPlan?.type === 'free' || !!pendingSucription}
                            leftIconName={pendingSucription ? 'clockFilled' : undefined}
                        >
                            {pendingSucription ? 'Validando suscripción' : primaryActionText[freeTrialStatus || '']}
                        </Button>
                }
            </SuscriptionPlansFooter>
            <SheetPayment
                open={openSheet}
                handleChange={handleChangeSheet}
                title={activeSucription ? '' : selectedPlan?.title || ''}
                description={isFreeTrialActive ? 'Dejaras de tener la prueba gratuita.' : ''}
                descriptionClassName='text-red-500'
            >
                <div className='flex flex-col'>
                    {
                        !feedbacksReferencess.includes(String(pm?.reference)) &&
                        <SelectPaymentMethod tab={Number(pm?.value)} onSelectPM={onSelectPM} />
                    }
                    {PaymnetMethodComponent[pm?.reference || 'transference']}
                    {
                        ready &&
                        <div className='w-full flex justify-center items-center'>
                            <Button
                                className='w-1/2'
                                onClick={suscribe}
                                isLoading={isLoading}
                                spinnerColor='white'
                            >
                                Suscribirse
                            </Button>
                        </div>
                    }
                </div>
            </SheetPayment>
            <AlertDialogComponent
                open={openDialog}
                onOpenChange={() => setOpenDialog(false)}
                onConfirm={confirmFreeTrial}
                title={'Activar prueba gratuita?'}
                description={'\nAl activarla, tendras 7 dias para usar todas las funciones sin nigun costo. Pasado ese tiempo deberas suscribirte para poder seguir usando las mismas. \n\nSi cancelas en algun momento la prueba, ya no podras volver a activarla.'}
                acceptText='Si'
            />
        </div>
    )
}

export default SuscriptionPlans