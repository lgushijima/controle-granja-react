export interface APIErrorType {
    error: string;
    [key: string]: any; // Permite outras propriedades
}

export interface AlertDialogType {
    isOpen: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    closeText?: string;
    confirmText?: string;
    title?: string;
    message: string;
}
