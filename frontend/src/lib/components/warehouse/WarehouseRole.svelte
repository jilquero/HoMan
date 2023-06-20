<script lang="ts">
	import { editUserRoleSchema, productSchema } from '$lib/schemas';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { ChipInput } from '..';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let parent: any;
	export let action: string;
	export let roles: any;

	const data = superValidateSync(roles, editUserRoleSchema);
	const { form, errors, enhance, reset, validate } = superForm(data, {
		SPA: true,
		validators: editUserRoleSchema,
		validationMethod: 'auto'
	});

	async function onFormSubmit(): Promise<void> {
		const result = await validate();
		if (!result.valid) return;
		if ($modalStore[0].response) $modalStore[0].response($form);
		modalStore.close();
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<SuperDebug data={$form} />
		<h1 class={cHeader}>{$modalStore[0].title}</h1>
		<form
			class="space-y-4 md:space-y-6"
			method="POST"
			on:submit={onFormSubmit}
			use:reset
			use:enhance
		>
			<ChipInput
				name="tags"
				label="Tags"
				placeholder="USER"
				whitelist={['OWNER', 'USER']}
				bind:value={$form.roles}
				errors={$errors.roles}
			/>

			<footer class="modal-footer {parent.regionFooter}">
				<button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
					>{parent.buttonTextCancel}</button
				>
				<button class="btn {parent.buttonPositive}">{action}</button>
			</footer>
		</form>
	</div>
{/if}
