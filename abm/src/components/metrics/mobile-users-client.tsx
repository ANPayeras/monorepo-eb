import React, { useCallback, useEffect, useState } from 'react'

import { api } from '../../../convex/_generated/api'
import { useAction } from 'convex/react'
import LoaderSpinner from '../loader-spinner'
import { Id } from '../../../convex/_generated/dataModel'

const MobileUsersClient = ({ templateId }: { templateId: Id<"templates"> }) => {
    const getMetrics = useAction(api.metrics.getMetrics)
    const [metrics, setMetrics] = useState([])

    const _getMetrics = useCallback(async () => {
        const _metrics = await getMetrics({
            query: "SELECT count() from events WHERE events.event = '$pageview' AND events.distinct_id = 'templateID' AND events.properties.$device_type = 'Mobile' AND events.properties.$prev_pageview_pathname is null",
            templateId
        })

        setMetrics(_metrics)
    }, [templateId, getMetrics])

    useEffect(() => {
        _getMetrics()
    }, [_getMetrics])

    if (!metrics?.length) return <LoaderSpinner />

    return (
        <div className='flex flex-col'>
            <span className='text-center'>Usuarios que ingresaron desde un celular</span>
            <span className='flex items-center justify-center h-20'>{metrics[0][0]}</span>
        </div>
    )
}

export default MobileUsersClient