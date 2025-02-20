import React, { FC } from 'react'
import { IconBrandFacebook, IconBrandInstagram, IconBrandSnapchat, IconBrandTiktok, IconBrandX, IconEdit, IconMail } from '@tabler/icons-react'
import { Contact, Layout } from '@/stores/data-store'
import ToolsWidget from './tools-widget'
import { SelectSection } from '@/interfaces'
import Link from 'next/link'
import WidgetBaseCard from './widget-base-card'

export const icons = [
    {
        icon: IconBrandInstagram,
        name: 'instagram'
    },
    {
        icon: IconBrandFacebook,
        name: 'fecebook'
    },
    {
        icon: IconBrandX,
        name: 'x'
    },
    {
        icon: IconBrandSnapchat,
        name: 'snapchat'
    },
    {
        icon: IconBrandTiktok,
        name: 'tiktok'
    },
    {
        icon: IconMail,
        name: 'mail'
    },
]

const ContactInfoWidget: FC<{ selectSection?: (type: string) => void, editSection?: SelectSection, contact: Contact[], layout: Layout, props?: any }> = ({ selectSection, editSection, contact, layout, props }) => {
    return (
        <WidgetBaseCard containerClassName='bg-transparent border-none shadow-none hover:border-slate-700 hover:border transition-all'>
            <div className={`hover:border-slate-700 hover:border hover:shadow-sm h-[60px] flex justify-center items-center p-2 gap-1 w-full rounded-sm ${!props ? 'active:bg-inherit' : 'active:bg-slate-400'}`} {...props}>
                {
                    icons.map((ic, i) => {
                        const socialMedia = contact.find(c => c.title === ic.name)
                        const isEnabled = socialMedia?.enabled
                        return (
                            <Link
                                key={i}
                                style={{ borderColor: layout.textsColor, cursor: isEnabled ? 'pointer' : 'unset', pointerEvents: isEnabled ? 'auto' : 'none' }}
                                className={`bg-slate-${!isEnabled && '200'} flex justify-center items-center w-[40px] h-[40px] rounded-full font-bold border-[1px] hover:scale-105 transition-all shadow-md`}
                                href={socialMedia?.url || ''}
                                target='_blank'
                            >
                                <ic.icon size={16} />
                            </Link>
                        )
                    })
                }
            </div>
            {
                selectSection ?
                    <ToolsWidget
                        editFunc={() => selectSection('contact')}
                        isEditing={editSection?.section === 'contact'} />
                    : <></>
            }
        </WidgetBaseCard>
    )
}

export default ContactInfoWidget