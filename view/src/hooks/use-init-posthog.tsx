import posthog from 'posthog-js'
import { Doc } from '../../convex/_generated/dataModel';
import { useState } from 'react';

const useInitPosthog = () => {
    const [_isInitPH, setIsInitPH] = useState<boolean>(false)

    const init = (template: Doc<"templates">) => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
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
                setIsInitPH(true)
                sessionStorage.setItem('isInitPH', 'true')
            },
        })
    }

    return {
        init,
    }
}

export default useInitPosthog