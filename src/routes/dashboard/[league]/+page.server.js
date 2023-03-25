import { supabase } from '$lib/supabase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { getSession }, params }) {
	const session = await getSession();

	if (!session) {
		return {
			status: 401,
			redirect: '/login'
		};
	}

	const { data: league, error: leagueError } = await supabase
		.from('leagues')
		.select('*')
		.eq('id', params.league)
		.single();

	const { data: teams, error: teamsError } = await supabase
		.from('teams')
		.select('*')
		.eq('league', params.league);

	if (leagueError || teamsError) {
		return {
			status: 500,
			redirect: '/dashboard'
		};
	}

	if (league && teams) {
		return {
			league,
			teams
		};
	}
}

export const actions = {
	edit: async ({ request, params }) => {
		const data = await request.formData();

		const { data: update, error } = await supabase
			.from('leagues')
			.update({
				name: data.get('name'),
				description: data.get('description'),
				color: data.get('color')
			})
			.eq('id', params.league);

		if (error) {
			return {
				status: 500,
				error
			};
		} else {
			return {
				status: 200,
				redirect: `/dashboard/${params.league}`,
				data: update
			};
		}
	},
	delete: async ({ params }) => {
		const { error } = await supabase.from('leagues').delete().eq('id', params.league);

		if (error) {
			return {
				status: 500,
				redirect: '/dashboard'
			};
		} else {
			return {
				status: 200,
				redirect: '/dashboard'
			};
		}
	},
	addTeam: async ({ request, params }) => {
		const data = await request.formData();

		const { data: team, error } = await supabase.from('teams').insert({
			name: data.get('name'),
			player: data.get('player'),
			league: params.league
		});

		if (error) {
			return {
				status: 500,
				redirect: `/dashboard/${params.league}`
			};
		}

		return {
			status: 200,
			data: team
		};
	},
	editTeam: async ({ request, params }) => {
		const data = await request.formData();

		const { data: team, error } = await supabase
			.from('teams')
			.update({
				name: data.get('name'),
				player: data.get('player')
			})
			.eq('id', data.get('id'));

		if (error) {
			return {
				status: 500,
				redirect: `/dashboard/${params.league}`
			};
		}

		return {
			status: 200,
			data: team
		};
	},
	deleteTeam: async ({ request, params }) => {
		const data = await request.formData();

		const { error } = await supabase.from('teams').delete().eq('id', data.get('id'));

		if (error) {
			return {
				status: 500,
				redirect: `/dashboard/${params.league}`
			};
		}

		return {
			status: 200,
			redirect: `/dashboard/${params.league}`
		};
	}
};
