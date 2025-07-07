import posthog from 'posthog-js'
import { Doc } from '../../convex/_generated/dataModel';
import { useDataStore } from '@/providers/data-store-providers';
import { useRouter } from 'next/navigation';

const useInitPosthog = () => {
    const router = useRouter()
    const setInitPostHog = useDataStore(state => state.setInitPostHog)

    const init = (template: Doc<"templates">) => {
        identifyUser(template)
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_API_HOST,
            ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST,
            person_profiles: 'identified_only',
            capture_pageview: false,
            capture_dead_clicks: false,
            capture_pageleave: false,
            capture_heatmaps: false,
            capture_performance: false,
            autocapture: false,
            persistence: 'memory',
            // debug: true,
            bootstrap: {
                distinctID: template._id,
                isIdentifiedID: true
            },
            loaded() {
                setInitPostHog()
            },
        })
    }

    // Check when template change
    const identifyUser = (template: Doc<"templates">) => {
        const currentId = posthog.get_distinct_id()
        if (currentId && currentId !== template._id) {
            router.replace(`/${template.name}`)
            posthog.identify(template._id, { user: template.user })
        }
    }

    return {
        init,
    }
}

export default useInitPosthog