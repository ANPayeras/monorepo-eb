import React, { createElement } from 'react'
import { Doc } from '../../../convex/_generated/dataModel'
import PaymentMethodsWidget from '../payment-methods-preview'
import DeliverMethodsWidget from '../deliver-preview'
import ContactInfoWidget from '../contact-info'
import Text from '../widgets/text'
import Link from '../widgets/link'

const EmptyView = ({ template }: { template: Doc<"templates"> }) => {

    const { widgets } = template

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Widget: { [key: string]: any } = {
        text: Text,
        link: Link,
        pm: PaymentMethodsWidget,
        dm: DeliverMethodsWidget,
        socials: ContactInfoWidget,
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