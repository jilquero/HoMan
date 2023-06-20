// import type { Handle } from '@sveltejs/kit';

// export async function handleFetch({ event, request, fetch }) {
// 	// console.log('event', event);
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request');
// 	console.log('request', request.url);
// 	if (request.url.startsWith('http://localhost:3000/')) {
// 		request.headers.set('AuthCookie', event.request.headers.get('AuthCookie') ?? '');
// 		request = new Request(
// 			request.url.replace('http://localhost:3000/', 'http://backend:3000/'),
// 			request
// 		);
// 	}
// 	console.log('request', request.url);

// 	return fetch(request);
// }

// export const handle: Handle = async ({ event, resolve }) => {
// 	let token = event.cookies.get('AuthCookie');

// 	if (!token) return await resolve(event);

// 	token = token.replace('s:', '');
// 	token = token.substring(0, token.lastIndexOf('.'));

// 	const req = await fetch('http://backend:3000/api/users/me', {
// 		headers: { Authorization: `Bearer ${token}` }
// 	});

// 	const user = await req.json();

// 	if (!user) {
// 		const response = await resolve(event);
// 		response.headers.set(
// 			'Set-Cookie',
// 			'AuthCookie=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
// 		);
// 	}
// 	// console.log('user', user);

// 	event.locals.user = {
// 		id: user.id,
// 		email: user.email,
// 		username: user.username,
// 		firstName: user.firstName,
// 		lastName: user.lastName,
// 		image: user.image,
// 		phone: user.phone,
// 		contexts: user.contexts
// 	};

// 	return await resolve(event);
// };
