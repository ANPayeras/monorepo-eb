import React, { FC, memo, useEffect } from 'react'
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import { MpBrickInterface } from '@/interfaces';

const MpBrick: FC<MpBrickInterface> = ({ onReady, onUnmount, amount, email }) => {

    useEffect(() => {
        initMercadoPago('APP_USR-eefb00f8-7d0c-4df9-a077-5724c67182e0', { locale: 'es-AR' });
        return () => {
            onUnmount()
            window?.cardPaymentBrickController?.unmount();
        };
    }, []);

    return (
        <>
            <CardPayment
                customization={{
                    paymentMethods: { maxInstallments: 1, minInstallments: 1 },
                    visual: {
                        texts: {
                            formSubmit: "Suscribir",
                        },
                        hidePaymentButton: true,
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