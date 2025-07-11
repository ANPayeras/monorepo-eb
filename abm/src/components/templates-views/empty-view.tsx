import React, { createElement } from 'react'

import { Doc } from '../../../convex/_generated/dataModel'
import PaymentMethodsWidget from '../payment-methods-widget'
import DeliverMethodsWidget from '../deliver-methods-widget'
import ContactInfoWidget from '../contact-info-widget'
import ImgWidget from '../img-widget'
import { ResizableWidget } from '../resizable-widget'
import TextWidget from '../text-widget'
import LinkWidget from '../link-widget'
import WidgetBaseCardContainer from '../widget-base-card-container'

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
        <div className="w-[90%] flex flex-col gap-4 items-center overflow-y-visible">
            {
                widgets.map(w => {
                    if (Widget[w.type]) {
                        return (
                            <WidgetBaseCardContainer
                                key={w.id}
                                widget={w}
                            >
                                {
                                    createElement(Widget[w.type], {
                                        paymentMethods,
                                        deliverMethods,
                                        contact,
                                        layout,
                                        widget: w,
                                    })
                                }
                            </WidgetBaseCardContainer>
                        )
                    } else {
                        <></>
                    }
                })
            }
        </div>
    )
}

export default EmptyView