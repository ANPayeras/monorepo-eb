import React, { FC } from 'react'
import { IconBrandFacebook, IconBrandInstagram, IconBrandSnapchat, IconBrandTiktok, IconBrandX, IconMail } from '@tabler/icons-react'
import Link from 'next/link'
import { Doc } from '../../convex/_generated/dataModel'
import useSentEvent from '@/hooks/use-sent-events'
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

const ContactInfoWidget: FC<{ template: Doc<"templates"> }> = ({ template }) => {
    const { sentEvent } = useSentEvent()
    const { contact, layout } = template
    return (
        <>
            {
                contact.length ?
                    <WidgetBaseCard containerClassName='bg-transparent border-none shadow-none hover:scale-100'>
                        <div className='flex justify-center items-center gap-1 w-full p-2'>
                            {
                                contact.filter(c => c.enabled).map((c, i) => {
                                    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                                    const Icon = icons.find(i => i.name === c.title)?.icon!
                                    return (
                                        <Link
                                            key={i}
                                            href={c.url}
                                            target='_blank'
                                            style={{ borderColor: layout.textsColor }}
                                            className="shadow-md flex justify-center items-center w-[40px] h-[40px] rounded-full font-bold border-[1px] hover:scale-105 transition-all"
                                            onClick={() => sentEvent('widget_click', {
                                                type: 'social',
                                                name: c.title,
                                            })}
                                        >
                                            <Icon size={16} />
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </WidgetBaseCard>
                    : <></>
            }
        </>
    )
}

export default ContactInfoWidget