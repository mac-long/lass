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

	const { data: league, error } = await supabase
		.from('leagues')
		.select('*')
		.eq('id', params.league)
		.single();

	if (error) {
		console.log(error);
		return {
			status: 500,
			redirect: '/dashboard'
		};
	}

	if (league) {
		return {
			league
		};
	}
}

export const actions = {
	edit: async ({ request }) => {
		const data = await request.formData();

		const { data: league, error } = await supabase.from('leagues').update({
			name: data.get('name'),
			description: data.get('description'),
			color: data.get('color')
		});

		if (error) {
			console.log(error);
			return {
				status: 500,
				error
			};
		} else {
			return {
				status: 200,
				body: {
					league
				}
			};
		}
	},
	delete: async ({ params }) => {
		const { error } = await supabase.from('leagues').delete().eq('id', params.league);

		if (error) {
			console.log(error);
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
	}
};
