export const load = async ({ locals: { getSession } }) => {
	let session = getSession();
	console.log(session);
	return {
		session: session
	};
};
