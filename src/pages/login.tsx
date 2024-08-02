import useAuth from '@/hooks/useAuth';
import axios from '@/api/axios';
import {useEffect, useState} from 'react';

import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

import {useNavigate, useLocation} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {useMutation} from 'react-query';
import {AuthType} from '@/types/authTypes';
import {AxiosError} from 'axios';
import {APIErrorType} from '@/types/generalTypes';
import useAlertDialog from '@/hooks/useAlertDialog';

const loginSchema = z.object({
    login: z.string().min(2),
    senha: z.string().min(4),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
    const {openAlertDialog, closeAlertDialog, openAlertDialogLoading} = useAlertDialog();
    const {auth, login} = useAuth();

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (!auth?.token) {
            const user = localStorage.getItem('cg-cliente');
            if (user) {
                login(JSON.parse(user));
                navigate(from, {replace: true});
                setIsLoading(false);
                return;
            }
        }
        setIsLoading(false);
    });

    const mutation = useMutation<AuthType, AxiosError<APIErrorType>, LoginSchema>({
        mutationFn: data => {
            return axios.post('api/Auth/validarAcesso', data).then(response => response.data);
        },
        onSuccess: data => {
            login(data);
            navigate(from, {replace: true});
            closeAlertDialog();
        },
        onError: err => {
            openAlertDialog({
                title: 'Oops!',
                titleClassName: 'text-red-700',
                subtitle: 'Falha na autenticação',
                message: err?.response?.data ? err.response.data?.error : 'Não foi possível autenticar seu usuário',
                enableClose: true,
            });
        },
    });

    const {register, handleSubmit} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const handleLoginSubmit = async (data: LoginSchema) => {
        openAlertDialogLoading();
        mutation.mutate(data);
    };

    return isLoading ? (
        ''
    ) : (
        <div className="flex justify-between items-center h-full ">
            <div className="w-full max-w-96 mx-auto border rounded-lg p-10 bg-white relative">
                <img src="/images/logo.png" className="absolute w-40 -top-20 left-1/2 transform -translate-x-1/2" />

                <div className="text-center">
                    <h2 className="text-3xl mt-5 mb-2 text-primary font-bold">Controle de Granja</h2>
                    <p className="font-bold text-gray-500">Autenticação de usuário</p>
                </div>

                <form onSubmit={handleSubmit(handleLoginSubmit)} className="pt-10">
                    <div className="mb-2">
                        <Label className="block text-base text-gray-500 ">Usuário</Label>
                        <Input
                            type="text"
                            placeholder="Informe seu nome de usuário"
                            autoComplete="false"
                            {...register('login')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                        />
                    </div>

                    <div className="mb-2">
                        <Label className="block text-base text-gray-500 ">Senha</Label>
                        <Input
                            type="password"
                            placeholder="Informe sua senha de acesso"
                            autoComplete="false"
                            {...register('senha')}
                        />
                    </div>

                    <Button type="submit" className="w-full mt-4" disabled={mutation.isLoading}>
                        {mutation.isLoading ? (
                            <>
                                <i className="fal fa-spinner fa-spin mr-2" /> Autenticando...
                            </>
                        ) : (
                            'Login'
                        )}
                    </Button>
                </form>

                <div className="text-center text-xs text-gray-400 mt-10">versão 2024.6.17.1</div>
            </div>
        </div>
    );
}
