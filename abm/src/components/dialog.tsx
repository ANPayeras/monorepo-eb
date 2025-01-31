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

export function AlertDialogComponent({ open, onOpenChange, onConfirm }: { open: boolean, onOpenChange: () => void, onConfirm: () => void }) {
 const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, onOpenChange)
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent ref={ref} className="w-[90%] rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Desea crear un nuevo template?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cualquier cambio no guardado se perdera
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
