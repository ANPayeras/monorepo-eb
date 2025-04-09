import React, { FC } from 'react'
import { Contact, Layout } from '@/stores/data-store'
import ToolsWidget from './tools-widget'
import { SelectSection } from '@/interfaces'
import Link from 'next/link'
import WidgetBaseCard from './widget-base-card'
import { icons } from '@/constants'
import PlaceholdersWidgets from './widgets/placeholders-widgets'

const ContactInfoWidget: FC<{ selectSection?: (type: string) => void, editSection?: SelectSection, contact: Contact[], layout: Layout, props?: any }> = ({ selectSection, editSection, contact, layout, props }) => {
    return (
        <WidgetBaseCard containerClassName='bg-transparent border-none shadow-none hover:border-slate-700 hover:border transition-all'>
            <div className={`hover:border-slate-700 hover:border hover:shadow-sm h-[60px] flex justify-center items-center p-2 gap-1 w-full rounded-md ${!props ? 'active:bg-inherit' : 'active:bg-slate-400'} touch-none`} {...props}>
                {
                    contact.length ? contact.map((c, i) => {
                        const Icon = icons.find(icon => icon.name === c.title)!
                        return (
                            <Link
                                key={i}
                                style={{ borderColor: layout.textsColor }}
                                className='bg-slate-200 flex justify-center items-center w-[40px] h-[40px] rounded-full font-bold border-[1px] hover:scale-105 transition-all shadow-md cursor-pointer'
                                href={c?.url || ''}
                                target='_blank'
                            >
                                <Icon.icon size={16} />
                            </Link>
                        )
                    }) : <PlaceholdersWidgets type='socials' />
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