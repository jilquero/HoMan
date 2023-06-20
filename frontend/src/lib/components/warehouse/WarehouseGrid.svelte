<script lang="ts">
	import { WarehouseTitle } from '..';

	export let warehouses: any = [
		{
			id: '1',
			name: 'Warehouse 1',
			icon: 'https://picsum.photos/300/200'
		}
	];
	$: console.log(JSON.stringify(warehouses));
</script>

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
					<!-- {#if $userStore && $userStore.contexts.find((ctx) => ctx.warehouseId === warehouse.id)?.status === 'ACTIVE'}
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
						{/if} -->
				</div>
			</div>
		</footer>
	</div>
{/each}
