<script lang="ts">
	import { ProductDetails, ProductTable } from '$lib/components';
	import ProductGrid from '$lib/components/product/ProductGrid.svelte';
	import { contextStore, outputStore } from '$lib/stores';
	import type { Product } from '$lib/types';
	import {
		RadioGroup,
		RadioItem,
		modalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';

	let list: string[] = [];

	let tags: any = [];

	let refresh: boolean = false;

	let products: Product[] = [];

	$: getProducts = (async function getProducts(refresh: any): Promise<Product[]> {
		const response = await fetch(
			`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}/products`,
			{
				credentials: 'include'
			}
		);
		return await response.json();
	})(refresh).then((data) => {
		products = data;
	});

	async function onAddOne(product: any) {
		const response = await fetch(
			`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}/products/${product.id}`,
			{
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ quantity: product.quantity + 1 })
			}
		);
		refresh = !refresh;
	}

	async function onRemoveOne(product: any) {
		const response = await fetch(
			`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}/products/${product.id}`,
			{
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ quantity: product.quantity - 1 })
			}
		);
		refresh = !refresh;
	}

	async function onAdd() {
		const c: ModalComponent = {
			ref: ProductDetails,
			props: {
				action: 'Add product'
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'Add a product',
			body: 'This is an example modal.',
			response: async (r: any) => {
				if (!r) return;
				const response = await fetch(
					`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}/products`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						credentials: 'include',
						body: JSON.stringify(r)
					}
				);
				refresh = !refresh;
			}
		};
		modalStore.trigger(modal);
	}

	async function onEdit(product: any) {
		const c: ModalComponent = {
			ref: ProductDetails,
			props: {
				action: 'Edit product',
				product
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'Add a product',
			body: 'This is an example modal.',
			response: async (r: any) => {
				if (!r) return;
				const result = await fetch(
					`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}/products/${product.id}`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json'
						},
						credentials: 'include',
						body: JSON.stringify(r)
					}
				);
				refresh = !refresh;
			}
		};
		modalStore.trigger(modal);
	}

	async function onDelete(id: string) {
		console.log('delete');
		console.log(id);
		const response = await fetch(
			`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}/products/${id}`,
			{
				method: 'DELETE',
				credentials: 'include'
			}
		);
		const data = await response.json();
		refresh = !refresh;
		return data;
	}
</script>

<!-- <InputChip bind:value={list} whitelist={tags} name="chips" placeholder="Enter any value..." /> -->

<div class="flex flex-col gap-6">
	<div class=" flex justify-between">
		<RadioGroup>
			<RadioItem bind:group={$outputStore} name="justify" value={'grid'}
				><i class="material-icons">grid_view</i>
			</RadioItem>
			<RadioItem bind:group={$outputStore} name="justify" value={'list'}
				><i class="material-icons">list</i>
			</RadioItem>
		</RadioGroup>

		<button type="button" on:click={onAdd} class="btn variant-filled">Add product</button>
	</div>

	{#await getProducts}
		<!-- Loading ... -->
	{:then}
		{#if $outputStore === 'grid'}
			<ProductGrid {products} {onEdit} {onDelete} {onAddOne} {onRemoveOne} />
		{:else}
			<ProductTable {products} {onEdit} {onDelete} {onAddOne} {onRemoveOne} />
		{/if}
	{:catch error}
		{error.message}
	{/await}
</div>
