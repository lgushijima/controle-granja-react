import {useContext} from 'react';
import AlertDialogContext, {AlertDialogContextType} from '@/context/AlertDialogProvider';

const useAlertDialog = () => {
    return useContext<AlertDialogContextType>(AlertDialogContext);
};

export default useAlertDialog;
