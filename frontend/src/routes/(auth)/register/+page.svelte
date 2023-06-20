<script lang="ts">
	import { Step, Stepper } from '@skeletonlabs/skeleton';

	import { goto } from '$app/navigation';
	import SelectInput from '$lib/components/form/SelectInput.svelte';
	import TextInput from '$lib/components/form/TextInput.svelte';
	import { newUserSchema } from '$lib/schemas';
	import { contextStore, userStore } from '$lib/stores';
	import { fetchUser } from '$lib/util';
	import debounce from 'lodash/debounce';
	import { stringProxy, superForm, superValidateSync } from 'sveltekit-superforms/client';

	const validated = superValidateSync(newUserSchema);
	const { form, errors, enhance, validate } = superForm(validated, {
		SPA: true,
		validators: newUserSchema,
		validationMethod: 'auto'
	});

	const phone = stringProxy(form, 'phone', { empty: 'undefined' });
	const lastName = stringProxy(form, 'lastName', { empty: 'undefined' });
	const firstName = stringProxy(form, 'firstName', { empty: 'undefined' });

	const warehouseName = stringProxy(form, 'warehouseName', { empty: 'undefined' });
	const warehouseIcon = stringProxy(form, 'warehouseIcon', { empty: 'undefined' });

	$: firstStep = !(
		$form.email != '' &&
		$form.password != '' &&
		$form.confirmPassword != '' &&
		$errors.email == undefined &&
		$errors.password == undefined &&
		$errors.confirmPassword == undefined
	);

	$: secondStep = !(
		$form.username != '' &&
		$errors.username == undefined &&
		$errors.firstName == undefined &&
		$errors.lastName == undefined &&
		$errors.phone == undefined
	);

	$: thirdStep = !($errors.warehouseName == undefined && $errors.warehouseIcon == undefined);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const result = await validate();
		if (!result.valid) return;

		let test = await fetch('http://localhost:3000/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				email: $form.email,
				password: $form.password,
				username: $form.username,
				firstName: $form.firstName,
				lastName: $form.lastName,
				phone: $form.phone
			})
		});

		if ($form.warehouseName === '' && warehouseIcon === null) {
			const result = await fetch('http://localhost:3000/api/warehouses', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					name: $form.warehouseName,
					icon: $form.warehouseIcon
				})
			});
		}

		$userStore = await fetchUser();
		$contextStore = $userStore.contexts[0] || null;
		goto('/');
	}

	// const handleEmail = debounce(async function checkEmail() {
	// 	const response = await fetch('http://localhost:3000/api/users/email?email=' + $form.email);
	// 	const data = await response.json();
	// 	if (!data) {
	// 		$errors.email = ['Email already taken'];
	// 	} else {
	// 		$errors.email = undefined;
	// 	}
	// }, 1000);

	// $: if ($form.email !== '') handleEmail();
</script>

<!-- <SuperDebug data={$form} /> -->

<div class="h-full flex justify-center items-center">
	<div
		class="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-surface-800 dark:border-gray-700 variant-form-materialk"
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<form class="space-y-4 md:space-y-6" method="POST" on:submit={handleSubmit} use:enhance>
				<Stepper buttonCompleteType="submit">
					<Step locked={firstStep}>
						<svelte:fragment slot="header">
							<h1
								class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
							>
								Sign up for an account
							</h1>
						</svelte:fragment>
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
						<TextInput
							label="Confirm Password"
							name="confirmPassword"
							type="password"
							placeholder="••••••••"
							bind:value={$form.confirmPassword}
							errors={$errors.confirmPassword}
						/>
						<p class="text-sm font-light text-gray-500 dark:text-gray-400">
							Have an account already? <a
								href="/register"
								class="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>Sign in</a
							>
						</p>
					</Step>
					<Step locked={secondStep}>
						<svelte:fragment slot="header"
							><h1
								class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
							>
								Personal information
							</h1></svelte:fragment
						>
						<TextInput
							label="Username"
							name="username"
							type="text"
							placeholder="username"
							bind:value={$form.username}
							errors={$errors.username}
						/>
						<TextInput
							label="* First Name"
							name="firstName"
							type="text"
							placeholder="John"
							bind:value={$firstName}
							errors={$errors.firstName}
						/>
						<TextInput
							label="* Last Name"
							name="lastName"
							type="text"
							placeholder="Doe"
							bind:value={$lastName}
							errors={$errors.lastName}
						/>
						<TextInput
							label="* Phone Number"
							name="phone"
							type="text"
							placeholder="123-456-7890"
							bind:value={$phone}
							errors={$errors.phone}
						/>
					</Step>
					<Step locked={thirdStep}>
						<svelte:fragment slot="header"
							><h1
								class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
							>
								* New warehouse
							</h1></svelte:fragment
						>
						<TextInput
							label="* Name"
							name="warehouseName"
							type="text"
							placeholder="Home"
							bind:value={$warehouseName}
							errors={$errors.warehouseName}
						/>
						<SelectInput
							label="* Icon"
							name="warehouseIcon"
							bind:value={$warehouseIcon}
							errors={$errors.warehouseIcon}
						/>
					</Step>
				</Stepper>
			</form>
		</div>
	</div>
</div>
