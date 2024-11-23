import React from 'react'

const TransferencePm = ({ userId }: { userId: string }) => {
    return (
        <div className='flex flex-col gap-2 text-sm xs:text-medium text-center'>
            <span>Envia una trasnferenica al siuginete CBU:</span>
            <span className='font-bold'>Lorem ipsum dolor sit amet.</span>
            <span>Una vez hecha la trasnferecia enviar el comporbante al siguiente email:</span>
            <span className='font-bold'>payerasangel@gmail.com</span>
            <span>En el asusnto colocar lo siguinete:</span>
            <span className='font-bold'>{userId}</span>
        </div>
    )
}

export default TransferencePm