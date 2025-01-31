import ToolsWidget from "./tools-widget"
import { useDataStore } from "@/providers/data-store-providers"
import { ResizableWidgetInterface } from "@/interfaces"
import { Separator } from "./ui/separator"

export function ResizableWidget({ widget, selectSection, editWidget, props }: ResizableWidgetInterface) {
    const handleWidgetChanges = useDataStore(state => state.handleWidgetChanges)
    const deleteWidget = useDataStore(state => state.deleteWidget)
    const isEditing = widget.id === editWidget.id
    const _deleteWidget = () => {
        selectSection('', 0, {})
        deleteWidget(widget)
    }

    const sizes = widget?.data?.resizables

    return (
        <>
            <div className='flex w-full h-full p-2' {...props}>
                <div className='flex w-full h-full flex-1 rounded-md border'>
                    <div
                        className='overflow-hidden'
                        style={{ width: `${sizes ? sizes[0].size : 50}%` }}
                    >
                        <div className="flex h-[200px] items-center justify-center p-6">
                            <span className="font-semibold">One</span>
                        </div>
                    </div>
                    <Separator orientation="vertical" className="h-auto" />
                    <div className="w-[50%] flex-grow">
                        <div className="w-full h-full flex flex-col">
                            <div className="w-full overflow-hidden" style={{ height: `${sizes ? sizes[1].size : 25}%` }}>
                                <div className="flex h-full items-center justify-center p-6">
                                    <span className="font-semibold">Two</span>
                                </div>
                            </div>
                            <Separator />
                            <div className="w-full h-full overflow-hidden" style={{ height: `${sizes ? sizes[2].size : 75}%` }}>
                                <div className="flex h-full items-center justify-center p-6">
                                    <span className="font-semibold">Three</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToolsWidget deleteFunc={_deleteWidget} editFunc={() => selectSection('resizableWidget', 0, widget)} isEditing={isEditing} />
        </>
    )
}
