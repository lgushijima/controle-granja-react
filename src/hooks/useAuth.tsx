import {useContext} from 'react';
import AuthContext from '@/context/AuthProvider';
import {AuthContextType} from '@/types/authTypes';

const useAuth = () => {
    return useContext<AuthContextType>(AuthContext);
};

export default useAuth;
