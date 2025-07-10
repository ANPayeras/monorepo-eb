import React, { FC } from 'react'

import { useDataStore } from '@/providers/data-store-providers'
import PaymentMethodsWidget from '../payment-methods-widget'
import DeliverMethodsWidget from '../deliver-methods-widget'
import ContactInfoWidget from '../contact-info-widget'
import { EmptyLayoutProps } from '@/interfaces'
import TextWidget from '../text-widget'
import { Widget } from '@/stores/data-store'
import LinkWidget from '../link-widget'
import { ResizableWidget } from '../resizable-widget'
import DndList from '../dndList/dnd-list'
import ImgWidget from '../img-widget'

const EmptyLayout: FC<EmptyLayoutProps> = ({ selectSection, editSection, data: { layout, contact, paymentMethods, deliverMethods } }) => {
    const widgets = useDataStore(state => state.widgets)
    const updateWidgetOrder = useDataStore(state => state.updateWidgetOrder)

    const renderWidget = (widget: Widget, props: any) => {
        const widgetsComponents: { [key: string]: JSX.Element } = {
            text: <TextWidget {...{ widget, selectSection, editWidget: editSection.widget as Widget, layout, props }} />,
            link: <LinkWidget {...{ widget, selectSection, editWidget: editSection.widget as Widget, layout, props }} />,
            pm: <PaymentMethodsWidget {...{ widget, selectSection, editSection, paymentMethods, layout, props }} />,
            dm: <DeliverMethodsWidget {...{ widget, selectSection, editSection, deliverMethods, layout, props }} />,
            socials: <ContactInfoWidget {...{ widget, selectSection, editSection, contact, layout, props }} />,
            resizable: <ResizableWidget {...{ widget, selectSection, editWidget: editSection.widget as Widget, layout, props }} />,
            img: <ImgWidget {...{ widget, selectSection, editWidget: editSection.widget as Widget, layout, props }} />,
        }

        return widget ? widgetsComponents[widget.type] : <></>
    }

    return (
        <DndList
            data={widgets}
            onRender={renderWidget}
            onDataUpdate={updateWidgetOrder}
        />
    )
}

export default EmptyLayout