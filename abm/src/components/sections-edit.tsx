import React, { FC } from 'react'

import MenuTemplate from './menu-template'
import CombosTemplate from './combos-template'
import ContactWidgetEdit from './contact-widget-edit'
import PaymentMethodsEdit from './payment-methods-edit'
import DeliverMethodsEdit from './deliver-methods.edit'
import LinkWidgetEdit from './link-widget-edit'
import { Widget } from '@/stores/data-store'
import ResizableWidgetEdit from './resizable-widget-edit'
import TextWidgetEdit from './text-widget-edit'
import ImgWidgetEdit from './img-widget-edit'

const SectionsEdit: FC<{ section: string, combo: number, widget: Widget | {} }> = ({ section, combo, widget }) => {

  const templates: {
    [index: string]: JSX.Element;
  } = {
    menu: <MenuTemplate />,
    combos: <CombosTemplate combo={combo} />,
    contact: <ContactWidgetEdit />,
    paymentMethods: <PaymentMethodsEdit />,
    deliverMethods: <DeliverMethodsEdit />,
    linkWidget: <LinkWidgetEdit {...{ widget: widget as Widget }} />,
    textWidget: <TextWidgetEdit {...{ widget: widget as Widget }} />,
    resizableWidget: <ResizableWidgetEdit {...{ widget: widget as Widget }} />,
    imgWidget: <ImgWidgetEdit {...{ widget: widget as Widget }} />,
  }

  return templates[section]
}

export default SectionsEdit