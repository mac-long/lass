import { supabase } from '$lib/supabaseClient.js';

export async function load() {
	let { data: teams } = await supabase.from('oldTeams').select('*');

	return {
		teams
	};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const teamOne = data.get('teamOne');
		const teamTwo = data.get('teamTwo');
		const scoreOne = Number(data.get('scoreOne'));
		const scoreTwo = Number(data.get('scoreTwo'));

		const { data: teamOneData } = await supabase.from('oldTeams').select('*').eq('id', teamOne);

		const { data: teamTwoData } = await supabase.from('oldTeams').select('*').eq('id', teamTwo);

		const { data: teamOneUpdated, errorOne } = await supabase
			.from('oldTeams')
			.update({
				played: teamOneData[0].played + 1,
				won: teamOneData[0].won + (scoreOne > scoreTwo ? 1 : 0),
				drawn: teamOneData[0].drawn + (scoreOne === scoreTwo ? 1 : 0),
				lost: teamOneData[0].lost + (scoreOne < scoreTwo ? 1 : 0),
				gf: teamOneData[0].gf + scoreOne,
				ga: teamOneData[0].ga + scoreTwo,
				gd: teamOneData[0].gd + scoreOne - scoreTwo,
				pts: teamOneData[0].pts + (scoreOne > scoreTwo ? 3 : scoreOne === scoreTwo ? 1 : 0)
			})
			.eq('id', teamOne);

		const { data: teamTwoUpdated, errorTwo } = await supabase
			.from('oldTeams')
			.update({
				played: teamTwoData[0].played + 1,
				won: teamTwoData[0].won + (scoreTwo > scoreOne ? 1 : 0),
				drawn: teamTwoData[0].drawn + (scoreTwo === scoreOne ? 1 : 0),
				lost: teamTwoData[0].lost + (scoreTwo < scoreOne ? 1 : 0),
				gf: teamTwoData[0].gf + scoreTwo,
				ga: teamTwoData[0].ga + scoreOne,
				gd: teamTwoData[0].gd + scoreTwo - scoreOne,
				pts: teamTwoData[0].pts + (scoreTwo > scoreOne ? 3 : scoreTwo === scoreOne ? 1 : 0)
			})
			.eq('id', teamTwo);

		if (!errorOne && !errorTwo)
			return {
				status: 200,
				body: {
					status: 'OK',
					teamUpdates: {
						teamOneUpdated,
						teamTwoUpdated
					}
				}
			};
	}
};