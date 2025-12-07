'use client';

import { registerService } from '@/services/register/register.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

const registerFormSchema = z
  .object({
    email: z.email('E-mail inválido'),
    password: z.string().min(5, 'Senha muito curta'),
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

  function onRegisterFormSubmit(data: RegisterFormType) {
    registerService({
      email: data.email,
      password: data.password,
    });
  }

  const onSubmit = async (event?: React.BaseSyntheticEvent) =>
    form.handleSubmit(onRegisterFormSubmit)(event);

  const output: UseFormRegisterType = {
    form,
    onSubmit,
  };

  return output;
}
