<script lang="ts">
	import { ProductCard } from '$lib/components';
	import type { Product, WarehouseHistory } from '$lib/types';

	let products: Product[] = [
		{
			id: '1',
			name: 'Apple',
			description: 'This is an apple',
			quantity: 0,
			tags: ['Fruit', 'Apple'],
			image: 'https://picsum.photos/300/200',
			barcode: '123456789',
			minimumQuantity: 10,
			preferredQuantity: 20
		},
		{
			id: '2',
			name: 'Carrot',
			description: 'This is a carrot',
			quantity: 0,
			tags: ['Fruit', 'Carrot', 'Vegetable'],
			image: 'https://picsum.photos/300/200',
			barcode: '123456789',
			minimumQuantity: 10,
			preferredQuantity: 20
		}
	];

	const historyHeaders: string[] = ['Id', 'Action', 'Target', 'Amount', 'User', 'Date'];
	const historyBody: WarehouseHistory[] = [
		{
			id: '1',
			action: 'add',
			target: '1',
			amount: 10,
			user: '1',
			date: '2021-10-10'
		},
		{
			id: '2',
			action: 'add',
			target: '1',
			amount: 10,
			user: '1',
			date: '2021-10-10'
		}
	];

	// $: getStatistics = async function getStatistics(): Promise<any> {
	// 	if (!$contextStore.warehouseId) return;
	// 	const response = await fetch(
	// 		`http://localhost:3000/warehouses/${$contextStore.warehouseId}/products`,
	// 		{
	// 			credentials: 'include'
	// 		}
	// 	);
	// 	return await response.json();
	// };

	// onMount(async () => {
	// 	$userStore && $contextStore && goto('/products');
	// });
</script>

<div
	class="min-w-[75%] container h-full mx-auto grid items-center grid-cols-[repeat(auto-fit,_minmax(800px,_1fr))] gap-4"
>
	<div class="flex flex-col gap-10">
		<div class="font-bold text-9xl">Home Manager</div>
		<div class="text-lg">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, nisi, id cupiditate quo amet
			quam nihil voluptatem labore obcaecati temporibus quidem consequatur fugiat accusamus nemo
			tempora asperiores ad explicabo unde magnam aspernatur quia. Tempora voluptate eos voluptas
			saepe illo rem voluptates blanditiis iure? Quae officiis nesciunt veniam hic recusandae
			doloribus ex blanditiis ullam incidunt maxime doloremque ipsa molestiae animi atque,
			voluptatum aliquid rem consectetur nihil iusto sunt? Provident error maxime cum delectus rerum
			tempore laborum, doloremque placeat cumque assumenda sit illo odit? Saepe quos animi sunt
			optio, voluptatem natus recusandae quis sequi atque perspiciatis et iusto, iure vitae ipsa!
			Magnam?
		</div>
	</div>
	<div class="flex flex-col gap-6">
		<div class="flex justify-evenly">
			<ProductCard product={products[0]} />
			<ProductCard product={products[1]} />
		</div>
		<!-- <HistoryList {historyHeaders} {historyBody} /> -->
	</div>
</div>
