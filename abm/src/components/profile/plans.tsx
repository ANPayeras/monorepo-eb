import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAction, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { SheetPayment } from '../sheet-payment'
import { PreApprovalPlans, PreApprovalPlansItem } from '../../../convex/payment'
import LoaderSpinner from '../loader-spinner'
import MpBrick from '../mp-brick'
import SelectPaymentMethod from './select-payment-method'
import { Tab } from '../ui/tabs'
import TransferencePm from './transference-pm'

const Plans = () => {
    const user = useQuery(api.users.getCurrentUser)
    const getPlansApi = useAction(api.payment.getPlans)
    const createSuscription = useAction(api.payment.createSuscription)
    const [plans, setPlans] = useState<PreApprovalPlans[] | null>(null)
    const [openSheet, setOpenSheet] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [ready, setReady] = useState<boolean>(false)
    const [pm, setSelectPM] = useState<Tab>()
    const [selectedPlan, setSelectedPlan] = useState<PreApprovalPlansItem>()

    useEffect(() => {
        const getPlans = async () => {
            const _plans = await getPlansApi()
            setPlans(_plans)
        }
        getPlans()
    }, [getPlansApi])

    const onReady = useCallback(() => {
        setReady(true)
    }, [])

    const onUnmount = useCallback(() => {
        setReady(false)
    }, [])

    const onSelectPM = useCallback((e: Tab) => {
        setSelectPM(e)
    }, [])

    if (!plans || !user) return

    const selectPlan = (e: ChangeEvent<HTMLInputElement>, p: PreApprovalPlansItem) => {
        const { checked } = e.target
        setSelectedPlan(checked ? p : undefined)
    }

    const suscribe = async () => {
        setLoading(true)
        try {
            const cardFormData = await window?.cardPaymentBrickController?.getFormData()
            const suscription = await createSuscription({
                token: cardFormData.token,
                email: "test_user_1591280665@testuser.com",
                // preapproval_plan_id: "2c938084934d1f1701934ff0eb0500dd",
                userId: user._id,
                // email: user.email,
                preapproval_plan_id: selectedPlan?.id!,
            })
            console.log(suscription)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const PaymnetMethodComponent: { [index: string]: JSX.Element } = {
        card:
            <MpBrick
                email={user.email}
                amount={selectedPlan?.auto_recurring?.transaction_amount!}
                description={selectedPlan?.description!}
                onReady={onReady}
                onUnmount={onUnmount}
            />,
        transference: <TransferencePm userId={user._id} />
    }

    return (
        <div className='flex flex-col gap-5 w-full'>
            <span className='border-b border-t text-center py-1 text-sm md:text-medium '>
                Elegi un plan (todos incluyen las mismas funciones)
            </span>
            <div>
                {
                    plans.map((p) => (
                        <div key={p.type} className='flex flex-col gap-2 xs:gap-0 text-sm md:text-medium xs:flex-row w-full items-center justify-between border-b'>
                            <span className='my-2'>
                                {p.type}:
                            </span>
                            <div className='flex flex-col xs:flex-row gap-0 xs:gap-3 items-start'>
                                <div className='flex gap-1 items-center'>
                                    <Input type='checkbox' className='w-4 h-4 accent-black cursor-pointer' checked={selectedPlan?.id === p.plans.monthlyPlan?.id} onChange={(e) => selectPlan(e, p.plans.monthlyPlan!)} />
                                    <span>$ {p.plans.monthlyPlan?.auto_recurring?.transaction_amount} por mes</span>
                                </div>
                                <span className='hidden xs:flex w-[0.5px] border-[0.5px] h-[20px] bg-slate-900' />
                                <div className='flex gap-1 items-center'>
                                    <Input type='checkbox' className='w-4 h-4 accent-black cursor-pointer' checked={selectedPlan?.id === p.plans.anualPlan?.id} onChange={(e) => selectPlan(e, p.plans.anualPlan!)} />
                                    <span>o un unico pago de ${p.plans.anualPlan?.auto_recurring?.transaction_amount}</span>
                                    <span className='bg-green-200 font-bold text-green-600 rounded-sm px-1'>-{p.discount}%</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='w-full flex justify-center items-center'>
                <Button
                    disabled={!selectedPlan}
                    onClick={() => setOpenSheet(true)}
                >
                    Pagar
                </Button>
            </div>
            <SheetPayment
                open={openSheet}
                handleChange={setOpenSheet}
                title={selectedPlan?.reason!}
            >
                <div className='flex flex-col'>
                    <SelectPaymentMethod tab={Number(pm?.value)} onSelectPM={onSelectPM} />
                    {PaymnetMethodComponent[pm?.reference || 'transference']}
                    {
                        ready &&
                        <div className='w-full flex justify-center items-center'>
                            {
                                loading ?
                                    <LoaderSpinner /> :
                                    <Button
                                        onClick={suscribe}
                                    >
                                        Suscribirse
                                    </Button>
                            }
                        </div>
                    }
                </div>
            </SheetPayment>
        </div>
    )
}

export default Plans