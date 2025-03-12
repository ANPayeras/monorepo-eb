import { useCallback } from "react"
import { resizableItem, Widget } from "@/types"
import WidgetBaseCard from "../widget-base-card"
import { Doc } from "../../../convex/_generated/dataModel"
import { Separator } from "@radix-ui/react-separator"
import ContentResizeWidget from "../content-resize-widget"
import useSentEvent from "@/hooks/use-sent-events"

export function ResizableWidget({ widget, template }: { widget: Widget, template: Doc<"templates"> }) {
    const { sentEvent } = useSentEvent()
    const sizes = widget.data!.resizables!
    const { layout } = template

    const getPanelImage = useCallback((panel: number): string => {
        const panelImg = sizes.length ? sizes[panel].img?.localImg || sizes[panel].img?.uploadImgUrl : ''
        return panelImg || ''
    }, [sizes])

    const getPanelData = useCallback((panel: number): resizableItem => {
        return sizes[panel]
    }, [sizes])

    const redirect = (panel: resizableItem, panelNumber: number) => {
        const { url, img, value } = panel
        window.open(url, '_blank')
        sentEvent('widget_click', {
            type: widget.type,
            title: value,
            widgetUrl: url,
            img: img?.uploadImgUrl,
            panel: panelNumber,
        })
    }

    return (
        <WidgetBaseCard>
            <div className='flex w-full h-full flex-1 rounded-md overflow-hidden'>
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
                    <div
                        className={`flex h-[200px] w-full items-center justify-center p-6 relative transition-all ${getPanelData(0).url ? 'hover:scale-105' : ''}`}
                        style={{ cursor: getPanelData(0).url ? 'pointer' : 'auto' }}
                        onClick={getPanelData(0).url ? () => redirect(getPanelData(0), 1) : undefined}
                    >
                        <ContentResizeWidget
                            value={getPanelData(0).value || ''}
                            textColor={sizes ? getPanelData(0).textColor || layout?.textsColor : ''}
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
                            <div className={`flex h-full items-center justify-center p-6 relative transition-all ${getPanelData(1).url ? 'hover:scale-105' : ''}`}
                                style={{ cursor: getPanelData(1).url ? 'pointer' : 'auto' }}
                                onClick={getPanelData(1).url ? () => redirect(getPanelData(1), 2) : undefined}
                            >
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
                            <div className={`flex h-full items-center justify-center p-6 relative transition-all ${getPanelData(1).url ? 'hover:scale-105' : ''}`}
                                style={{ cursor: getPanelData(2).url ? 'pointer' : 'auto' }}
                                onClick={getPanelData(2).url ? () => redirect(getPanelData(2), 3) : undefined}
                            >
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
