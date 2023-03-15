import { writable } from 'svelte/store';

export const configVisibile = writable(false);
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
]);
export const sortFilter = writable({ name: 'pts', order: 'desc' });
export const teamsTable = writable([]);
