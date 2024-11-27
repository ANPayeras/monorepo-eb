import { usePostHog } from 'posthog-js/react';

type EventNames = 'widget_click' | 'section_cart_item_added' | 'combo_cart_item_added' | 'checkout_copy' | 'checkout_whatsapp'

const useSentEvent = () => {
    const posthog = usePostHog();

    const sentEvent = (eventName: EventNames, properties?: object) => {
        posthog.capture(eventName, { ...properties })
    }

    return {
        sentEvent,
    }
}

export default useSentEvent