import React, { createElement } from 'react'
import { Doc } from '../../../convex/_generated/dataModel'
import PaymentMethodsWidget from '../payment-methods-widget'
import DeliverMethodsWidget from '../deliver-methods-widget'
import ContactInfoWidget from '../contact-info-widget'
import ImgWidget from '../img-widget'
import { ResizableWidget } from '../resizable-widget'
import TextWidget from '../text-widget'
import LinkWidget from '../link-widget'

const EmptyView = ({ template: { layout, widgets, paymentMethods, deliverMethods, contact } }: { template: Doc<"templates"> }) => {
    const Widget: { [key: string]: any } = {
        text: TextWidget,
        link: LinkWidget,
        pm: PaymentMethodsWidget,
        dm: DeliverMethodsWidget,
        socials: ContactInfoWidget,
        img: ImgWidget,
        resizable: ResizableWidget,
    }

    return (
        <div className="w-[90%] flex flex-col gap-4 items-center overflow-x-clip overflow-y-visible grid-cols-4">
            {
                widgets.map(w => {
                    if (Widget[w.type]) {
                        return createElement(Widget[w.type], {
                            key: w.id,
                            paymentMethods,
                            deliverMethods,
                            contact,
                            layout,
                            widget: w,
                        });
                    } else {
                        <></>
                    }
                })
            }
        </div>
    )
}

export default EmptyView