import Link from 'next/link'
import React from 'react'

const BrandLink = () => {
    return (
        <div className='cursor-pointer absolute top-0 right-0 px-2 py-1 box-content text-[10px] md:text-sm opacity-90 hover:opacity-100 bg-slate-800 rounded-bl-sm text-slate-50 border'>
            <Link
                target='_blank'
                href={process.env.NEXT_PUBLIC_ABM_URL!}
            >
                Hecho con EBrochure
            </Link>
        </div>
    )
}

export default BrandLink