import React, { FC, memo, useEffect } from 'react'
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import { MpBrickInterface } from '@/interfaces';

const MpBrick: FC<MpBrickInterface> = ({ onReady, onUnmount, amount, email, description }) => {

    useEffect(() => {
        initMercadoPago('APP_USR-eefb00f8-7d0c-4df9-a077-5724c67182e0', { locale: 'es-AR' });
        return () => {
            onUnmount()
            window?.cardPaymentBrickController?.unmount();
        };
    }, []);

    return (
        <>
            <div className='flex flex-col gap-2'>
                <span>
                    Podes pagar con Tarejeta de debito o credito, el pago se procesara por Mercado Pago. <br />
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