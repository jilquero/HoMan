<script lang="ts">
	import HistoryList from '$lib/components/history/HistoryList.svelte';
	import { contextStore } from '$lib/stores';
	import type { TableSource } from '@skeletonlabs/skeleton';

	const historyHeaders: string[] = [
		'Id',
		'Action',
		'Target',
		'Target Type',
		'Amount',
		'User',
		'Date'
	];

	const table: TableSource = {
		head: historyHeaders,
		body: []
	};

	$: getHistory = async function getHistory(): Promise<History[]> {
		const response = await fetch(
			`http://localhost:3000/api/warehouses/${$contextStore?.warehouseId}/history`,
			{
				credentials: 'include'
			}
		);
		return await response.json();
	};
</script>

{#await getHistory()}
	Loading ...
{:then history}
	<div class="flex flex-col justify-content gap-">
		<HistoryList
			{history}
			{historyHeaders}
			page={{
				offset: 0,
				limit: 10,
				size: history.length,
				amounts: [1, 2, 5, 10, history.length]
			}}
		/>
	</div>
{:catch error}
	{error.message}
{/await}
