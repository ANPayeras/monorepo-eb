import React, { createElement } from 'react'
import { Doc } from '../../../convex/_generated/dataModel'
import PaymentMethodsPreview from '../payment-methods-preview'
import DeliverPreview from '../deliver-preview'
import ContactInfo from '../contact-info'
import Text from '../widgets/text'
import Link from '../widgets/link'

const EmptyView = ({ template: { layout, widgets, paymentMethods, deliverMethods, contact } }: { template: Doc<"templates"> }) => {
    const Widget: { [key: string]: any } = {
        text: Text,
        link: Link,
        pm: PaymentMethodsPreview,
        dm: DeliverPreview,
        socials: ContactInfo,
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