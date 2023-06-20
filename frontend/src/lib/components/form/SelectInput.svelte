<script lang="ts">
	import { warehouseIcons } from '$lib/icons';
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { number } from 'zod';

	export let name: string | undefined = undefined;
	export let value: any = '';
	export let label: string | undefined = undefined;
	export let errors: any = undefined;

	export let disabled: boolean = false;

	export let iconsCombobox: any = {
		event: 'focus-click',
		target: 'iconsCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	let icons = warehouseIcons.reduce((acc: any, icon: any) => {
		acc[icon.name] = icon;
		return acc;
	}, []);
</script>

<div>
	<label for="Icon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>{label}</label
	>
	<button
		{disabled}
		type="button"
		class="btn variant-filled w-48 justify-between"
		use:popup={iconsCombobox}
	>
		<span class="capitalize">
			{#if value !== ''}
				<i class="material-icons">{icons[value].icon}</i>
				{icons[value].name}
			{:else}
				Trigger
			{/if}
		</span>
		<span>↓</span>
	</button>
	<div class="card w-48 shadow-xl p-2" data-popup="iconsCombobox">
		<ListBox>
			{#each warehouseIcons as icon, i}
				<ListBoxItem bind:group={value} name="medium" value={icon.name} class="">
					<i class="material-icons">{icon.icon}</i>
					{icon.name}
				</ListBoxItem>
			{/each}
		</ListBox>
	</div>
	{#if errors}
		<small class="text-error-500">{errors}</small>
	{/if}
</div>
