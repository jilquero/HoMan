<script lang="ts">
	import { Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let logout = () => {};
	export let user: any;

	let profilePopup: PopupSettings = {
		event: 'focus-click',
		target: 'target'
	};
</script>

<button use:popup={profilePopup}>
	<Avatar initials={user.username.slice(0, 2)} background="bg-primary-500" />
</button>
<div class="card p-4 w-fit" data-popup={'target'}>
	<div class="grid grid-rows-1 gap-2">
		<a href="/profile" class="btn bg-surface-500 hover:variant-filled flex justify-start">
			<i class="material-icons">edit</i>
			<span>Settings</span>
		</a>
		<a href="/warehouses" class="btn bg-surface-500 hover:variant-filled flex justify-start">
			<i class="material-icons">delete</i>
			<span>Warehouses</span>
		</a>
		<button class="btn bg-surface-500 hover:variant-filled flex justify-start" on:click={logout}>
			<i class="material-icons">delete</i>
			<span>Logout</span>
		</button>
	</div>
</div>
