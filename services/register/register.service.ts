'use server';

export type RegisterServiceInput = {
  email: string;
  password: string;
};

export type RegisterServiceOutput = void;

type RequestData = {
  email: string;
  password: string;
};

export async function registerService(
  input: RegisterServiceInput
): Promise<RegisterServiceOutput> {
  const data: RequestData = {
    email: input.email,
    password: input.password,
  };

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch('http://localhost:3000/users', fetchOptions);

  const responseBody = await response.json();

  console.log(responseBody);

  return;
}
