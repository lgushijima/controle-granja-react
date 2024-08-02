import React from 'react';
import {createContext, ReactNode, useState} from 'react';
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

interface Props {
    children: ReactNode;
}

export interface AlertDialogContextType {
    openAlertDialog: (open: boolean, data?: AlertDialogType) => void;
}

export interface AlertDialogType {
    enableClose?: boolean;
    onClose?: () => boolean;
    closeText?: string | JSX.Element;
    closeClassName?: string;

    enableConfirm?: boolean;
    onConfirm?: () => boolean;
    confirmText?: string | JSX.Element;
    confirmClassName?: string;

    title: string | JSX.Element;
    titleClassName?: string;

    subtitle?: string | JSX.Element;
    subtitleClassName?: string;

    message: string | JSX.Element;
    messageClassName?: string;
}

const defaultValue: AlertDialogContextType = {
    openAlertDialog: () => {},
};

const AlertDialogContext = createContext<AlertDialogContextType>(defaultValue);

export const AlertDialogProvider = ({children}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<AlertDialogType>({title: '', message: ''});

    const openAlertDialog = (open: boolean, data?: AlertDialogType) => {
        setIsOpen(open);
        if (data) {
            setData(data);
        }
    };

    return (
        <AlertDialogContext.Provider value={{openAlertDialog}}>
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={`text-xl text-left ${data.titleClassName || ''}`}>
                            {data.title}
                        </AlertDialogTitle>

                        {data.subtitle && (
                            <div className={`mt-0 text-left italic text-gray-400 ${data.subtitleClassName || ''}`}>
                                {data.subtitle}
                            </div>
                        )}

                        <AlertDialogDescription
                            className={`mt-2 pt-2 mb-4 text-base border-t box-border ${data.messageClassName || ''}`}>
                            {data.message}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {data.enableClose && (
                            <AlertDialogCancel
                                onClick={() => {
                                    if (typeof data.onClose === 'function') {
                                        if (data.onClose()) {
                                            setIsOpen(false);
                                            return;
                                        }
                                    } else {
                                        setIsOpen(false);
                                    }
                                }}>
                                {data.closeText || 'Fechar'}
                            </AlertDialogCancel>
                        )}

                        {data.enableConfirm && (
                            <AlertDialogAction
                                onClick={() => {
                                    if (typeof data.onConfirm === 'function') {
                                        if (data.onConfirm()) {
                                            setIsOpen(false);
                                            return;
                                        }
                                    } else {
                                        setIsOpen(false);
                                    }
                                }}>
                                {data.confirmText || 'Confirmar'}
                            </AlertDialogAction>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {children}
        </AlertDialogContext.Provider>
    );
};

export default AlertDialogContext;
