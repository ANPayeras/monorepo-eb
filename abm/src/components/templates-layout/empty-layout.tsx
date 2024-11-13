import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import { SlotItemMap, Swapy, createSwapy } from 'swapy'
import PaymentMethodsPreview from '../payment-methods-preview'
import DeliverPreview from '../deliver-preview'
import ContactInfo from '../contact-info'
import { EmptyLayoutProps } from '@/interfaces'
import TextWidget from '../text-widget'
import { Widget } from '@/stores/data-store'
import LinkWidget from '../link-widget'
import '../styles.css'

const EmptyLayout: FC<EmptyLayoutProps> = ({ selectSection, editSection, data: { layout, contact, paymentMethods, deliverMethods } }) => {
    const widgets = useDataStore(state => state.widgets)
    const updateWidgetOrder = useDataStore(state => state.updateWidgetOrder)
    const [isGrabbing, setIsGrabbing] = useState<boolean>(false)
    const swapyRef = useRef<Swapy | null>(null)

    const renderWidget = (widget: Widget) => {
        const widgetsComponents: { [key: string]: JSX.Element } = {
            text: <TextWidget {...{ widget }} />,
            link: <LinkWidget {...{ widget, selectSection, editWidget: editSection.widget as Widget }} />,
            pm: <PaymentMethodsPreview {...{ selectSection, editSection, paymentMethods, containerClassName: 'border-0' }} />,
            dm: <DeliverPreview {...{ selectSection, editSection, deliverMethods, containerClassName: 'border-0' }} />,
            socials: <ContactInfo {...{ selectSection, editSection, contact, layout }} />,
        }

        return widget ? widgetsComponents[widget.type] : <></>
    }

    const [slotItemsMap, setSlotItemsMap] = useState<SlotItemMap>(
        [...widgets.map(item => ({
            slotId: item.id,
            itemId: item.id
        }))])

    const slottedItems = useMemo(() => slotItemsMap.map(({ slotId, itemId }) => ({
        slotId,
        itemId,
        item: widgets.find(item => item.id === itemId)
    })), [slotItemsMap, widgets])

    useEffect(() => {
        updateWidgetOrder(slottedItems.map(si => si.item!))
    }, [slottedItems, updateWidgetOrder])

    useEffect(() => {
        const newItems = widgets.filter(item => !slotItemsMap.some(slotItem => slotItem.itemId === item.id)).map(item => ({
            slotId: item.id,
            itemId: item.id
        }))

        const withoutRemovedItems = slotItemsMap.filter(slotItem =>
            widgets.some(item => item.id === slotItem.itemId))

        const updatedSlotItemsMap = [...withoutRemovedItems, ...newItems]

        setSlotItemsMap(updatedSlotItemsMap)
        swapyRef.current?.setData({ array: updatedSlotItemsMap })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widgets.length])

    useEffect(() => {
        const container = document.querySelector('#container')!
        if (container) {
            swapyRef.current = createSwapy(container, {
                manualSwap: true,
                swapMode: 'drop',
                animation: 'spring',
                autoScrollOnDrag: true,
            })

            swapyRef.current.onSwap(({ data: { array } }) => {
                swapyRef.current?.setData({ array })
                setSlotItemsMap(array)
            })

            swapyRef.current.onSwapEnd(() => {
                setIsGrabbing(false)
            })

            swapyRef.current.onSwapStart(() => {
                setIsGrabbing(true)
            })

            return () => {
                swapyRef.current?.destroy()
            }
        }
    }, [widgets.length])

    return (
        <div
            className="w-[90%] flex flex-col gap-4 overflow-x-clip overflow-y-visible"
            id='container'
        >
            {
                slottedItems.length ?
                    slottedItems.map((w, i) => {
                        return (
                            <div
                                key={i}
                                className="rounded-sm border w-full"
                                style={{ cursor: isGrabbing ? 'grabbing' : 'grab' }}
                                data-swapy-slot={w.slotId}
                            >
                                <div className="w-full h-full flex justify-center" data-swapy-item={w.itemId}>
                                    {renderWidget(w.item!)}
                                </div>
                            </div>
                        )
                    }) :
                    <div data-swapy-slot='empty'>
                        <div data-swapy-item='empty' />
                    </div>
            }
        </div>
    )
}

export default EmptyLayout