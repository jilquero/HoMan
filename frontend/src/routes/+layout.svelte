<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { WarehouseSelector } from '$lib/components';
	import UserActions from '$lib/components/user/UserActions.svelte';
	import { contextStore, userStore } from '$lib/stores';
	import { tabs } from '$lib/tabs';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		AppBar,
		AppRail,
		AppRailAnchor,
		AppShell,
		Drawer,
		LightSwitch,
		Modal,
		Toast,
		storePopup
	} from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let warehouses: any = [];

	$: {
		$userStore &&
			$userStore.contexts.map(async (context: any) => {
				const response = await fetch(
					`http://localhost:3000/api/warehouses/${context.warehouseId}`,
					{
						credentials: 'include'
					}
				);
				const data = await response.json();
				warehouses[context.id] = data;
			});
	}

	$: permissions = $contextStore?.roles
		? $contextStore?.roles.flatMap((role: any) => role.role.permissions)
		: [];

	async function logout() {
		await fetch('http://localhost:3000/api/auth/logout', {
			method: 'POST',
			credentials: 'include'
		});

		$userStore = null;
		$contextStore = null;
		goto('/');
	}
</script>

<Drawer />
<Toast zIndex="0" />
<Modal />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead"><a href="/" class="font-bold">HoMan</a></svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
				{#if $userStore && $userStore.id != ''}
					<WarehouseSelector
						contexts={$userStore.contexts}
						{warehouses}
						bind:value={$contextStore}
					/>
					<i class="material-icons">search</i>
					<i class="material-icons">notifications</i>
					<UserActions {logout} user={$userStore} />
				{:else}
					<a href="/login">Login</a>
					<a href="/register">Register</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		{#if $contextStore && $contextStore.id != '' && tabs
				.flatMap((tab) => tab.premission)
				.some((premission) => permissions.includes(premission))}
			<AppRail background="bg-surface-500">
				{#each tabs as tab}
					{#if permissions.includes(tab.premission) || tab.premission == null}
						<AppRailAnchor
							selected={$page.url.pathname === tab.url}
							href={tab.url}
							class={tab.url === $page.url.pathname ? '!bg-primary-500' : ''}
						>
							{tab.name}
						</AppRailAnchor>
					{/if}
				{/each}
			</AppRail>
		{/if}
	</svelte:fragment>

	<div class="p-6 h-full">
		<slot />
	</div>
</AppShell>
