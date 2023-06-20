import type { User } from './types';

export async function fetchUser(id = 'me'): Promise<User> {
	console.log('fetching user');
	const res = await fetch('http://localhost:3000/api/users/' + id, {
		method: 'GET',
		credentials: 'include'
	});
	const userWithNulls = await res.json();
	console.log('user fetched', userWithNulls);

	const user = Object.fromEntries(
		Object.entries(userWithNulls).filter(([_, v]) => v !== null)
	) as User;
	console.log('user fetched', user);

	return user;
}

export async function fetchWarehouse(id: string) {
	const res = await fetch('http://localhost:3000/api/warehouses/' + id, {
		method: 'GET',
		credentials: 'include'
	});
	const warehouse = await res.json();

	return warehouse;
}
