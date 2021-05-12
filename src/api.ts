import axios from 'axios';

const api = (() => {
	let instance: {
		getUsers: <T>(id: string) => Promise<T>;
		getPosts: <T>() => Promise<T>;
	};

	const domen: string = 'https://jsonplaceholder.typicode.com';
	const users: string = '/users';
	const posts: string = '/posts';

	const getPosts = async <T>(): Promise<T> => {
		const { data } = await axios(`${domen}${posts}`);
		return data;
	};
	const getUsers = async <T>(): Promise<T> => {
		const { data } = await axios(`${domen}${users}`);
		return data;
	};

	const createInstance = () => ({
		getPosts,
		getUsers,
	});

	return {
		getInstance: () => instance || (instance = createInstance()),
	};
})();

export default api;
