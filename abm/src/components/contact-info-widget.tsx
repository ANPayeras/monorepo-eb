import React from 'react'

import ToolsWidget from './tools-widget'
import { ContactInfoWidgetProps } from '@/interfaces'
import Link from 'next/link'
import { icons } from '@/constants'
import PlaceholdersWidgets from './widgets/placeholders-widgets'
import { useIsSmall } from '@/hooks/use-media.query'
import WidgetBaseCardContainer from './widget-base-card-container'
import { useDataStore } from '@/providers/data-store-providers'

const ContactInfoWidget = ({ selectSection, editSection, contact, layout, props, widget }: ContactInfoWidgetProps) => {
    const { addWidget, widgets } = useDataStore(state => state)
    const isSmall = useIsSmall()

    const editWidget = () => {
        const existWidget = widgets.find(w => w.type === 'socials')
        if (!existWidget) {
            addWidget({
                type: 'socials',
                enabled: false,
                title: 'Redes sociales',
                widgetHandler: 'unique',
                id: '',
            })
        }
        selectSection && selectSection('contact')
    }

    const comp =
        <>
            <div
                className={`h-16 flex justify-center items-center p-2 gap-1 w-full ${!props ? 'sm:active:bg-inherit' : 'sm:active:bg-slate-400'}`}
                style={{
                    justifyContent: widget?.data?.textAlign
                }}
                {...!isSmall && props}
            >
                {
                    contact.length ? contact.map((c, i) => {
                        const Icon = icons?.find(icon => icon.name === c.title)!
                        return (
                            <Link
                                key={i}
                                style={{
                                    borderColor: widget?.data?.textColor || layout.textsColor,
                                    color: widget?.data?.textColor || layout.textsColor
                                }}
                                className='flex justify-center items-center w-[40px] h-[40px] rounded-full font-bold border-[1px] hover:scale-105 transition-all shadow-md cursor-pointer'
                                href={c?.url || ''}
                                target='_blank'
                            >
                                {Icon && <Icon.icon size={16} />}
                            </Link>
                        )
                    }) : <PlaceholdersWidgets type='socials' />
                }
            </div>
            {
                selectSection &&
                <ToolsWidget
                    editFunc={editWidget}
                    isEditing={editSection?.section === 'contact'}
                    {...isSmall && { props }}
                />
            }
        </>

    if (layout.templateLayout === 'classic') {
        return (
            <WidgetBaseCardContainer widget={widget}>
                {comp}
            </WidgetBaseCardContainer>
        )
    } else {
        return comp
    }
}

export default ContactInfoWidget