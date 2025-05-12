import React from 'react'
import { Doc } from '../../convex/_generated/dataModel'
import EmptyView from './templates-views/empty-view'
import ClassicView from './templates-views/classic-view'

const Template = ({ template, userData }: { template: Doc<"templates">, userData: Doc<"users"> }) => {
    const { layout } = template

    const templateView: { [key: string]: JSX.Element } = {
        empty: <EmptyView {...{ template }} />,
        classic: <ClassicView {...{ template, user: userData! }} />,
    }

    return (
        <div
            className='absolute flex flex-col py-10 gap-10 items-center w-full max-h-screen overflow-hidden overflow-y-visible'>
            <div>{userData.username}</div>
            <div className="w-[90%] max-w-[400px] md:max-w-[600px] flex flex-col gap-4 items-center">
                {templateView[layout.templateLayout]}
            </div>
        </div>
    )
}

export default Template