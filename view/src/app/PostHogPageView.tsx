'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePostHog } from 'posthog-js/react';
import useInitPosthog from "@/hooks/use-init-posthog";

export default function PostHogPageView(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  useInitPosthog()
  const isInitPH = sessionStorage.getItem('isInitPH')

  useEffect(() => {
    if (pathname && Boolean(isInitPH)) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture(
        '$pageview',
        {
          '$current_url': url,
        }
      )
    }
  }, [pathname, searchParams, isInitPH])

  return null
}