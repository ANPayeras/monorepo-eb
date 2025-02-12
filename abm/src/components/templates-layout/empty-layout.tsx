import React, { FC } from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import PaymentMethodsPreview from '../payment-methods-preview'
import DeliverPreview from '../deliver-preview'
import ContactInfo from '../contact-info'
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
            text: <TextWidget {...{ widget, selectSection, editWidget: editSection.widget as Widget, props }} />,
            link: <LinkWidget {...{ widget, selectSection, editWidget: editSection.widget as Widget, props }} />,
            pm: <PaymentMethodsPreview {...{ selectSection, editSection, paymentMethods, containerClassName: 'border-0', props }} />,
            dm: <DeliverPreview {...{ selectSection, editSection, deliverMethods, containerClassName: 'border-0', props }} />,
            socials: <ContactInfo {...{ selectSection, editSection, contact, layout, props }} />,
            resizable: <ResizableWidget {...{ widget, selectSection, editWidget: editSection.widget as Widget, props }} />,
            img: <ImgWidget {...{ widget, selectSection, editWidget: editSection.widget as Widget, props }} />,
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