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
    openAlertDialog: (data: AlertDialogType) => void;
    closeAlertDialog: () => void;
    openAlertDialogLoading: () => void;
    openAlertDialogConfirmation: (data: AlertDialogDeleteConfirmationType) => void;
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
interface AlertDialogDeleteConfirmationType {
    reference: string;
    message?: string | JSX.Element;
    onConfirm: () => boolean;
}

const defaultValue: AlertDialogContextType = {
    openAlertDialog: () => {},
    closeAlertDialog: () => {},
    openAlertDialogLoading: () => {},
    openAlertDialogConfirmation: () => {},
};

const AlertDialogContext = createContext<AlertDialogContextType>(defaultValue);

export const AlertDialogProvider = ({children}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<AlertDialogType>({title: '', message: ''});

    const openAlertDialog = (data: AlertDialogType) => {
        setIsOpen(true);
        if (data) {
            setData(data);
        }
    };

    const closeAlertDialog = () => {
        setIsOpen(false);
    };

    const openAlertDialogLoading = () => {
        setIsOpen(true);
        setData({
            title: 'Aguarde!',
            subtitle: 'Este processo pode demorar alguns instantes',
            message: 'Processando dados...',
        });
    };

    const openAlertDialogConfirmation = (data: AlertDialogDeleteConfirmationType) => {
        setIsOpen(true);
        setData({
            title: 'Atenção!',
            subtitle: 'Confirme a ação antes de prosseguir',
            message: data.message ? (
                data.message
            ) : (
                <label>
                    Deseja realmente <b>EXCLUIR</b> este registro:
                    <b className="ml-1 uppercase">{data.reference}</b> ?
                </label>
            ),
            enableClose: true,
            closeText: 'Cancelar',
            enableConfirm: true,
            confirmText: 'EXCLUIR',
            onConfirm: data.onConfirm,
        });
    };

    return (
        <AlertDialogContext.Provider
            value={{openAlertDialog, closeAlertDialog, openAlertDialogLoading, openAlertDialogConfirmation}}>
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={`text-xl text-left ${data.titleClassName || ''}`}>
                            {data.title}
                        </AlertDialogTitle>

                        {data.subtitle && (
                            <div
                                className={`mt-0 text-left italic text-sm text-gray-400 ${
                                    data.subtitleClassName || ''
                                }`}>
                                {data.subtitle}
                            </div>
                        )}

                        <AlertDialogDescription
                            className={`my-4 pt-4 text-base border-t box-border ${data.messageClassName || ''}`}>
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
