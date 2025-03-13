import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDataStore } from '@/providers/data-store-providers'
import { resizableItem, Widget, WidgetData } from '@/stores/data-store'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable'
import { ImperativePanelHandle } from 'react-resizable-panels'
import ImgWidgetEdit from './img-widget-edit'
import ContentResizeWidget from './content-resize-widget'

const ResizableWidgetEdit = ({ widget }: { widget: Widget }) => {
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)
    const [isMount, setIsMount] = useState(false)
    const [editedPanel, setEditedPanel] = useState<resizableItem>()

    const panelRef1 = useRef<ImperativePanelHandle>(null);
    const panelRef2 = useRef<ImperativePanelHandle>(null);
    const panelRef3 = useRef<ImperativePanelHandle>(null);

    const resizedArr = useMemo(() => {
        return widget?.data?.resizables || [{ size: 50, id: 0 }, { size: 25, id: 1 }, { size: 75, id: 2 }]
    }, [widget?.data?.resizables])

    const onResize = (pos: number, size: number) => {
        if (isMount) {
            const panel = widget.data?.resizables![pos]
            resizedArr.splice(pos, 1, { ...panel, size, id: pos })
            handleWidgetChanges(widget, { resizables: resizedArr })
        } else {
            setIsMount(true)
        }
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

        return () => { setEditedPanel(undefined) }
    }, [widget, resize, handleWidgetChanges, resizedArr])

    const handleNestedWidgetChanges = (data: WidgetData) => {
        const pos = editedPanel?.id!
        resizedArr.splice(pos, 1, { ...resizedArr[pos], ...data as resizableItem })
        handleWidgetChanges(widget!, {
            resizables: resizedArr
        })
    }

    const getPanelImage = useCallback((panel: number): string => {
        return resizedArr[panel].img?.localImg || resizedArr[panel].img?.uploadImgUrl || ''
    }, [resizedArr])

    return (
        <div className='flex flex-col gap-4 p-4'>
            <span className='text-center border-b'>
                Redimensiona los paneles
            </span>
            <ResizablePanelGroup
                direction="horizontal"
                className="max-w-md rounded-md border"
            >
                <ResizablePanel defaultSize={50} ref={panelRef1} onResize={(size) => onResize(0, size)}>
                    <button
                        className="flex h-[200px] w-full items-center justify-center p-6 relative"
                        onClick={() => setEditedPanel(widget.data?.resizables![0])}
                    >
                        <ContentResizeWidget
                            value={resizedArr[0].value}
                            image={getPanelImage(0)}
                            textColor={resizedArr[0].textColor}
                        />
                    </button>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={25} ref={panelRef2} onResize={(size) => onResize(1, size)}>
                            <button
                                className="flex w-full h-full items-center justify-center p-6 relative"
                                onClick={() => setEditedPanel(widget.data?.resizables![1])}
                            >
                                <ContentResizeWidget
                                    value={resizedArr[1].value}
                                    image={getPanelImage(1)}
                                    textColor={resizedArr[1].textColor}
                                />
                            </button>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={75} ref={panelRef3} onResize={(size) => onResize(2, size)}>
                            <button
                                className="flex w-full h-full items-center justify-center p-6 relative"
                                onClick={() => setEditedPanel(widget.data?.resizables![2])}
                            >
                                <ContentResizeWidget
                                    value={resizedArr[2].value}
                                    image={getPanelImage(2)}
                                    textColor={resizedArr[2].textColor}
                                />
                            </button>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
            {
                editedPanel && <>
                    <div>
                        <ImgWidgetEdit
                            widget={widget}
                            panel={editedPanel && widget.data?.resizables && widget.data?.resizables[editedPanel.id]}
                            handleNestedWidgetChanges={handleNestedWidgetChanges}
                            title={`Panel ${editedPanel.id + 1}`}
                            isNestedWidget
                            className='p-0'
                        />
                    </div>
                </>
            }
        </div>
    )
}

export default ResizableWidgetEdit