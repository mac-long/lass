import {browser} from '$app/environment';
import {writable} from 'svelte/store';

// General
export const theme = browser ? writable(localStorage.getItem('theme')) : writable('dark');

// Header
export const visibleSeason = writable(1),
  currentSeason = writable(1);

// Dashboard
export const dashboardView = writable('created');

//Table
export const sortFilter = writable({name: 'pts', order: 'desc'}),
  teamsTable = writable([]),
  tableHeadings = writable([
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

// Forms
export const newLeagueOpen = writable(false),
  editLeagueOpen = writable(false),
  teamsOpen = writable(false),
  fixtureOpen = writable(false),
  leagueView = writable('table'),
  editLeagueView = writable('info');
