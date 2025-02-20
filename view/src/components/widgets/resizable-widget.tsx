import { useCallback } from "react"
import { Widget } from "@/types"
import WidgetBaseCard from "../widget-base-card"
import { Doc } from "../../../convex/_generated/dataModel"
import { Separator } from "@radix-ui/react-separator"
import ContentResizeWidget from "../content-resize-widget"

export function ResizableWidget({ widget, template }: { widget: Widget, template: Doc<"templates"> }) {
    const sizes = widget?.data?.resizables
    const { layout } = template

    const getPanelImage = useCallback((panel: number): string => {
        const arr = widget.data?.resizables || []
        const panelImg = arr.length ? arr[panel].img?.localImg || arr[panel].img?.uploadImgUrl : ''
        return panelImg || ''
    }, [widget.data?.resizables])

    return (
        <WidgetBaseCard>
            <div className='flex w-full h-full flex-1 rounded-md'>
                <div
                    className='overflow-hidden rounded-md'
                    style={{
                        width: `${sizes ? sizes[0].size : 50}%`,
                        borderTopRightRadius: sizes && sizes[0].size === 100 ? '4px' : '0px',
                        borderTopLeftRadius: '4px',
                        borderBottomLeftRadius: '4px',
                        borderBottomRightRadius: sizes && sizes[0].size === 100 ? '4px' : '0px',
                    }}
                >
                    <div className="flex h-[200px] w-full items-center justify-center p-6 relative">
                        <ContentResizeWidget
                            value={sizes ? widget.data?.resizables![0].value : ''}
                            textColor={sizes ? widget.data?.resizables![0].textColor || layout?.textsColor : ''}
                            image={getPanelImage(0)}
                            placeholder="Panel 1"
                        />
                    </div>
                </div>
                <Separator orientation="vertical" className="h-auto border-[0.5px]" />
                <div
                    className="flex-grow"
                    style={{ width: `${sizes ? 100 - sizes[0].size : 50}%` }}
                >
                    <div className="w-full h-full flex flex-col">
                        <div
                            className="w-full overflow-hidden rounded-md"
                            style={{
                                height: `${sizes ? sizes[1].size : 25}%`,
                                borderTopRightRadius: '4px',
                                borderTopLeftRadius: sizes && sizes[0].size === 0 ? '4px' : '0px',
                                borderBottomLeftRadius: sizes && sizes[0].size === 0 && sizes[1].size === 100 ? '4px' : '0px',
                                borderBottomRightRadius: sizes && sizes[1].size === 100 ? '4px' : '0px',
                            }}
                        >
                            <div className="flex h-full items-center justify-center p-6 relative">
                                <ContentResizeWidget
                                    value={sizes ? widget.data?.resizables![1].value : ''}
                                    textColor={sizes ? widget.data?.resizables![1].textColor || layout?.textsColor : ''}
                                    image={getPanelImage(1)}
                                    placeholder="Panel 2"
                                />
                            </div>
                        </div>
                        <Separator className="border-[0.5px]" />
                        <div
                            className="w-full h-full overflow-hidden"
                            style={{
                                height: `${sizes ? sizes[2].size : 75}%`,
                                borderTopRightRadius: sizes && sizes[2].size === 100 ? '4px' : '0px',
                                borderTopLeftRadius: sizes && sizes[0].size === 0 && sizes[2].size === 100 ? '4px' : '0px',
                                borderBottomLeftRadius: sizes && sizes[0].size === 0 ? '4px' : '0px',
                                borderBottomRightRadius: '4px',
                            }}
                        >
                            <div className="flex h-full items-center justify-center p-6 relative">
                                <ContentResizeWidget
                                    value={sizes ? widget.data?.resizables![2].value : ''}
                                    textColor={sizes ? widget.data?.resizables![2].textColor || layout?.textsColor : ''}
                                    image={getPanelImage(2)}
                                    placeholder="Panel 3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WidgetBaseCard>
    )
}
