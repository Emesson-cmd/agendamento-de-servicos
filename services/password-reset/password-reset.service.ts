'use server';

export type RequestPasswordResetInput = {
  email: string;
};

export type RequestPasswordResetOutput = {
  message: string;
};

export type ResetPasswordInput = {
  token: string;
  password: string;
};

export type ResetPasswordOutput = {
  message: string;
};

type RequestPasswordResetData = {
  email: string;
};

type ResetPasswordData = {
  token: string;
  newPassword: string;
};

type ResponseErrorData = {
  statusCode: number;
  timestamp: string;
  message: string;
};

export async function requestPasswordResetService(
  input: RequestPasswordResetInput
): Promise<RequestPasswordResetOutput> {
  const data: RequestPasswordResetData = {
    email: input.email,
  };

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const result = await fetch(
    `${process.env.API_URL}/users/request-password-reset`,
    fetchOptions
  );

  if (result.ok) {
    const output: RequestPasswordResetOutput = {
      message: 'Solicitação de redefinição de senha enviada com sucesso',
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
    `Error while requesting password reset: ${result.status} - ${result.statusText}`
  );

  throw new Error('Um erro inesperado ocorreu');
}

export async function resetPasswordService(
  input: ResetPasswordInput
): Promise<ResetPasswordOutput> {
  const data: ResetPasswordData = {
    token: input.token,
    newPassword: input.password,
  };

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const result = await fetch(
    `${process.env.API_URL}/users/reset-password`,
    fetchOptions
  );

  if (result.ok) {
    const output: ResetPasswordOutput = {
      message: 'Senha redefinida com sucesso',
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
    `Error while resetting password: ${result.status} - ${result.statusText}`
  );

  throw new Error('Um erro inesperado ocorreu');
}
