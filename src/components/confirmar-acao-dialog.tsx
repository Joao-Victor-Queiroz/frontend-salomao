import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
    open: boolean;
    onClose: () => void;
    titulo?: string;
    descricao?: string;
    onConfirmar: () => void;
    isLoading?: boolean;
};

export function ConfirmarAcaoDialog({
    open,
    onClose,
    titulo = "Confirmar exclusão",
    descricao = "Essa ação não pode ser desfeita. Tem certeza que deseja continuar?",
    onConfirmar,
    isLoading = false,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>{titulo}</DialogTitle>
                    <DialogDescription>{descricao}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" disabled={isLoading} />} onClick={onClose}>
                        Cancelar
                    </DialogClose>
                    <Button variant="destructive" onClick={onConfirmar} disabled={isLoading}>
                        {isLoading ? "Excluindo..." : "Confirmar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
