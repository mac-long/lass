import { supabase } from '$lib/supabase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { getSession }, params }) {
	const session = await getSession();

	if (!session) {
		throw error(401, 'Not logged in');
	}

	const { data: league, error } = await supabase
		.from('leagues')
		.select('*')
		.eq('id', params.league)
		.single();

	if (error) {
		throw error(500, 'Error loading league');
	}

	if (league) {
		return {
			league
		};
	}
}
