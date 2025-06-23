import { FC } from "react"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { SheetPaymentProps } from "./types"

export const SheetPayment: FC<SheetPaymentProps> = ({ open, handleChange, children, title, description, descriptionClassName, subTitle }) => {
    return (
        <Sheet open={open} onOpenChange={() => handleChange()}>
            <SheetContent className="w-full xs:w-3/4 overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription className={descriptionClassName}>
                        {description}
                    </SheetDescription>
                    <SheetDescription>
                        {subTitle}
                    </SheetDescription>
                </SheetHeader>
                {children}
            </SheetContent>
        </Sheet>
    )
}
