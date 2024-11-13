import React, { createElement } from 'react'
import { Doc } from '../../../convex/_generated/dataModel'
import PaymentMethodsPreview from '../payment-methods-preview'
import DeliverPreview from '../deliver-preview'
import ContactInfo from '../contact-info'
import Text from '../widgets/text'
import Link from '../widgets/link'

const EmptyView = ({ template }: { template: Doc<"templates"> }) => {

    const { widgets } = template

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Widget: { [key: string]: any } = {
        text: Text,
        link: Link,
        pm: PaymentMethodsPreview,
        dm: DeliverPreview,
        socials: ContactInfo,
    }

    return (
        <>
            {
                widgets.map(w => {
                    if (Widget[w.type]) {
                        return createElement(Widget[w.type], {
                            key: w.id,
                            template,
                            widget: w,
                        });
                    } else {
                        <></>
                    }
                })
            }
        </>
    )
}

export default EmptyView