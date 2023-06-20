<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import { ProductRow } from '..';

	export let products: any;
	export let onEdit: any;
	export let onDelete: any;
	export let onAddOne: any;
	export let onRemoveOne: any;

	let page = {
		offset: 0,
		limit: 5,
		size: products.length,
		amounts: [1, 2, 5, 10]
	};

	$: paginatedProducts = products.slice(
		page.offset * page.limit, // start
		page.offset * page.limit + page.limit // end
	);
</script>

<div class="overflow-x-auto w-full">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<!-- <th>
					<label>
						<input type="checkbox" class="checkbox" />
					</label>
				</th> -->
				<th>Name</th>
				<th>Tags</th>
				<th>Amount</th>
				<th>Actions</th>
				<th />
			</tr>
		</thead>
		<!-- body -->
		<tbody>
			{#each paginatedProducts as product}
				<ProductRow {product} {onEdit} {onDelete} {onAddOne} {onRemoveOne} />
			{/each}
		</tbody>
		<!-- foot -->
		<tfoot>
			<tr>
				<!-- <th /> -->
				<th>Name</th>
				<th>Tags</th>
				<th>Amount</th>
				<th>Actions</th>
				<th />
			</tr>
		</tfoot>
	</table>
</div>
<Paginator bind:settings={page} />
