import { supabase } from '$lib/supabase';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();
	const { data: leagues } = await supabase.from('leagues').select('*').eq('user', session.user.id);

	return {
		leagues
	};
};

export const actions = {
	new: async ({ locals: { getSession }, request }) => {
		const session = await getSession();
		const data = await request.formData();

		const { data: leagues, error } = await supabase
			.from('leagues')
			.insert({
				user: session.user.id,
				name: data.get('name'),
				description: data.get('description'),
				color: data.get('color'),
				currentSeason: 1
			})
			.select('*');

		const { data: season, error: seasonError } = await supabase.from('seasons').insert({
			league: leagues[0].id,
			number: 1
		});

		if (error || seasonError) {
			return {
				status: 500,
				error
			};
		} else {
			return {
				status: 200,
				body: {
					leagues,
					season
				}
			};
		}
	}
};
