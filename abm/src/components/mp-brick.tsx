import React, { FC, memo, useEffect } from 'react'
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import { MpBrickInterface } from '@/interfaces';
import { MP_API_KEY } from '@/constants/envs';

const MpBrick: FC<MpBrickInterface> = ({ onReady, onUnmount, amount, email, description }) => {

    useEffect(() => {
        initMercadoPago(MP_API_KEY!, { locale: 'es-AR' });
        return () => {
            onUnmount()
            window?.cardPaymentBrickController?.unmount();
        };
    }, [onUnmount]);

    return (
        <>
            <div className='flex flex-col gap-2'>
                <span>
                    Podes pagar con Tarjeta de debito o credito, el pago se procesara por Mercado Pago. <br />
                    Veras tu suscripcion activa ahi.
                </span>
                <span>
                    {description}
                </span>
            </div>
            <CardPayment
                customization={{
                    paymentMethods: { maxInstallments: 1, minInstallments: 1 },
                    visual: {
                        texts: {
                            formSubmit: "Suscribir",
                        },
                        hidePaymentButton: true,
                        hideFormTitle: true,
                    },
                }}
                initialization={{ amount, payer: { email } }}
                onSubmit={async () => { }}
                onReady={onReady}
            />
        </>
    )
}

export default memo(MpBrick)