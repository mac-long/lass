import { supabase } from '$lib/supabase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { data: league, error: leagueError } = await supabase
		.from('leagues')
		.select()
		.eq('id', params.league)
		.single();

	const { data: teams, error: teamsError } = await supabase
		.from('teams')
		.select()
		.eq('league', params.league);

	const { data: fixtures, error: fixturesError } = await supabase
		.from('fixtures')
		.select()
		.eq('league', params.league);

	const { data: seasons, error: seasonsError } = await supabase
		.from('seasons')
		.select()
		.eq('league', params.league);

	if (leagueError || teamsError || fixturesError || seasonsError) {
		return {
			status: 500,
			redirect: '/dashboard'
		};
	}

	if (league && teams) {
		return {
			league,
			teams,
			fixtures,
			seasons
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
		// select league using params.league
		const { data: league, error: leagueError } = await supabase
			.from('leagues')
			.delete()
			.eq('id', params.league)
			.select();

		if (leagueError) {
			return {
				status: 500,
				leagueError
			};
		} else {
			return {
				status: 200,
				redirect: '/dashboard',
				data: league
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
	},
	addFixture: async ({ request, params }) => {
		const data = await request.formData();
		const home = data.get('home');
		const away = data.get('away');
		const homeScore = Number(data.get('homeScore'));
		const awayScore = Number(data.get('awayScore'));
		const season = Number(data.get('season'));

		const { data: fixture, error } = await supabase.from('fixtures').insert({
			home,
			away,
			homeScore,
			awayScore,
			season,
			league: params.league
		});

		const { data: homeData } = await supabase.from('teams').select().eq('id', home);
		const { data: awayData } = await supabase.from('teams').select().eq('id', away);

		const { data: homeUpdate } = await supabase
			.from('teams')
			.update({
				played: homeData[0].played + 1,
				won: homeData[0].won + (homeScore > awayScore ? 1 : 0),
				drawn: homeData[0].drawn + (homeScore === awayScore ? 1 : 0),
				lost: homeData[0].lost + (homeScore < awayScore ? 1 : 0),
				gf: homeData[0].gf + homeScore,
				ga: homeData[0].ga + awayScore,
				gd: homeData[0].gd + homeScore - awayScore,
				pts: homeData[0].pts + (homeScore > awayScore ? 3 : homeScore === awayScore ? 1 : 0)
			})
			.eq('id', home);

		const { data: awayUpdate } = await supabase
			.from('teams')
			.update({
				played: awayData[0].played + 1,
				won: awayData[0].won + (awayScore > homeScore ? 1 : 0),
				drawn: awayData[0].drawn + (awayScore === homeScore ? 1 : 0),
				lost: awayData[0].lost + (awayScore < homeScore ? 1 : 0),
				gf: awayData[0].gf + awayScore,
				ga: awayData[0].ga + homeScore,
				gd: awayData[0].gd + awayScore - homeScore,
				pts: awayData[0].pts + (awayScore > homeScore ? 3 : awayScore === homeScore ? 1 : 0)
			})
			.eq('id', away);

		if (error) {
			return {
				status: 500,
				redirect: `/dashboard/${params.league}`
			};
		}

		return {
			status: 200,
			body: { fixture, homeUpdate, awayUpdate }
		};
	},
	deleteFixture: async ({ request, params }) => {
		const data = await request.formData();
		const home = data.get('home');
		const away = data.get('away');
		const homeScore = Number(data.get('homeScore'));
		const awayScore = Number(data.get('awayScore'));
		console.log(home, away, homeScore, awayScore);

		const { data: fixture, error } = await supabase
			.from('fixtures')
			.delete()
			.eq('id', data.get('id'));

		const { data: homeData } = await supabase.from('teams').select().eq('id', home);
		const { data: awayData } = await supabase.from('teams').select().eq('id', away);

		const { data: homeUpdate } = await supabase
			.from('teams')
			.update({
				played: homeData[0].played - 1,
				won: homeData[0].won - (homeScore > awayScore ? 1 : 0),
				drawn: homeData[0].drawn - (homeScore === awayScore ? 1 : 0),
				lost: homeData[0].lost - (homeScore < awayScore ? 1 : 0),
				gf: homeData[0].gf - homeScore,
				ga: homeData[0].ga - awayScore,
				gd: homeData[0].gd - homeScore + awayScore,
				pts: homeData[0].pts - (homeScore > awayScore ? 3 : homeScore === awayScore ? 1 : 0)
			})
			.eq('id', home);

		const { data: awayUpdate } = await supabase
			.from('teams')
			.update({
				played: awayData[0].played - 1,
				won: awayData[0].won - (awayScore > homeScore ? 1 : 0),
				drawn: awayData[0].drawn - (awayScore === homeScore ? 1 : 0),
				lost: awayData[0].lost - (awayScore < homeScore ? 1 : 0),
				gf: awayData[0].gf - awayScore,
				ga: awayData[0].ga - homeScore,
				gd: awayData[0].gd - awayScore + homeScore,
				pts: awayData[0].pts - (awayScore > homeScore ? 3 : awayScore === homeScore ? 1 : 0)
			})
			.eq('id', away);

		if (error) {
			return {
				status: 500,
				redirect: `/dashboard/${params.league}`
			};
		}

		return {
			status: 200,
			body: { fixture, homeUpdate, awayUpdate }
		};
	},
	newSeason: async ({ params }) => {
		// Get league
		const { data: league, error: leagueError } = await supabase
			.from('leagues')
			.select()
			.eq('id', params.league)
			.single();

		// Get winner of league
		const { data: winner, error: winnerError } = await supabase
			.from('teams')
			.select()
			.eq('league', params.league)
			.order('pts', { ascending: false }, 'gd', { ascending: false })
			.limit(1);

		// Get current teams table
		const { data: teams, error: teamsError } = await supabase
			.from('teams')
			.select()
			.eq('league', params.league);

		// Store previous season
		const { data: season, error: seasonError } = await supabase
			.from('seasons')
			.update({
				winner: winner[0].id,
				table: teams
			})
			.eq('league', params.league)
			.eq('number', league.currentSeason);

		// Create new season
		const { data: newSeason, error: newSeasonError } = await supabase.from('seasons').insert({
			league: params.league,
			number: league.currentSeason + 1
		});

		// Update league current season
		const { data: leagueUpdate, error: leagueUpdateError } = await supabase
			.from('leagues')
			.update({
				currentSeason: league.currentSeason + 1
			})
			.eq('id', params.league);

		// Reset all teams in teams table
		teams.forEach(async (team) => {
			const { data: teamUpdate, error: teamUpdateError } = await supabase
				.from('teams')
				.update({
					played: 0,
					won: 0,
					drawn: 0,
					lost: 0,
					gf: 0,
					ga: 0,
					gd: 0,
					pts: 0
				})
				.eq('id', team.id);
		});

		return {
			status: 200,
			redirect: `/dashboard/${params.league}`,
			body: {
				league,
				winner,
				teams,
				season,
				newSeason,
				leagueUpdate
			}
		};
	},
	watch: async ({ request, locals: { getSession } }) => {
		const session = await getSession();
		const data = await request.formData();

		const { data: league } = await supabase
			.from('leagues')
			.select()
			.eq('id', data.get('league'))
			.single();

		const { data: leagueUpdate, error } = await supabase
			.from('leagues')
			.update({
				watchers:
					league.watchers?.length > 0
						? league.watchers.includes(session.user.id)
							? [...league.watchers.filter((watcher) => watcher !== session.user.id)]
							: [...league.watchers, session.user.id]
						: [session.user.id]
			})
			.eq('id', data.get('league'));

		if (error) {
			return {
				status: 500,
				redirect: `/dashboard/${data.get('league')}`
			};
		}

		return {
			status: 200,
			body: {
				league,
				leagueUpdate
			}
		};
	}
};
