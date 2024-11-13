import React from 'react'
import BaseView from '@/components/base-view'
import { IconError404 } from '@tabler/icons-react'

const NotFound = () => {
    return (
        <BaseView>
            <div className='w-80 h-40 border rounded-sm flex justify-center items-center text-slate-50 base-card'>
                <div className='size-full flex justify-center items-center gap-2'>
                    Ups parece que esta pagina no existe <IconError404 />
                </div>
            </div>
        </BaseView>
    )
}

export default NotFound