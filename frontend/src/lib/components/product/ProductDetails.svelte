<script lang="ts">
	import { goto } from '$app/navigation';
	import { productSchema } from '$lib/schemas';
	import { modalStore } from '@skeletonlabs/skeleton';
	import {
		numberProxy,
		superForm,
		superValidateSync
	} from 'sveltekit-superforms/client';
	import { ChipInput, TextInput } from '..';

	export let parent: any;
	export let action: string;
	export let product: any = undefined;

	const data = superValidateSync(product, productSchema);
	const { form, errors, enhance, reset, validate } = superForm(data, {
		SPA: true,
		validators: productSchema,
		validationMethod: 'auto'
	});

	const quantity = numberProxy(form, 'quantity', { empty: 'undefined' });
	const minimumQuantity = numberProxy(form, 'minimumQuantity', { empty: 'undefined' });
	const preferredQuantity = numberProxy(form, 'preferredQuantity', { empty: 'undefined' });

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
		<!-- <SuperDebug data={$form} /> -->
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
			<TextInput
				name="description"
				label="Description"
				placeholder="Red fruit"
				bind:value={$form.description}
				errors={$errors.description}
			/>
			<ChipInput
				name="tags"
				label="Tags"
				placeholder="Red, Fruit, Apple"
				bind:value={$form.tags}
				errors={$errors.tags}
			/>
			<TextInput
				name="quantity"
				label="Quantity"
				placeholder="10"
				bind:value={$quantity}
				errors={$errors.quantity}
			/>
			<TextInput
				name="minimumQuantity"
				label="Minimum quantity"
				placeholder="2"
				bind:value={$minimumQuantity}
				errors={$errors.minimumQuantity}
			/>
			<TextInput
				name="prefferedQuantity"
				label="Preffered quantity"
				placeholder="5"
				bind:value={$preferredQuantity}
				errors={$errors.preferredQuantity}
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
