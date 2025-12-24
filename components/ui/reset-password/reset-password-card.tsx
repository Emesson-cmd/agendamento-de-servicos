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
import useFormResetPassword from '@/hooks/reset-password/useFormResetPassword';

interface ResetPasswordCardProps {
  token: string;
}

export function ResetPasswordCard({ token }: ResetPasswordCardProps) {
  const { form, onSubmit } = useFormResetPassword(token);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Redefinir senha</CardTitle>
        <CardDescription>Digite sua nova senha</CardDescription>
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Nova senha</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Digite sua nova senha"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">
                        Confirmar senha
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirme sua nova senha"
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
                Redefinir senha
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
