'use client'
import { useQuery } from 'convex/react'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { ReactNode, useEffect } from 'react'
import { api } from '../../convex/_generated/api'
import useInitPosthog from '@/hooks/use-init-posthog'

export function CSPostHogProvider({ children }: { children: ReactNode }) {
    const data = useQuery(api.templates.getTemplate, typeof window !== "undefined" ? { test: false, user: window.location.pathname.split('/')[2] } : 'skip')
    const { init } = useInitPosthog()

    useEffect(() => {
        if (data?.template.length) {
            init(data.template[0])
        }
    }, [data?.template.length])

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}