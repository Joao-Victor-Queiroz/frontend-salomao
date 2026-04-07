'use client';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { LoginSchemaFormType, loginSchemaForm } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { handleLoginAction } from '../actions/auth-actions';

export function LoginForm() {
    const {register, handleSubmit, formState: { isSubmitting } } = useForm<LoginSchemaFormType>({
        resolver: zodResolver(loginSchemaForm)
    })

    const onSubmit = async (data: LoginSchemaFormType) => {
        console.log("A função foi chamada")
        const result = await handleLoginAction(data);

        if(result.error) {
            console.error('Erro ao fazer login:', result.error);
        }

        if(result.success){
            console.log('Login bem-sucedido!');
        }
        
    }

    return(
        <main className='bg-linear-to-t from-red-500 to-amber-200 min-h-screen w-full p-8 grid place-items-center'>
            <form className='p-6 bg-white rounded-2xl w-full max-w-md gap-10 grid place-items-center' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='font-extrabold text-2xl mb-4 text-center text-primary-red'>LOGIN</h1>
                <Field>
                    <FieldLabel htmlFor='email' className='font-bold'>Email</FieldLabel>
                    <Input id='email'type='email' placeholder='Digite seu email...' {...register('email')} />

                    <FieldLabel htmlFor='password' className='font-bold'>Senha</FieldLabel>
                    <Input id='password' type='password' placeholder='Digite sua senha...' {...register('password')} />
                </Field>
                <Button className='bg-primary-red w-full mt-4 rounded-4xl' disabled={isSubmitting} type='submit'>
                    Entrar
                </Button>
            <Link href='#' className='text-sm font-medium pb-8 hover:underline'>
                Não possui cadastro? Cadastre-se agora!
            </Link>
            </form>
        </main>
    )
}