import React from 'react'

import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

const MobileUsers = async ({ templateId }: { templateId: Id<"templates"> }) => {

    const metrics = await fetchAction(api.metrics.getMetrics,
        {
            query: "SELECT count() from events WHERE events.event = '$pageview' AND events.distinct_id = 'templateID' AND events.properties.$device_type = 'Mobile' AND events.properties.$prev_pageview_pathname is null",
            templateId
        })

    if (!metrics) return
    return (
        <div className='flex flex-col'>
            <span className='text-center'>Usuarios que ingresaron desde un celular</span>
            <span className='flex items-center justify-center h-20'>{metrics[0][0]}</span>
        </div>
    )
}

export default MobileUsers