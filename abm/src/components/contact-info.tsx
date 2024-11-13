import React, { FC } from 'react'
import { IconBrandFacebook, IconBrandInstagram, IconBrandSnapchat, IconBrandTiktok, IconBrandX, IconEdit, IconMail } from '@tabler/icons-react'
import { Contact, Layout } from '@/stores/data-store'
import ToolsWidget from './tools-widget'
import { SelectSection } from '@/interfaces'
import Link from 'next/link'

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

const ContactInfo: FC<{ selectSection?: (type: string) => void, editSection?: SelectSection, contact: Contact[], layout: Layout }> = ({ selectSection, editSection, contact, layout }) => {
    return (
        <div className='flex justify-between items-center w-full p-2'>
            <div className={`flex justify-center items-center gap-1 ${!selectSection && 'w-full'}`}>
                {
                    !selectSection && contact.filter(c => c.enabled).map((c, i) => {
                        const Icon = icons.find(i => i.name === c.title)?.icon!
                        return (
                            <Link
                                key={i}
                                className="flex justify-center items-center w-[40px] h-[40px] rounded-full font-bold border-[1px]"
                                href={c?.url || ''}
                                target='_blank'
                            >
                                <Icon size={16} />
                            </Link>
                        )
                    })
                }
                {
                    selectSection && icons.map((ic, i) => {
                        const socialMedia = contact.find(c => c.title === ic.name)
                        const isEnabled = socialMedia?.enabled
                        return (
                            <Link
                                key={i}
                                style={{ borderColor: layout.textsColor, cursor: isEnabled ? 'pointer' : 'unset', pointerEvents: isEnabled ? 'auto' : 'none' }}
                                className={`bg-slate-${!isEnabled && '200'} flex justify-center items-center w-[40px] h-[40px] rounded-full font-bold border-[1px]`}
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
        </div>
    )
}

export default ContactInfo