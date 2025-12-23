'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { Check, CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const loginFormSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export type UseFormLoginType = {
  form: ReturnType<typeof useForm<LoginFormType>>;
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
};

export default function useFormLogin(): UseFormLoginType {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onLoginFormSubmit(data: LoginFormType) {
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success('Login realizado com sucesso', {
          description: 'Redirecionando para o dashboard...',
          icon: <Check />,
        });

        form.reset();
        router.push('/dashboard');
      } else {
        toast.error('Erro ao fazer login', {
          description: 'Credenciais inválidas',
          icon: <CircleX />,
        });
      }
    } catch (error) {
      const err = error as Error;
      toast.error('Erro ao fazer login', {
        description: err.message,
        icon: <CircleX />,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = async (event?: React.BaseSyntheticEvent) =>
    form.handleSubmit(onLoginFormSubmit)(event);

  const output: UseFormLoginType = {
    form,
    onSubmit,
    isLoading,
  };

  return output;
}
