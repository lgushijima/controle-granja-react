import {Button} from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {UserType} from '@/types/userTypes';
import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

const userSchema = z
    .object({
        id: z.string().optional(),
        idCliente: z.string().optional(),
        nome: z.string().min(3),
        login: z.string().min(3),
        senha: z.string(),
        senhaConfirmacao: z.string(),
        perfil: z.string().min(3),
        ativo: z.boolean(),
        // ativo: z.enum(['1', '0'], {
        //     errorMap: () => ({message: 'Selecione um status válido'}),
        // }),
    })
    .superRefine(({senha}, ctx) => {
        if (senha) {
            const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
            const containsLowercase = (ch: string) => /[a-z]/.test(ch);
            const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
            let countOfUpperCase = 0,
                countOfLowerCase = 0,
                countOfNumbers = 0,
                countOfSpecialChar = 0;
            for (let i = 0; i < senha.length; i++) {
                let ch = senha.charAt(i);
                if (!isNaN(+ch)) countOfNumbers++;
                else if (containsUppercase(ch)) countOfUpperCase++;
                else if (containsLowercase(ch)) countOfLowerCase++;
                else if (containsSpecialChar(ch)) countOfSpecialChar++;
            }
            if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfSpecialChar < 1 || countOfNumbers < 1) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'password does not meet complexity requirements',
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
    selectedUser: UserType | null;
    onClose: () => void;
}

export function UsuarioCadastroModal({isOpen, selectedUser, onClose}: UsuarioCadastroModalProps) {
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
        console.log(data);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[460px] md:max-w-[600px] lg:max-w-[800px] rounded-md gap-0 bg-slate-50">
                <DialogHeader>
                    <DialogTitle>{selectedUser ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}</DialogTitle>
                    <DialogDescription>Preencha corretamente todos os campos abaixo</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleSaveSubmit)}>
                    <input type="hidden" {...register('id')} />

                    <div className="my-4 pt-4 border-t">
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full px-2 mb-2">
                                <Label htmlFor="nome" className="">
                                    Nome{' '}
                                    {errors.nome && (
                                        <span className="text-red-700 text-sm" title={errors.nome.message}>
                                            <i className="fad fa-exclamation-triangle animate-bounce" />
                                        </span>
                                    )}
                                </Label>
                                <Input id="nome" className=" bg-white" autoComplete="false" {...register('nome')} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-6/12 px-2 mb-2">
                                <Label htmlFor="login" className="">
                                    Usuário
                                </Label>
                                <Input id="login" className=" bg-white" autoComplete="false" {...register('login')} />
                            </div>
                            <div className="w-full md:w-3/12 px-2  mb-2">
                                <Label htmlFor="senha" className="">
                                    Senha
                                </Label>
                                <Input id="senha" type={'password'} className="bg-white" {...register('senha')} />
                            </div>
                            <div className="w-full md:w-3/12 px-2  mb-2">
                                <Label htmlFor="senhaConfirmacao" className="">
                                    Confirmar Senha
                                </Label>
                                <Input
                                    id="senhaConfirmacao"
                                    type={'password'}
                                    className="bg-white"
                                    {...register('senhaConfirmacao')}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-6/12 px-2 mb-2">
                                <Label htmlFor="perfil" className="">
                                    Perfil
                                </Label>
                                <Controller
                                    name="perfil"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger id="perfil" className="bg-white">
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Selecione um perfil</SelectLabel>
                                                    <SelectItem value="granjeiro">Granjeiro</SelectItem>
                                                    <SelectItem value="proprietario">Proprietário</SelectItem>
                                                    <SelectItem value="tecnico">Técnico</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div className="w-full md:w-6/12 px-2  mb-2">
                                <Label htmlFor="ativo" className="">
                                    Status
                                </Label>
                                <Controller
                                    name="ativo"
                                    control={control}
                                    defaultValue={true}
                                    render={({field}) => (
                                        <Select
                                            value={field.value ? '1' : '0'}
                                            onValueChange={value => field.onChange(value === '1')}>
                                            <SelectTrigger id="ativo" className="bg-white">
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Selecione um status</SelectLabel>
                                                    <SelectItem value="1">Ativo</SelectItem>
                                                    <SelectItem value="0">Inativo</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant={'secondary'} className="min-w-36 mb-2" onClick={onClose}>
                            Fechar
                        </Button>
                        <Button type="submit" className="min-w-36 mb-2">
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
