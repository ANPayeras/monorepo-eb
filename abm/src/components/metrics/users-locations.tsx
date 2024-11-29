import React from 'react'
import { fetchAction } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'

const UsersLocation = async ({ clerkId }: { clerkId: string }) => {

    const metrics = await fetchAction(api.metrics.getMetrics,
        {
            query: "select properties.$geoip_country_name, properties.$geoip_city_name from events where events.event = '$pageview' and events.distinct_id = 'j57b89e98na61nm6jchkp1wct174kg83' group by properties.$geoip_country_name, properties.$geoip_city_name",
            clerkId
        })

    // console.log(metrics)
    return (
        <div className='flex flex-col gap-1'>
            <span className='text-center'>Ubicacion de los usuarios</span>
            {
                metrics.map((m, i) => (
                    <div key={i}
                        className='flex w-full justify-between'
                        style={{ borderBottom: metrics.length - 1 === i ? '' : '1px solid black' }}>
                        <span>{m[1]}, {m[0]}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default UsersLocation