'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import useFormForgotPassword from '@/hooks/forgot-password/useFormForgotPassword';

export function ForgotPasswordCard() {
  const { form, onSubmit } = useFormForgotPassword();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Esqueci minha senha</CardTitle>
        <CardDescription>
          Digite seu e-mail para redefinir a senha
        </CardDescription>
        <CardAction>
          <Link href="/">
            <Button variant="link">Voltar ao login</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Seu e-mail</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 py-4">
              <Button type="submit" className="w-full">
                Enviar solicitação
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
