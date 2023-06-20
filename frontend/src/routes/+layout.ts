// import type { LayoutLoad } from './$types';

// export const load = (async ({ data, fetch }) => {
// 	const { user } = data;

// 	if (!user) return;

// 	const fetchWarehouses = async () => {
// 		return data.user.contexts.map(async (context: any) => {
// 			const response = await fetch(`http://localhost:3000/api/warehouses/${context.warehouseId}`, {
// 				credentials: 'include'
// 			});
// 			return await response.json();
// 		});
// 	};

// 	return { ...data, warehouses: Promise.all(await fetchWarehouses()) };
// }) satisfies LayoutLoad;
