import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import { Widget } from '@/stores/data-store'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable'
import { getPanelElement, getPanelGroupElement, getResizeHandleElement, ImperativePanelHandle } from 'react-resizable-panels'
import { IconPlus } from '@tabler/icons-react'
import LinkWidgetEdit from './link-widget-edit'
import TextWidgetEdit from './text-widget-edit'

const ResizableWidgetEdit = ({ widget }: { widget: Widget }) => {
    const widgets = useDataStore(state => state.widgets)
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)
    const [isMount, setIsMount] = useState(false)
    const [editedPanel, setEditedPanel] = useState()

    console.log('widget', widget)

    const panelRef1 = useRef<ImperativePanelHandle>(null);
    const panelRef2 = useRef<ImperativePanelHandle>(null);
    const panelRef3 = useRef<ImperativePanelHandle>(null);

    const resizedArr = widget?.data?.resizables || [{ size: 50 }, { size: 25 }, { size: 75 }]

    const onResize = (pos: number, size: number) => {
        if (isMount) {
            resizedArr.splice(pos, 1, { size })
            handleWidgetChanges(widget, { resizables: resizedArr })
        }
        setIsMount(true)
    }

    const resize = useCallback(() => {
        panelRef1.current?.resize(resizedArr[0].size)
        panelRef2.current?.resize(resizedArr[1].size)
        panelRef3.current?.resize(resizedArr[2].size)
    }, [resizedArr])

    useEffect(() => {
        if (!widget.data?.resizables) {
            handleWidgetChanges(widget, { resizables: resizedArr })
            resize()
        } else {
            resize()
        }
    }, [widget, resize])

    return (
        <div className='flex flex-col gap-4 p-4'>
            <span className='text-center'>
                Redimensiona a tu gusto!!
            </span>
            <ResizablePanelGroup
                direction="horizontal"
                className="max-w-md rounded-md border"
            // autoSaveId="persistence"
            >
                <ResizablePanel defaultSize={50} ref={panelRef1} onResize={(size) => onResize(0, size)}>
                    <div className="flex h-[200px] items-center justify-center p-6">
                        <button
                            className="rounded-full border border-slate-950 cursor-pointer hover:scale-105 hover:opacity-50 transition-all"
                            onClick={() => setEditedPanel(0)}
                        >
                            <IconPlus />
                        </button>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={25} ref={panelRef2} onResize={(size) => onResize(1, size)}>
                            <div className="flex h-full items-center justify-center p-6">
                                <button
                                    className="rounded-full border border-slate-950 cursor-pointer hover:scale-105 hover:opacity-50 transition-all"
                                    onClick={() => setEditedPanel(1)}
                                >
                                    <IconPlus />
                                </button>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={75} ref={panelRef3} onResize={(size) => onResize(2, size)}>
                            <div className="flex h-full items-center justify-center p-6">
                                <button
                                    className="rounded-full border border-slate-950 cursor-pointer hover:scale-105 hover:opacity-50 transition-all"
                                    onClick={() => setEditedPanel(2)}
                                >
                                    <IconPlus />
                                </button>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
            {
                editedPanel && <>
                    <div>
                        <LinkWidgetEdit widget={widget} />
                    </div>
                </>
            }
        </div>
    )
}

export default ResizableWidgetEdit