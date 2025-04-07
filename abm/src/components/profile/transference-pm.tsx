import React from 'react'

import CopyLink from '../copy-link'

const TransferencePm = ({ reference }: { reference: string }) => {
    return (
        <div className='flex flex-col gap-2 text-sm xs:text-medium text-center'>
            <span>Envia una transferencia al siguiente CBU:</span>
            <div className='flex justify-center items-center gap-2'>
                <span className='font-bold'>0212020293020320302003</span>
                <CopyLink text='0212020293020320302003' />
            </div>
            <span>Una vez realizada enviar el comprobante al siguiente email:</span>
            <div className='flex justify-center items-center gap-2'>
                <span className='font-bold'>payerasangel@gmail.com</span>
                <CopyLink text='payerasangel@gmail.com' />
            </div>
            <span>En el asunto colocar la siguiente referencia:</span>
            <div className='flex justify-center items-center gap-2'>
                <span className='font-bold text-xs sm:text-sm'>{reference}</span>
                <CopyLink text={reference} />
            </div>
        </div>
    )
}

export default TransferencePm