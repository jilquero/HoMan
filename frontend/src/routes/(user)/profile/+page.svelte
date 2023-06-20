<script lang="ts">
	import { stringProxy, superValidateSync, superForm } from 'sveltekit-superforms/client';
	import TextInput from '$lib/components/form/TextInput.svelte';
	import { editUserSchema } from '$lib/schemas';
	import { userStore } from '$lib/stores';
	import { fetchUser } from '$lib/util';

	const data = superValidateSync($userStore, editUserSchema);

	const { form, errors, reset, enhance, validate } = superForm(data, {
		SPA: true,
		validators: editUserSchema,
		validationMethod: 'auto',
		taintedMessage: null,
		resetForm: true
	});

	const password = stringProxy(form, 'password', { empty: 'undefined' });
	const confirmPassword = stringProxy(form, 'confirmPassword', { empty: 'undefined' });
	const phone = stringProxy(form, 'phone', { empty: 'undefined' });
	const lastName = stringProxy(form, 'lastName', { empty: 'undefined' });
	const firstName = stringProxy(form, 'firstName', { empty: 'undefined' });

	async function handleSubmit() {
		const result = await validate();
		if (!result.valid) return;
		const response = await fetch(`http://localhost:3000/api/users/${$userStore?.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify($form)
		});
		const data = await response.json();
		console.log(data);

		const user = await fetchUser();
		$userStore = user;
	}

	let isEditing = false;
</script>

<!-- <SuperDebug data={$form} /> -->

<div class="h-full flex justify-center items-center">
	<div
		class="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-surface-800 dark:border-gray-700 variant-form-materialk"
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1
				class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
			>
				Profile info
			</h1>
			<form class="space-y-4 md:space-y-6" method="POST" on:submit={handleSubmit} use:enhance>
				<TextInput
					disabled={!isEditing}
					label="Email"
					name="email"
					type="email"
					placeholder=""
					bind:value={$form.email}
					errors={$errors.email}
				/>
				<TextInput
					disabled={!isEditing}
					label="Username"
					name="username"
					placeholder=""
					bind:value={$form.username}
					errors={$errors.username}
				/>
				<TextInput
					disabled={!isEditing}
					hidden={!isEditing}
					type="password"
					label="Password"
					name="password"
					placeholder=""
					bind:value={$password}
					errors={$errors.password}
				/>
				<TextInput
					disabled={!isEditing}
					hidden={!isEditing}
					type="password"
					label="Confirm password"
					name="confirmPassword"
					placeholder=""
					bind:value={$confirmPassword}
					errors={$errors.confirmPassword}
				/>
				<TextInput
					disabled={!isEditing}
					label="First name"
					name="firstName"
					placeholder=""
					bind:value={$firstName}
					errors={$errors.firstName}
				/>
				<TextInput
					disabled={!isEditing}
					label="Last name"
					name="lastName"
					placeholder=""
					bind:value={$lastName}
					errors={$errors.lastName}
				/>
				<TextInput
					disabled={!isEditing}
					label="Phone"
					name="phone"
					placeholder=""
					bind:value={$phone}
					errors={$errors.phone}
				/>
				{#if isEditing}
					<button
						type="reset"
						on:click={() => {
							isEditing = false;
							reset();
						}}
						class="btn variant-filled">Cancle</button
					>
					<button class="btn variant-filled">Save</button>
				{:else}
					<button type="button" on:click={() => (isEditing = true)} class="btn variant-filled"
						>Edit</button
					>
				{/if}
			</form>
		</div>
	</div>
</div>
