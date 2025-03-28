import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { useRef } from "react"
import { AlertDialogProps } from "./types";

export function AlertDialogComponent({
    open,
    onOpenChange,
    onConfirm,
    description,
    title,
    acceptText = 'Continuar',
    cancelText = 'Cancelar'
}: AlertDialogProps) {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, onOpenChange)
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent ref={ref} className="w-[90%] rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription className="whitespace-pre-line">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>{acceptText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
