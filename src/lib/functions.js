import {currentSeason, sortFilter, teamsTable, visibleSeason} from './store';

export function getValue(id, array, value) {
  return array.find(item => item.id === id)[value];
}

export function sortTeams(currentSeasonStandings, seasons) {
  let sortFilt, visSeason, curSeason, teams;

  sortFilter.subscribe(value => (sortFilt = value));
  visibleSeason.subscribe(value => (visSeason = value));
  currentSeason.subscribe(value => (curSeason = value));
  teamsTable.subscribe(value => (teams = value));

  if (visSeason !== curSeason) {
    teams = seasons.find(season => season.number === visSeason).table;
  } else {
    teams = currentSeasonStandings;
  }

  teamsTable.set(
    teams.sort((a, b) => {
      return sortFilt.order === 'asc'
        ? a[sortFilt.name.toLowerCase()] - b[sortFilt.name.toLowerCase()]
        : b[sortFilt.name.toLowerCase()] - a[sortFilt.name.toLowerCase()];
    })
  );
}
