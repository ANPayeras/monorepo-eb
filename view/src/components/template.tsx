import React from 'react'
import { Doc } from '../../convex/_generated/dataModel'
import EmptyView from './templates-views/empty-view'
import ClassicView from './templates-views/classic-view'

const Template = ({ template, userData, test = false }: { template: Doc<"templates">, test?: boolean, userData: Doc<"users"> }) => {
    const { layout } = template

    const templateView: { [key: string]: JSX.Element } = {
        empty: <EmptyView {...{ template }} />,
        classic: <ClassicView {...{ template, user: userData! }} />,
    }

    return (
        <div
            className='relative flex flex-col py-10 gap-10 items-center overflow-y-scroll rounded-sm w-[90%] max-w-[400px] md:max-w-[600px] h-full mx-auto'
            style={{ backgroundColor: !test ? layout.bgColor : 'transparent', color: layout.textsColor }}
        >
            <div>{userData.username}</div>
            {templateView[layout.templateLayout]}
        </div>
    )
}

export default Template