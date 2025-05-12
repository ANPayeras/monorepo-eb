import React from 'react'
import { BgVideoPlayerProps } from '@/types'
import { cn } from '@/lib/utils'

const BgVideoPlayer = ({ src, videoProps, className }: BgVideoPlayerProps) => {
    return (
        <video
            className={cn('absolute top-0 left-0 w-full h-full object-cover rounded-sm', className)}
            playsInline
            muted
            autoPlay
            loop
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