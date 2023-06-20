<script lang="ts">
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import WarehouseTitle from './WarehouseTitle.svelte';

	export let contexts: any = [];
	export let warehouses: any = [];
	export let value: any = '';

	let contextPopup: PopupSettings = {
		event: 'focus-click',
		target: 'contexts',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	$: activeContexts = contexts.filter((context: any) => context.status == 'ACTIVE');
	$: console.log(activeContexts);
</script>

<button class="btn variant-filled w-48" use:popup={contextPopup}>
	{#if value && warehouses[value.id] != null}
		<WarehouseTitle warehouse={warehouses[value.id]} />
	{:else}
		Pick a warehouse
	{/if}
</button>
<div class="card w-48 shadow-xl p-2" data-popup="contexts">
	<ListBox>
		{#each activeContexts as ctx}
			<ListBoxItem bind:group={value} name="medium" value={ctx} class="">
				{#if warehouses[ctx.id]}
					<WarehouseTitle warehouse={warehouses[ctx.id]} />
				{/if}
			</ListBoxItem>
		{:else}
			<ListBoxItem bind:group={value} name="medium" value={null} class="">
				<a href="/warehouses"><i class="material-icons">add</i>Create new</a>
			</ListBoxItem>
		{/each}
	</ListBox>
</div>
