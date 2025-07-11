import React, { useMemo } from 'react'

import { Doc } from '../../convex/_generated/dataModel'
import ClassicView from './templates-views/classic-view'
import EmptyView from './templates-views/empty-view'
import BgVideoPlayer from './bg-video'

const Template = ({ template, username }: { template: Doc<"templates">, username: string }) => {
    const { layout: { templateLayout, backgroundImg, backgroundVideo, bgColor, textsColor } } = template

    const templateView: { [key: string]: JSX.Element } = {
        empty: <EmptyView {...{ template }} />,
        classic: <ClassicView {...{ template }} />,
    }

    const isVideo = useMemo(() => {
        return backgroundVideo?.localVideo || backgroundVideo?.uploadVideoUrl
    }, [backgroundVideo?.localVideo, backgroundVideo?.uploadVideoUrl])


    return (
        <div className='relative rounded-sm min-w-[300px] max-w-[400px] min-h-[80vh] max-h-[80vh] sm:min-h-0 sm:max-h-full h-[95%]'
            style={{
                backgroundColor: bgColor,
                color: textsColor,
                backgroundImage: `url(${backgroundImg?.localImg || backgroundImg.uploadImgUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
            }}>
            {
                isVideo && <BgVideoPlayer src={isVideo} videoProps={{ autoPlay: false }} />
            }
            <div className='relative flex w-full h-full flex-col py-10 gap-10 items-center overflow-y-auto z-[1]'>
                <div className='z-10'>{username}</div>
                {templateView[templateLayout]}
            </div>
        </div>
    )
}

export default Template