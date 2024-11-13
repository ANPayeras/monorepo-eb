import React, { FC } from 'react'
import MenuTemplate from './menu-template'
import CombosTemplate from './combos-template'
import ContactTemplate from './contact-template'
import PaymentMethodsTemplate from './payment-methods-template'
import DeliverMethodsTemplate from './deliver-template'
import LinkWidgetEdit from './link-widget-edit'
import { Widget } from '@/stores/data-store'

const SectionsEdit: FC<{ section: string, combo: number, widget: Widget | {} }> = ({ section, combo, widget }) => {

  const templates: {
    [index: string]: JSX.Element;
  } = {
    menu: <MenuTemplate />,
    combos: <CombosTemplate combo={combo} />,
    contact: <ContactTemplate />,
    paymentMethods: <PaymentMethodsTemplate />,
    deliverMethods: <DeliverMethodsTemplate />,
    linkWidget: <LinkWidgetEdit {...{ widget: widget as Widget }} />,
  }

  return templates[section]
}

export default SectionsEdit