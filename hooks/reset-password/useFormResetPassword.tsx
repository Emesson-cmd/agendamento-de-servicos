'use client';

import { resetPasswordService } from '@/services/password-reset/password-reset.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';

const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type ResetPasswordFormType = z.infer<typeof resetPasswordFormSchema>;

export type UseFormResetPasswordType = {
  form: ReturnType<typeof useForm<ResetPasswordFormType>>;
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  resetFields: () => void;
};

export default function useFormResetPassword(
  token: string
): UseFormResetPasswordType {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onResetPasswordFormSubmit(data: ResetPasswordFormType) {
    setIsSubmitting(true);
    try {
      const result = await resetPasswordService({
        token,
        password: data.password,
      });

      toast.success('Senha redefinida', {
        description: 'Sua senha foi alterada com sucesso',
        icon: <Check />,
      });
      router.push('/');
    } catch (error) {
      const err = error as Error;
      toast.error('Erro ao redefinir senha', {
        description: err.message,
        icon: <CircleX />,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const onSubmit = async (event?: React.BaseSyntheticEvent) =>
    form.handleSubmit(onResetPasswordFormSubmit)(event);

  const resetFields = () => form.reset();

  const output: UseFormResetPasswordType = {
    form,
    onSubmit,
    isSubmitting,
    resetFields,
  };

  return output;
}
