import {createAuthClient} from 'better-auth/client';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  fetchOptions: {
    credentials: 'include'
  }
});

export const getSession = async () => {
  const {error, data} = await authClient.getSession();

  if (error) {
    console.error(error);
    return;
  }

  if (data?.user) {
    return data.user;
  }
};

export const signOut = async () => {
  authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        m.route.set('/Login');
      }
    }
  });
};
