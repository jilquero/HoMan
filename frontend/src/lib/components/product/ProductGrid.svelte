<script lang="ts">
	import { ProductCard } from '..';

	export let products: any;
	export let onEdit: any;
	export let onDelete: any;
	export let onAddOne: any;
	export let onRemoveOne: any;
</script>

<div class="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
	{#each products as product}
		<ProductCard {product} {onEdit} {onDelete} {onAddOne} {onRemoveOne} />
	{/each}
</div>
