import { useMemo } from "react"

import { ResizableItem, Widget } from "@/types"
import { Doc } from "../../../convex/_generated/dataModel"
import { Separator } from "@radix-ui/react-separator"
import ContentResizeWidget from "../content-resize-widget"
import useSentEvent from "@/hooks/use-sent-events"
import WidgetBaseCardContainer from "../widget-base-card-container"

export function ResizableWidget({ widget, template }: { widget: Widget, template: Doc<"templates"> }) {
    const { sentEvent } = useSentEvent()
    const { layout } = template
    const { data, type } = widget

    const sizes = data!.resizables!

    const panel1Data = useMemo(() => {
        return sizes[0]
    }, sizes)

    const panel2Data = useMemo(() => {
        return sizes[1]
    }, sizes)

    const panel3Data = useMemo(() => {
        return sizes[2]
    }, sizes)

    const redirect = (panel: ResizableItem, panelNumber: number) => {
        const { url, img, value } = panel
        window.open(url, '_blank')
        sentEvent('widget_click', {
            type,
            title: value,
            widgetUrl: url,
            img: img?.uploadImgUrl,
            panel: panelNumber,
        })
    }

    return (
        <WidgetBaseCardContainer widget={widget}>
            <div
                className='flex w-full h-full flex-1 overflow-hidden'
                style={{
                    borderRadius: `${data?.container?.border?.rounded ? `${data?.container?.border?.rounded}px` : ''}`,
                }}
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
                    <button
                        className={`flex h-[200px] w-full items-center justify-center p-6 relative transition-all ${panel1Data?.url ? 'hover:scale-105 hover:opacity-50' : ''}`}
                        style={{ cursor: panel1Data?.url ? 'pointer' : 'auto' }}
                        onClick={panel1Data?.url ? () => redirect(panel1Data, 1) : undefined}
                    >
                        <ContentResizeWidget
                            value={panel1Data.value || ''}
                            textColor={panel1Data?.textColor || layout?.textsColor}
                            textAlign={panel1Data?.textAlign || 'center'}
                            image={panel1Data?.img?.uploadImgUrl}
                            placeholder="Panel 1"
                        />
                    </button>
                </div>
                <Separator orientation="vertical" className="h-auto border-[0.5px]" />
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
                            <button className={`flex w-full h-full items-center justify-center p-6 relative transition-all ${panel2Data?.url ? 'hover:scale-105' : ''}`}
                                style={{ cursor: panel2Data?.url ? 'pointer' : 'auto' }}
                                onClick={panel2Data?.url ? () => redirect(panel2Data, 2) : undefined}
                            >
                                <ContentResizeWidget
                                    value={panel2Data?.value || ''}
                                    textColor={panel2Data?.textColor || layout?.textsColor}
                                    textAlign={panel2Data?.textAlign || 'center'}
                                    image={panel2Data?.img?.uploadImgUrl}
                                    placeholder="Panel 2"
                                />
                            </button>
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
                                backgroundColor: sizes && sizes[2].bgColor || ''
                            }}
                        >
                            <button className={`flex w-full h-full items-center justify-center p-6 relative transition-all ${panel3Data?.url ? 'hover:scale-105' : ''}`}
                                style={{ cursor: panel3Data?.url ? 'pointer' : 'auto' }}
                                onClick={panel3Data?.url ? () => redirect(panel3Data, 3) : undefined}
                            >
                                <ContentResizeWidget
                                    value={panel3Data?.value || ''}
                                    textColor={panel3Data?.textColor || layout?.textsColor}
                                    textAlign={panel3Data?.textAlign || 'center'}
                                    image={panel3Data?.img?.uploadImgUrl}
                                    placeholder="Panel 3"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </WidgetBaseCardContainer>
    )
}
