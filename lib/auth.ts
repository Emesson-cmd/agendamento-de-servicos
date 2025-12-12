import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { toast } from 'sonner';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Step 1: Call backend login endpoint
          const loginResponse = await fetch(
            `${process.env.API_URL}/users/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!loginResponse.ok) {
            console.error('Login failed:', loginResponse.statusText);
            toast.error('Login failed', {
              description: loginResponse.statusText,
            });
            return null;
          }

          const loginData = await loginResponse.json();
          const { authToken, refreshToken } = loginData;

          const userResponse = await fetch(`${process.env.API_URL}/users/me`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (!userResponse.ok) {
            console.error(
              'Failed to fetch user data:',
              userResponse.statusText
            );
            return null;
          }

          const userData = await userResponse.json();
          return {
            id: userData.id,
            email: userData.email,
            name: '',
            authToken,
            refreshToken,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
};
