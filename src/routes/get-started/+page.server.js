import {redirect} from '@sveltejs/kit';

export const load = async ({url, locals: {getSession}}) => {
  const session = await getSession();

  if (session) {
    throw redirect(303, '/dashboard');
  }

  return {url: url.origin};
};
