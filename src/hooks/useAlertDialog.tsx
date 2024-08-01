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
import React, {useState} from 'react';

export function useAlertDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<AlertDialogType>({
        isOpen: false,
        title: 'Oops',
        message: 'sorry',
        onClose: () => {
            setIsOpen(false);
        },
    });

    const openAlertDialog = (open: boolean, data: AlertDialogType) => {
        if (open) {
            setData(data);
            if (open && !isOpen) setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const CustomAlertDialog = () => (
        <AlertDialog open={isOpen}>
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
                            {data.confirmElement
                                ? React.cloneElement(data.confirmElement)
                                : data.confirmText || 'Confirmar'}
                        </AlertDialogAction>
                    ) : (
                        ''
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

    return {
        openAlertDialog,
        CustomAlertDialog,
    };
}
