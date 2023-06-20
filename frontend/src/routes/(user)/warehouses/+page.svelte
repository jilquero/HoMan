<script lang="ts">
	import WarehouseTitle from '$lib/components/warehouse/WarehouseTitle.svelte';
	import { contextStore, userStore } from '$lib/stores';
	import { fetchUser } from '$lib/util';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import WarehouseNew from '$lib/components/warehouse/WarehouseNew.svelte';

	let refresh: boolean = false;

	let warehousess: any = [];

	$: {
		$userStore &&
			(warehousess = $userStore.contexts.map(async (context: any) => {
				const response = await fetch(
					`http://localhost:3000/api/warehouses/${context.warehouseId}`,
					{
						credentials: 'include'
					}
				);
				return await response.json();
			}));
	}

	$: console.log(warehousess);

	async function leaveWarehouse(warehouseId: string, contextId: string) {
		console.log('leave');
		const response = await fetch(
			`http://localhost:3000/api/warehouses/${warehouseId}/contexts/${contextId}/leave`,
			{
				method: 'POST',
				credentials: 'include'
			}
		);

		$userStore = await fetchUser();
		$contextStore = !$userStore.contexts.length ? $userStore.contexts[0] : null;
		refresh = !refresh;
	}

	async function joinWarehouse(warehoueId: any, contextId: any) {
		console.log('join');
		const response = await fetch(
			`http://localhost:3000/api/warehouses/${warehoueId}/contexts/${contextId}/accept`,
			{
				method: 'POST',
				credentials: 'include'
			}
		);

		$userStore = await fetchUser();
		$contextStore = $userStore.contexts[0];
		refresh = !refresh;
	}

	async function createWarehouse() {
		console.log('create');
		const c: ModalComponent = {
			ref: WarehouseNew,
			props: {
				action: 'Create'
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'Create a warehouse',
			body: 'This is an example modal.',
			response: async (r: any) => {
				if (!r) return;

				const response = await fetch(`http://localhost:3000/api/warehouses`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include',
					body: JSON.stringify(r)
				});

				$userStore = await fetchUser();
				$contextStore = $userStore.contexts[0];
				refresh = !refresh;
			}
		};
		modalStore.trigger(modal);
	}
</script>

{#await Promise.all(warehousess) then warehouses}
	<div class="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
		{#each warehouses as warehouse}
			<div class="card overflow-hidden max-w-sm">
				<header class="aspect-[3/2]">
					<img class="w-full h-auto object-fit" src="https://picsum.photos/300/200" alt="" />
				</header>
				<section class="p-4">
					<WarehouseTitle {warehouse} />
				</section>
				<footer class="card-footer">
					<div class="flex flex-col justify-between flex-wrap gap-4">
						<div class="flex justify-center m-a gap-2">
							{#if $userStore && $userStore.contexts.find((ctx) => ctx.warehouseId === warehouse.id)?.status === 'ACTIVE'}
								<button
									class="btn rounded variant-filled-secondary"
									on:click={() => {
										console.log(warehouse);
										leaveWarehouse(
											warehouse.id,
											$userStore?.contexts.find((ctx) => ctx.warehouseId === warehouse.id)?.id ?? ''
										);
									}}>Leave</button
								>
							{:else if $userStore}
								<button
									class="btn rounded variant-filled-secondary"
									on:click={() => {
										console.log(warehouse);
										joinWarehouse(
											warehouse.id,
											$userStore?.contexts.find((ctx) => ctx.warehouseId === warehouse.id)?.id ?? ''
										);
									}}>Join</button
								>
							{/if}
						</div>
					</div>
				</footer>
			</div>
		{/each}
		<div class="card overflow-hidden max-w-sm">
			<header class="aspect-[3/2]">
				<img class="w-full h-auto object-fit" src="https://picsum.photos/300/200" alt="" />
			</header>
			<section class="p-4">
				<!-- <WarehouseTitle {warehouse} /> -->
				{'New warehouse'}
			</section>
			<footer class="card-footer">
				<div class="flex flex-col justify-between flex-wrap gap-4">
					<div class="flex justify-center m-a gap-2">
						<button
							class="btn rounded variant-filled-secondary"
							on:click={() => {
								createWarehouse();
							}}>Create new warehouse</button
						>
					</div>
				</div>
			</footer>
		</div>
	</div>
{/await}
