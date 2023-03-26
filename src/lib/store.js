import { writable } from 'svelte/store';

export const headings = writable([
		'Pos',
		'Club',
		'Played',
		'Won',
		'Drawn',
		'Lost',
		'GF',
		'GA',
		'GD',
		'Pts'
	]),
	sortFilter = writable({ name: 'pts', order: 'desc' }),
	teamsTable = writable([]),
	dashboardView = writable('table'),
	visibleSeason = writable(1);
