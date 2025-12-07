'use server';

export type RegisterServiceInput = {
  email: string;
  password: string;
};

export type RegisterServiceOutput = void;

export async function registerService(
  input: RegisterServiceInput
): Promise<RegisterServiceOutput> {
  console.log(input);
  return Promise.resolve();
}
