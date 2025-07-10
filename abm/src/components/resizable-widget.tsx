import { useCallback } from "react"

import ToolsWidget from "./tools-widget"
import { useDataStore } from "@/providers/data-store-providers"
import { ResizableWidgetInterface } from "@/interfaces"
import { Separator } from "./ui/separator"
import ContentResizeWidget from "./content-resize-widget"
import useUploadFile from "@/hooks/use-upload-file"
import { useIsSmall } from "@/hooks/use-media.query"

export function ResizableWidget({ widget, selectSection, editWidget, layout, props }: ResizableWidgetInterface) {
    const { data } = widget
    const deleteWidget = useDataStore(state => state.deleteWidget)
    const isEditing = widget.id === editWidget?.id
    const { bulkDeleteFilesCloudinary } = useUploadFile()

    const _deleteWidget = () => {
        try {
            selectSection('', 0, {})
            const storageIds = data?.resizables?.filter(p => p?.img?.storageId).map(p => p?.img?.storageId)
            if (storageIds?.length) {
                const dataToDelete = Array.from(storageIds, (sId, _i) => ({ publicId: sId!, resourceType: 'image' }))
                bulkDeleteFilesCloudinary(dataToDelete)
            }
            deleteWidget(widget)
        } catch (error) {
            console.log(error)
        }
    }

    const sizes = data?.resizables

    const getPanelImage = useCallback((panel: number): string => {
        const arr = data?.resizables || []
        const panelImg = arr.length ? arr[panel].img?.localImg || arr[panel].img?.uploadImgUrl : ''
        return panelImg || ''
    }, [data?.resizables])

    const isSmall = useIsSmall()

    return (
        <>
            <div
                className={`flex w-full h-full flex-1 overflow-hidden ${!props ? 'sm:active:bg-inherit' : 'sm:active:bg-slate-400'}`}
                style={{
                    borderRadius: `${data?.container?.border?.rounded ? `${data?.container?.border?.rounded}px` : ''}`,
                }}
                {...!isSmall && props}
            >
                <div
                    className='overflow-hidden'
                    style={{
                        width: `${sizes ? sizes[0].size : 50}%`,
                        borderTopRightRadius: sizes && sizes[0].size === 100 ? '4px' : '0px',
                        borderTopLeftRadius: '4px',
                        borderBottomLeftRadius: '4px',
                        borderBottomRightRadius: sizes && sizes[0].size === 100 ? '4px' : '0px',
                        backgroundColor: sizes && sizes[0].bgColor || ''
                    }}
                >
                    <div className="flex h-[200px] w-full items-center justify-center p-6 relative">
                        <ContentResizeWidget
                            value={sizes ? widget.data?.resizables![0].value : ''}
                            textColor={sizes ? widget.data?.resizables![0].textColor || layout?.textsColor : ''}
                            textAlign={sizes ? widget.data?.resizables![0].textAlign : 'center'}
                            image={getPanelImage(0)}
                            placeholder="Panel 1"
                        />
                    </div>
                </div>
                <Separator orientation="vertical" className="h-auto my-1" />
                <div
                    className="flex-grow"
                    style={{ width: `${sizes ? 100 - sizes[0].size : 50}%` }}
                >
                    <div className="w-full h-full flex flex-col">
                        <div
                            className="w-full overflow-hidden"
                            style={{
                                height: `${sizes ? sizes[1].size : 25}%`,
                                borderTopRightRadius: '4px',
                                borderTopLeftRadius: sizes && sizes[0].size === 0 ? '4px' : '0px',
                                borderBottomLeftRadius: sizes && sizes[0].size === 0 && sizes[1].size === 100 ? '4px' : '0px',
                                borderBottomRightRadius: sizes && sizes[1].size === 100 ? '4px' : '0px',
                                backgroundColor: sizes && sizes[1].bgColor || ''
                            }}
                        >
                            <div className="flex h-full items-center justify-center p-6 relative">
                                <ContentResizeWidget
                                    value={sizes ? widget.data?.resizables![1].value : ''}
                                    textColor={sizes ? widget.data?.resizables![1].textColor || layout?.textsColor : ''}
                                    textAlign={sizes ? widget.data?.resizables![1].textAlign : 'center'}
                                    image={getPanelImage(1)}
                                    placeholder="Panel 2"
                                />
                            </div>
                        </div>
                        <Separator />
                        <div
                            className="w-full h-full overflow-hidden"
                            style={{
                                height: `${sizes ? sizes[2].size : 75}%`,
                                borderTopRightRadius: sizes && sizes[2].size === 100 ? '4px' : '0px',
                                borderTopLeftRadius: sizes && sizes[0].size === 0 && sizes[2].size === 100 ? '4px' : '0px',
                                borderBottomLeftRadius: sizes && sizes[0].size === 0 ? '4px' : '0px',
                                borderBottomRightRadius: '4px',
                                backgroundColor: sizes && sizes[2].bgColor || ''
                            }}
                        >
                            <div className="flex h-full items-center justify-center p-6 relative">
                                <ContentResizeWidget
                                    value={sizes ? widget.data?.resizables![2].value : ''}
                                    textColor={sizes ? widget.data?.resizables![2].textColor || layout?.textsColor : ''}
                                    textAlign={sizes ? widget.data?.resizables![2].textAlign : 'center'}
                                    image={getPanelImage(2)}
                                    placeholder="Panel 3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                selectSection &&
                <ToolsWidget
                    deleteFunc={_deleteWidget}
                    editFunc={() => selectSection('resizableWidget', 0, widget)}
                    isEditing={isEditing}
                    {...isSmall && { props }}
                />
            }
        </>
    )
}
