import React from 'react'
import { Doc } from '../../convex/_generated/dataModel'
import { UserResource } from '@clerk/types'
import ClassicView from './templates-views/classic-view'
import EmptyView from './templates-views/empty-view'

const Template = ({ template, user }: { template: Doc<"templates">, user: UserResource }) => {
    const { layout } = template

    const templateView: { [key: string]: JSX.Element } = {
        empty: <EmptyView {...{ template }} />,
        classic: <ClassicView {...{ template }} />,
    }

    return (
        <div className='flex flex-col py-10 gap-10 items-center overflow-y-scroll rounded-sm min-w-[300px] max-w-[400px] h-[95%]'
            style={{
                backgroundColor: layout.bgColor, color: layout.textsColor, backgroundImage: `url(${layout.backgroundImg?.localImg || layout.backgroundImg.uploadImgUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
            }}>
            <div>{user.username}</div>
            {templateView[layout.templateLayout]}
        </div>
    )
}

export default Template