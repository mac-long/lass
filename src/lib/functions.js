export const getTeamName = (id, teams) => {
	return teams.find((team) => team.id === id).name;
};
