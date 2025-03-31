import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Card, CardTitle, CardDescription } from '../ui/card'
import { Switch } from '../ui/switch'
import { IconRosetteDiscountCheck } from '@tabler/icons-react'
import { useAction, useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { SheetPayment } from '../sheet-payment'
import SelectPaymentMethod from './select-payment-method'
import { Tab } from '../ui/tabs'
import TransferencePm from './transference-pm'
import MpBrick from '../mp-brick'
import Button from '../buttons/button'
import Success from '../feedbacks/success'
import Error from '../feedbacks/error'
import { SelectedPlan } from './types'
import { AlertDialogComponent } from '../dialog'
import { addDaysToDate, getLocalDateAndTime } from '@/lib/utils'
import FreeTrialMsg from './free-trial-msg'
import LinkWord from '../link-word'
import { feedbacksReferencess } from '@/constants'
import Row from '../row'
import { PreApprovalResponse } from 'mercadopago/dist/clients/preApproval/commonTypes'
import ActiveSuscriptionMsg from './active-suscription-msg'

const SuscriptionPlans = () => {
    const { isSignedIn } = useUser()
    const createSuscription = useAction(api.payment.createSuscription)
    const getActiveSucriptionMP = useAction(api.payment.getSuscriptionMP)
    const plans = useQuery(api.plans.getPlansDB, isSignedIn ? undefined : 'skip')
    const user = useQuery(api.users.getCurrentUser, isSignedIn ? undefined : 'skip')
    const activeSucription = useQuery(api.suscriptions.getActiveSuscription, isSignedIn ? undefined : 'skip')
    const freeTrialStatus = useQuery(api.users.checkFreeTrial, isSignedIn ? undefined : 'skip')
    const activeFreeTrial = useMutation(api.users.updateFreeTrial)
    const [isAnual, setIsAnual] = useState(true)
    const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>()
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

    const premiunValidation = useCallback((plan: SelectedPlan) => {
        const { _id } = plan
        return _id === selectedPlan?._id
    }, [selectedPlan?._id])

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
                title: 'success',
                value: '1',
                reference: 'success'
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
        success:
            <Success title='Se ha suscripto de manera exitosa'>
                <div className='flex flex-col gap-2 w-full'>
                    <span className='text-center'>Mira tu suscripcion en el siguiente enlace:</span>
                    <LinkWord link={activeSucription?.adminUrl || ''} />
                </div>
            </Success>,
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

    return (
        <div className='flex flex-col gap-10'>
            <div className='flex flex-col md:flex-row justify-between items-center text-sm sm:text-medium gap-2 md:gap-0'>
                <div className='flex justify-center items-center gap-2'>
                    <span style={{ opacity: isAnual ? .5 : 1 }}>Mensual</span>
                    <Switch onClick={() => setIsAnual(!isAnual)} checked={isAnual} />
                    <span style={{ opacity: isAnual ? 1 : .5 }}>Anual (-40%)</span>
                </div>
                {/* <div>
                    Precios en Ars
                </div> */}
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
                    <Row title='Poxima fecha de pago:' description={getLocalDateAndTime(suscription?.next_payment_date || '').date} />
                </div>
            }
            <div className='flex flex-wrap flex-col xs:flex-row justify-center items-center gap-5'>
                {
                    plans?.map((p) => (
                        <Card
                            key={p._id}
                            onClick={() => setSelectedPlan(p)}
                            style={{
                                border: premiunValidation(p) ? '1px solid green' : '',
                                transform: premiunValidation(p) ? 'scaleX(1.05) scaleY(1.05)' : '',
                                backgroundColor: premiunValidation(p) ? '#00800050' : ''
                            }}
                            className='relative p-2 cursor-pointer w-[95%] xs:w-[300px] xs:h-[400px] flex flex-col justify-between hover:scale-[1.01] hover:shadow-md hover:shadow-slate-800 transition-all'
                        >
                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex justify-between'>
                                        <CardTitle className='text-lg sm:text-2xl'>
                                            {p.title}
                                        </CardTitle>
                                        {
                                            p?.anual?.price && p?.monthly?.price &&
                                            <CardDescription className='absolute text-black top-0 right-0 bg-orange-300 rounded-tr-lg rounded-bl-lg p-1 shadow-lg'>
                                                {
                                                    isAnual ? `$${p.anual.price} al año` : `$${p.monthly.price} al mes`
                                                }
                                            </CardDescription>
                                        }
                                    </div>
                                    {
                                        p.description &&
                                        <CardDescription>
                                            {
                                                !hasFreeTrial && p.description
                                            }
                                        </CardDescription>
                                    }
                                </div>
                                <ul>
                                    {
                                        p.features.map((f, i) => (
                                            <li key={i} className='flex gap-1'>
                                                <IconRosetteDiscountCheck className='text-green-500' size={18} />
                                                <span className='text-sm'>{f}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </Card>
                    ))
                }
            </div>
            <div className='flex justify-center'>
                {
                    activeSucription ?
                        <LinkWord link={activeSucription?.adminUrl || ''} text='Ver suscripcion' /> :
                        <Button
                            onClick={!hasFreeTrial ? () => setOpenDialog(true) : () => setOpenSheet(true)}
                            disabled={!selectedPlan || selectedPlan?.type === 'free'}
                        >
                            {primaryActionText[freeTrialStatus || '']}
                        </Button>
                }
            </div>
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