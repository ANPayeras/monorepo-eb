import React, { createElement } from 'react'

import { Doc } from '../../../convex/_generated/dataModel'
import PaymentMethodsWidget from '../payment-methods-preview'
import DeliverMethodsWidget from '../deliver-preview'
import ContactInfoWidget from '../contact-info'
import Text from '../widgets/text'
import Link from '../widgets/link'
import ImgWidget from '../widgets/img-widget'
import { ResizableWidget } from '../widgets/resizable-widget'

const EmptyView = ({ template }: { template: Doc<"templates"> }) => {
    const { widgets } = template

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Widget: { [key: string]: any } = {
        text: Text,
        link: Link,
        pm: PaymentMethodsWidget,
        dm: DeliverMethodsWidget,
        socials: ContactInfoWidget,
        img: ImgWidget,
        resizable: ResizableWidget,
    }

    return (
        <>
            {
                widgets.map(w => {
                    const widget = Widget[w.type]
                    if (widget) {
                        return (
                            createElement(widget, {
                                key: w.id,
                                template,
                                widget: w,
                            })
                        )
                    } else {
                        <></>
                    }
                })
            }
        </>
    )
}

export default EmptyView