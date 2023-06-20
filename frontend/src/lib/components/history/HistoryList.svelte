<script lang="ts">
	import { Paginator, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { PaginationSettings } from '@skeletonlabs/skeleton/dist/components/Paginator/types';

	export let historyHeaders: string[];
	export let history: History[];
	export let page: PaginationSettings;
</script>

<Table
	source={{
		head: historyHeaders,
		body: tableMapperValues(
			history.slice(page.offset * page.limit, page.offset * page.limit + page.limit),
			['id', 'action', 'targetId', 'targetType', 'quantity', 'contextId', 'date']
		)
	}}
/>
<Paginator bind:settings={page} />
