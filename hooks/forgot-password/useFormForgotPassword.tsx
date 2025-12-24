'use client';

import { requestPasswordResetService } from '@/services/password-reset/password-reset.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';

const forgotPasswordFormSchema = z.object({
  email: z.email('E-mail inválido'),
});

type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;

export type UseFormForgotPasswordType = {
  form: ReturnType<typeof useForm<ForgotPasswordFormType>>;
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  resetFields: () => void;
};

export default function useFormForgotPassword(): UseFormForgotPasswordType {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onForgotPasswordFormSubmit(data: ForgotPasswordFormType) {
    setIsSubmitting(true);
    try {
      await requestPasswordResetService({
        email: data.email,
      });

      toast.success('Solicitação enviada', {
        description: 'Verifique seu e-mail para redefinir a senha',
        icon: <Check />,
      });
      router.push('/');
    } catch (error) {
      const err = error as Error;
      toast.error('Erro ao solicitar redefinição', {
        description: err.message,
        icon: <CircleX />,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const onSubmit = async (event?: React.BaseSyntheticEvent) =>
    form.handleSubmit(onForgotPasswordFormSubmit)(event);

  const resetFields = () => form.reset();

  const output: UseFormForgotPasswordType = {
    form,
    onSubmit,
    isSubmitting,
    resetFields,
  };

  return output;
}
