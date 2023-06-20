<script lang="ts">
	import { goto } from '$app/navigation';
	import { TextInput } from '$lib/components';
	import { credentialsSchema } from '$lib/schemas';
	import { contextStore, userStore } from '$lib/stores';
	import { fetchUser } from '$lib/util';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';

	const data = superValidateSync(credentialsSchema);
	const { form, errors, enhance, validate } = superForm(data, {
		SPA: true,
		validators: credentialsSchema,
		validationMethod: 'auto'
	});

	async function handleSubmit() {
		const result = await validate();
		if (!result.valid) return;

		const response = await fetch('http://localhost:3000/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify($form)
		});
		console.log('wtf');

		if (response.status !== 200) {
			console.log('error');
			const { msg } = await response.json();
			console.log(msg);
			$errors.email = msg;
			$errors.password = msg;
			return;
		}

		$userStore = await fetchUser();
		$contextStore = $userStore.contexts[0];
		goto('/');
	}
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
				Sign in to your account
			</h1>
			<form class="space-y-4 md:space-y-6" method="POST" on:submit={handleSubmit} use:enhance>
				<TextInput
					label="Email"
					name="email"
					type="email"
					placeholder="name@company.com"
					bind:value={$form.email}
					errors={$errors.email}
				/>
				<TextInput
					label="Password"
					name="password"
					type="password"
					placeholder="••••••••"
					bind:value={$form.password}
					errors={$errors.password}
				/>
				<div class="flex items-center justify-between">
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input
								id="remember"
								aria-describedby="remember"
								type="checkbox"
								class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
							/>
						</div>
						<div class="ml-3 text-sm">
							<label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
						</div>
					</div>
					<a
						href="/forgot-password"
						class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
						>Forgot password?</a
					>
				</div>
				<button
					type="submit"
					class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>Sign in</button
				>
				<p class="text-sm font-light text-gray-500 dark:text-gray-400">
					Don’t have an account yet? <a
						href="/register"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a
					>
				</p>
			</form>
		</div>
	</div>
</div>
