import React, { useState } from 'react'

import { BgVideoPlayerProps } from '@/types'
import { cn } from '@/lib/utils'

const BgVideoPlayer = ({ src, videoProps, className, style }: BgVideoPlayerProps) => {
    const [isLoading, setIsloading] = useState(true)
    return (
        <video
            className={cn('absolute top-0 left-0 w-full h-full object-cover rounded-sm transition-all', `${isLoading ? 'blur-lg' : 'blur-0'} ${className}`)}
            style={style}
            playsInline
            muted
            autoPlay
            loop
            onCanPlay={() => setIsloading(false)}
            {...videoProps}
        >
            <source
                src={src}
                type="video/mp4"
            />
            El navegador no puede reproducir el video
        </video>
    )
}

export default BgVideoPlayer