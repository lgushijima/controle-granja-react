import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {AlertDialogType} from '@/types/generalTypes';

export function CustomAlertDialog(data: AlertDialogType) {
    return (
        <AlertDialog open={data.isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    {data.title && <AlertDialogTitle>{data.title}</AlertDialogTitle>}
                    <AlertDialogDescription>{data.message}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {typeof data.onClose === 'function' ? (
                        <AlertDialogCancel onClick={data.onClose}>{data.closeText || 'Fechar'}</AlertDialogCancel>
                    ) : (
                        ''
                    )}
                    {typeof data.onConfirm === 'function' ? (
                        <AlertDialogAction onClick={data.onConfirm}>
                            {data.confirmText || 'Confirmar'}
                        </AlertDialogAction>
                    ) : (
                        ''
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
