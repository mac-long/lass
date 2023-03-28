export const getValue = (id, array, value) => {
	return array.find((item) => item.id === id)[value];
};
