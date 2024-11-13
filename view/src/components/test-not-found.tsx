import React, { ReactNode } from 'react'
import BaseView from './base-view'

const TemplateNotFound = ({ text }: { text: string | ReactNode }) => {
    return (
        <BaseView>
            <div className='w-80 h-40 border rounded-sm flex justify-center items-center text-slate-50 base-card'>
                <div className='size-full flex justify-center items-center gap-2'>
                    {text}
                </div>
            </div>
        </BaseView>
    )
}

export default TemplateNotFound