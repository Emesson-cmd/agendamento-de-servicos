'use client';

import { registerService } from '@/services/register/register.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, CircleX } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';

const registerFormSchema = z
  .object({
    email: z.email('E-mail inválido'),
    password: z.string().min(8, 'Senha muito curta'),
    confirmPassword: z.string().min(1, 'Confirmação de senha obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas diferentes',
    path: ['confirmPassword'],
  });

type RegisterFormType = z.infer<typeof registerFormSchema>;

export type UseFormRegisterType = {
  form: ReturnType<typeof useForm<RegisterFormType>>;
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
};

export default function useFormRegister(): UseFormRegisterType {
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onRegisterFormSubmit(data: RegisterFormType) {
    setIsLoading(true);
    try {
      const result = await registerService({
        email: data.email,
        password: data.password,
      });

      toast.success('Sucesso', {
        description: result.message,
        icon: <Check />,
      });

      form.reset();
      router.push('/');
    } catch (error) {
      const err = error as Error;
      toast.error('Erro ao realizar cadastro', {
        description: err.message,
        icon: <CircleX />,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = async (event?: React.BaseSyntheticEvent) =>
    form.handleSubmit(onRegisterFormSubmit)(event);

  const output: UseFormRegisterType = {
    form,
    onSubmit,
    isLoading,
  };

  return output;
}
