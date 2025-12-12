'use server';

export type RegisterServiceInput = {
  email: string;
  password: string;
};

export type RegisterServiceOutput = {
  message: string;
};

type RequestData = {
  email: string;
  password: string;
};

type ResponseErrorData = {
  statusCode: number;
  timestamp: string;
  message: string;
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

  const result = await fetch(`${process.env.API_URL}/users`, fetchOptions);

  if (result.ok) {
    const output: RegisterServiceOutput = {
      message: 'Cadastro realizado com sucesso',
    };

    return output;
  }

  if (
    result.headers.get('Content-Type')?.includes('application/json') ||
    result.headers.get('Content-Type') === 'application/json'
  ) {
    const { message, timestamp, statusCode } =
      (await result.json()) as ResponseErrorData;
    console.error(`${timestamp} - ${statusCode}: ${message}`);

    throw new Error(message);
  }

  console.error(
    `Error while registering user: ${result.status} - ${result.statusText}`
  );

  throw new Error('Um erro inesperado ocorreu');
}
