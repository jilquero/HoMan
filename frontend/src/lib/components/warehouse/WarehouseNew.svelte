<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { warehouseSchema } from '$lib/schemas';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { TextInput } from '..';
	import SelectInput from '../form/SelectInput.svelte';
	import { goto } from '$app/navigation';

	export let parent: any;
	export let action: string;
	export let warehouse: any = undefined;

	const data = superValidateSync(warehouse, warehouseSchema);
	const { form, errors, enhance, reset, validate } = superForm(data, {
		SPA: true,
		validators: warehouseSchema,
		validationMethod: 'auto',
		taintedMessage: null
	});

	async function onFormSubmit(): Promise<void> {
		const result = await validate();
		if (!result.valid) return;
		if ($modalStore[0].response) $modalStore[0].response($form);
		modalStore.close();
		goto('/');
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<h1 class={cHeader}>{$modalStore[0].title}</h1>

		<form
			class="space-y-4 md:space-y-6"
			method="POST"
			on:submit={onFormSubmit}
			use:reset
			use:enhance
		>
			<TextInput
				name="name"
				label="Name"
				placeholder="Apple"
				bind:value={$form.name}
				errors={$errors.name}
			/>

			<SelectInput name="icon" label="Icon" bind:value={$form.icon} errors={$errors.icon} />
			<footer class="modal-footer {parent.regionFooter}">
				<button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
					>{parent.buttonTextCancel}</button
				>
				<button class="btn {parent.buttonPositive}">{action}</button>
			</footer>
		</form>
	</div>
{/if}
