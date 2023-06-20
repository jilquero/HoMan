<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores';

	if (!$userStore && browser) goto('/login');
</script>

<slot />
