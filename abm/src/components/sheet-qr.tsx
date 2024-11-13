import { FC } from "react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import Qr from "./qr"

export const SheetQR: FC<{ open: boolean, handleChange: (open: boolean) => void }> = ({ open, handleChange }) => {
    return (
        <Sheet open={open} onOpenChange={() => handleChange(!open)}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Vista previa</SheetTitle>
                    <SheetDescription>
                        Se va a generar un QR y un link donde tendras una vista previa para poder probar el funcionamiento.
                        <br /><br />
                        Tanto el QR como el link tienen una validez de una hora.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex justify-center items-center mt-4">
                    <Qr />
                </div>
            </SheetContent>
        </Sheet>
    )
}
