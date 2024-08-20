import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';

import {UserType} from '@/types/userTypes';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {APIErrorType} from '@/types/generalTypes';
import useAlertDialog from '@/hooks/useAlertDialog';
import {saveUser} from '@/api/user';
import useAuth from '@/hooks/useAuth';
import TextInput from '@/components/forms/TextInput';
import SelectBox from '@/components/forms/SelectBox';

const userSchema = z
    .object({
        id: z.string().optional(),
        idCliente: z.string().optional(),
        nome: z.string({message: 'Valor inválido'}).min(3, 'Campo obrigatório e mínimo de 3 caracteres.'),
        login: z.string({message: 'Valor inválido'}).min(3, 'Campo obrigatório e mínimo de 3 caracteres.'),
        senha: z.string().optional(),
        senhaConfirmacao: z.string({message: 'Valor inválido'}),
        perfil: z.string({message: 'Valor inválido'}).min(1, 'Campo obrigatório'),
        ativo: z.boolean({message: 'Valor inválido'}),
        // ativo: z.enum(['1', '0'], {
        //     errorMap: () => ({message: 'Selecione um status válido'}),
        // }),
    })
    .superRefine(({id, senha}, ctx) => {
        if ((id && senha) || !id) {
            const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
            const containsLowercase = (ch: string) => /[a-z]/.test(ch);
            const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

            let countOfUpperCase = 0,
                countOfLowerCase = 0,
                countOfNumbers = 0,
                countOfSpecialChar = 0;

            if (senha) {
                for (let i = 0; i < senha.length; i++) {
                    let ch = senha.charAt(i);
                    if (!isNaN(+ch)) countOfNumbers++;
                    else if (containsUppercase(ch)) countOfUpperCase++;
                    else if (containsLowercase(ch)) countOfLowerCase++;
                    else if (containsSpecialChar(ch)) countOfSpecialChar++;
                }
            }

            const isInvalid = countOfLowerCase < 1 || countOfUpperCase < 1 || countOfSpecialChar < 1 || countOfNumbers < 1;

            if (isInvalid) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'A senha não cumpre os critérios minímos de segurança.',
                    path: ['senha'],
                });
            }
        }
    })
    .superRefine(({senhaConfirmacao, senha}, ctx) => {
        if (senhaConfirmacao !== senha) {
            ctx.addIssue({
                code: 'custom',
                message: 'A confirmação da senha não é a mesma que a senha informada.',
                path: ['senhaConfirmacao'],
            });
        }
    });

type UserSchema = z.infer<typeof userSchema>;

interface UsuarioCadastroModalProps {
    isOpen: boolean;
    selectedUser: UserType;
    onClose: () => void;
    onSuccess?: (data: UserType) => void;
}

export function UsuarioCadastroModal({isOpen, selectedUser, onClose, onSuccess}: UsuarioCadastroModalProps) {
    const {auth} = useAuth();
    const {openAlertDialog, closeAlertDialog, openAlertDialogLoading} = useAlertDialog();

    const mutation = useMutation<UserType, AxiosError<APIErrorType>, UserType>({
        mutationFn: data => saveUser(data, auth?.token),
        onSuccess: (data, variables, context) => {
            closeAlertDialog();
            onClose();
            if (typeof onSuccess === 'function') onSuccess(data);
        },
        onError: err => {
            openAlertDialog({
                title: 'Oops!',
                titleClassName: 'text-red-700',
                subtitle: 'Não foi possível completar esta ação.',
                message: err?.response?.data ? err.response.data?.error : 'Ocorreu um erro ao tentar salvar os dados informados.',
                enableClose: true,
            });
        },
    });

    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<UserSchema>({
        defaultValues: selectedUser || {
            ativo: true,
            id: '',
            idCliente: '',
            nome: '',
            perfil: '',
            senha: '',
            senhaConfirmacao: '',
            login: '',
        },
        resolver: zodResolver(userSchema),
    });

    const handleSaveSubmit = (data: UserSchema) => {
        openAlertDialogLoading();
        mutation.mutate({
            ativo: data.ativo,
            id: data.id || '',
            idCliente: data.idCliente || '',
            nome: data.nome,
            perfil: data.perfil,
            login: data.login,
            senha: data.senha || '',
        });
    };

    const listaPerfil = [
        {value: 'granjeiro', text: 'Granjeiro'},
        {value: 'proprietario', text: 'Proprietário'},
        {value: 'tecnico', text: 'Técnico'},
    ];
    const listaStatus = [
        {value: '1', text: 'Ativo'},
        {value: '0', text: 'Inativo'},
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[460px] md:max-w-[600px] lg:max-w-[800px] rounded-md gap-0 ">
                <DialogHeader className=" space-y-0">
                    <DialogTitle className="text-xl">{selectedUser.id ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}</DialogTitle>
                    <DialogDescription className="mt-0 text-left italic text-sm text-gray-400">
                        Preencha corretamente todos os campos abaixo
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleSaveSubmit)}>
                    <input type="hidden" {...register('id')} />

                    <div className="mt-4 mb-10 pt-4 border-t">
                        <div className="form-row">
                            <TextInput label="Nome" divClassName="" name="nome" register={register('nome')} fieldError={errors.nome} />
                        </div>
                        <div className="form-row">
                            <TextInput
                                label="Usuário"
                                divClassName="md:w-6/12"
                                name="login"
                                register={register('login')}
                                fieldError={errors.login}
                            />
                            <TextInput
                                label="Senha"
                                type="password"
                                divClassName="md:w-3/12"
                                name="senha"
                                register={register('senha')}
                                fieldError={errors.senha}
                            />
                            <TextInput
                                label="Confirmar Senha"
                                type="password"
                                divClassName="md:w-3/12"
                                name="senhaConfirmacao"
                                register={register('senhaConfirmacao')}
                                fieldError={errors.senhaConfirmacao}
                            />
                        </div>
                        <div className="form-row">
                            <SelectBox
                                name="perfil"
                                label="Perfil"
                                subtitle="Selecione um perfil"
                                defaultValue={''}
                                divClassName="md:w-6/12"
                                control={control}
                                fieldError={errors.perfil}
                                items={listaPerfil}
                            />

                            <SelectBox
                                name="ativo"
                                label="Status"
                                subtitle="Selecione um status"
                                defaultValue={true}
                                divClassName="md:w-6/12"
                                control={control}
                                fieldError={errors.ativo}
                                formatValue={value => (value ? '1' : '0')}
                                onValueChange={value => value === '1'}
                                items={listaStatus}
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="button" className="btn btn-secondary" onClick={onClose}>
                            Fechar
                        </Button>
                        <Button type="submit" className="btn btn-primary">
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
