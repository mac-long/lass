import { supabase } from '$lib/supabase';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();
	const { data: leagues } = await supabase.from('leagues').select('*').eq('user', session.user.id);

	return {
		leagues
	};
};
