"use client"

import React, { useCallback, useEffect, useState } from 'react'
import AllPageLoader from './all-page-loader';

const RefetchSsrPage = ({ fromPages }: { fromPages: string[] }) => {
    const [isLoading, setIsLoading] = useState(false)

    const refecth = useCallback((event: PopStateEvent) => {
        const target = event.currentTarget! as any
        const prefetchCache = target.nd.prefetchCache
        const arr: string[] = Array.from(prefetchCache, ([name]) => name)

        fromPages.forEach((p) => {
            if (p === arr[arr.length - 1]?.slice(1)) {
                window.location.reload()
            }
        })
    }, [fromPages])

    useEffect(() => {
        window.addEventListener("popstate", (event) => refecth(event));
        // window.history.pushState = new Proxy(window.history.pushState, {
        //     apply: (target, thisArg, argArray) => {
        //         // trigger here what you need
        //         console.log('ooooo', thisArg)
        //         console.log('ooooo', argArray)
        //         return target.apply(thisArg, argArray);
        //     },
        // });

        return () => {
            window.removeEventListener("popstate", (event) => refecth(event))
        }
    }, [refecth])

    return <AllPageLoader isOpen={isLoading} />
}

export default RefetchSsrPage