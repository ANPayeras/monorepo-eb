import { FC, ReactNode } from "react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

export const SheetPayment: FC<{ open: boolean, handleChange: (open: boolean) => void, children: ReactNode, title: string, description: string }> = ({ open, handleChange, children, title, description }) => {
    return (
        <Sheet open={open} onOpenChange={() => handleChange(!open)}>
            <SheetContent className="w-full xs:w-3/4 overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                {children}
            </SheetContent>
        </Sheet>
    )
}
