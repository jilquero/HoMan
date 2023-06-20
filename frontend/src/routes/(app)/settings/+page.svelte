<script lang="ts">
	import SelectInput from '$lib/components/form/SelectInput.svelte';
	import TextInput from '$lib/components/form/TextInput.svelte';
	import WarehouseNewMember from '$lib/components/warehouse/WarehouseNewMember.svelte';
	import WarehouseRole from '$lib/components/warehouse/WarehouseRole.svelte';
	import { warehouseSchema } from '$lib/schemas';
	import { contextStore, userStore } from '$lib/stores';
	import { fetchUser } from '$lib/util';
	import {
		Avatar,
		modalStore,
		popup,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';

	const warehouseData = superValidateSync(warehouseSchema);
	const { form, errors, reset, enhance, validate } = superForm(warehouseData, {
		SPA: true,
		validators: warehouseSchema,
		validationMethod: 'auto',
		taintedMessage: null,
		resetForm: true
	});

	let isEditing = false;
	let refresh = false;

	let warehouse: any;
	let contexts: any;

	async function handleSubmit() {
		const result = await validate();
		if (!result.valid) return;
		const response = await fetch(
			`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify($form)
			}
		);
		const data = await response.json();
		console.log(data);

		$userStore = await fetchUser();
		isEditing = false;
		$form.name = data.name;
		$form.icon = data.icon;
	}

	async function handleAddUser() {
		const c: ModalComponent = {
			ref: WarehouseNewMember,
			props: {
				action: 'Add member'
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'New member',
			body: 'This is an example modal.',
			response: async (r: any) => {
				if (!r) return;
				const response = await fetch(
					`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}/contexts`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						credentials: 'include',
						body: JSON.stringify({ email: r.email, roles: ['USER'] })
					}
				);
				refresh = !refresh;
				return await response.json();
			}
		};
		modalStore.trigger(modal);
	}

	async function handleRemoveUser(id: any) {
		const response = await fetch(
			`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}/contexts/${id}`,
			{
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ status: 'INACTIVE' })
			}
		);
		refresh = !refresh;
		return await response.json();
	}

	async function handleEditRoles(id: any, roles: any) {
		const c: ModalComponent = {
			ref: WarehouseRole,
			props: {
				action: 'Change',
				roles: { roles: roles }
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'Change roles',
			body: 'This is an example modal.',
			response: async (r: any) => {
				if (!r) return;
				const response = await fetch(
					`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}/contexts/${id}`,
					{
						method: 'PATCH',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(r)
					}
				);
				refresh = !refresh;
				return await response.json();
			}
		};
		modalStore.trigger(modal);
	}

	function getRoles(contexts: any, context: any): string {
		return contexts
			.find((ctx: any) => {
				return ctx.id === context.id;
			})
			.roles.map((role: any) => {
				return role.name;
			});
	}

	$: getContexts = (async function getContexts(refresh: any): Promise<any> {
		await setTimeout(() => {}, 10000);
		const response = await fetch(
			`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}/contexts`,
			{
				credentials: 'include'
			}
		);
		return await response.json();
	})(refresh).then((data) => {
		contexts = data;
	});

	$: getWarehouse = (async function getPWarehouse(): Promise<any> {
		const response = await fetch(
			`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}`,
			{
				credentials: 'include'
			}
		);
		const data = await response.json();
		warehouse = data;
		$form.name = data.name;
		$form.icon = data.icon;
		return data;
	})();

	$: getUser = async function getUser(id: string): Promise<any> {
		const response = await fetch(`http://localhost:3000/api/users/${id}`, {
			credentials: 'include'
		});
		return await response.json();
	};

	$: filteredContexts = contexts && contexts.filter((ctx: any) => ctx.status != 'INACTIVE');
</script>

<div class="h-full flex justify-center items-center flex-col gap-10">
	<div
		class="bg-white w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-surface-800 dark:border-gray-700 variant-form-materialk"
	>
		<div class="p-4 space-y-4 md:space-y-6 sm:p-8">
			{#if contexts}
				<ul class="list flex flex-col gap-6">
					{#each filteredContexts as context}
						<li class="bg-surface-700 p-2 flex-grow">
							{#await getUser(context.userId)}
								<div class="placeholder" />
								<div class="placeholder" />
							{:then user}
								<Avatar initials={user.username.slice(0, 2)} background="bg-primary-500" />
								<span>{user.username}</span>
								<span class="flex-auto">
									{getRoles(contexts, context) || 'USER'}
								</span>
								<span class="flex-auto">
									{context.status || 'ACTIVE'}
								</span>
								<button
									use:popup={{
										event: 'focus-click',
										target: `${context.id}`,
										closeQuery: '.test'
									}}><i class="material-icons">more_vert</i></button
								>
								<div class="card p-4" data-popup={`${context.id}`}>
									<div class="grid grid-cols-1 gap-2">
										<button
											id={`${context.id}_edit`}
											class="btn variant-filled-error test"
											on:click={() => {
												handleEditRoles(context.id, getRoles(contexts, context));
											}}
										>
											<i class="material-icons">edit</i>
											<span>Edit</span>
										</button>
										<button
											id={`${context.id}_delete`}
											class="btn variant-filled-success test"
											on:click={() => {
												handleRemoveUser(context.id);
											}}
										>
											<i class="material-icons">delete</i>
											<span>Delete</span>
										</button>
									</div>
								</div>
							{/await}
						</li>
					{/each}
					<button class="btn flex-1" on:click={handleAddUser}>
						<li class="bg-surface-200 w-full text-black p-2 flex justify-center gap-2">
							<i class="material-icons">add</i>Add new member
						</li>
					</button>
				</ul>
			{:else}
				<section class="card w-full">
					<div class="p-4 space-y-4">
						<div class="placeholder" />
						<div class="grid grid-cols-3 gap-8">
							<div class="placeholder" />
							<div class="placeholder" />
							<div class="placeholder" />
						</div>
						<div class="grid grid-cols-4 gap-4">
							<div class="placeholder" />
							<div class="placeholder" />
							<div class="placeholder" />
							<div class="placeholder" />
						</div>
					</div>
				</section>
			{/if}
		</div>
	</div>

	<div
		class="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-surface-800 dark:border-gray-700 variant-form-materialk"
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<ul class="list">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Warehouse details
				</h1>
				<form class="space-y-4 md:space-y-6" method="POST" on:submit={handleSubmit} use:enhance>
					{#if warehouse}
						<TextInput
							disabled={!isEditing}
							label="Name"
							name="name"
							type="name"
							placeholder="name"
							bind:value={$form.name}
							errors={$errors.name}
						/>
						<SelectInput
							disabled={!isEditing}
							label="Icon"
							name="icon"
							bind:value={$form.icon}
							errors={$errors.icon}
						/>
					{:else}
						<div class="placeholder" />
					{/if}
					{#if isEditing}
						<button
							type="reset"
							on:click={() => {
								isEditing = false;
								$form.name = warehouse.name;
								$form.icon = warehouse.icon;
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
			</ul>
		</div>
	</div>
</div>
