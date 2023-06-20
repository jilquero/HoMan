<script lang="ts">
	import { InputChip, toastStore } from '@skeletonlabs/skeleton';

	export let name: string;
	export let value: string[] = [];
	export let label: string | undefined = undefined;
	export let errors: any = undefined;

	export let whitelist: string[] = [
		'VEGETABLES',
		'FRUITS',
		'CLOTHES',
		'SHOES',
		'BAGS',
		'ACCESSORIES',
		'ELECTRONICS',
		'FURNITURE',
		'BOOKS',
		'OTHERS'
	];

	export let classes: string =
		'bg-gray-50 border border-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
	export let placeholder: string;
	const inputProperties = { class: classes, placeholder: placeholder };

	function onInvalid(event: any) {
		toastStore.trigger({
			message: `${whitelist} are valid tags`,
			background: 'bg-error-500'
		});
	}
</script>

<div>
	{#if label}
		<label for={name} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			{label}
		</label>
	{/if}
	<InputChip
		{...inputProperties}
		{whitelist}
		on:invalid={onInvalid}
		allowUpperCase
		rounded=""
		{name}
		{label}
		bind:value
	/>
	{#if errors}
		<small class="text-error-500">{errors._errors}</small>
	{/if}
</div>
