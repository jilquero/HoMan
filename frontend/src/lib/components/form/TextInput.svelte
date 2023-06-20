<script lang="ts">
	export let name: string | undefined = undefined;
	export let value: string | number | undefined = '';
	export let label: string | undefined = undefined;
	export let errors: any = undefined;

	export let onInput: any = () => {};
	export let disabled: any = false;
	export let hidden: any = false;
	export let type: string = 'text';
	export let classes: string =
		'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
	export let placeholder: string;
	const inputProperties = { type, class: classes, placeholder };
</script>

<div class={hidden ? 'invisible hidden' : ''}>
	{#if label}
		<label for={name} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			{label}
		</label>
	{/if}
	<input
		{...inputProperties}
		{disabled}
		{name}
		id={label}
		bind:value
		data-invalid={errors}
		on:input={onInput}
	/>
	{#if errors}
		<small class="text-error-500">{errors}</small>
	{/if}
</div>
