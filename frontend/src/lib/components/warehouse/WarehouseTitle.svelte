<script lang="ts">
	import { warehouseIcons } from '$lib/icons';

	export let warehouse: any;

	let icons: any = warehouseIcons.reduce((acc: any, cur: any) => {
		acc[cur.name] = cur.icon;
		return acc;
	}, {});
</script>

<i class="material-icons">
	{icons[warehouse.icon] ?? ''}
</i>
{warehouse.name}
