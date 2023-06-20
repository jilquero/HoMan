<script lang="ts">
	import type { Product } from '$lib/types';

	export let product: Product = {
		id: 'f5601c5c-e6c7-4c5f-a37a-4ea87282d081',
		name: 'Product Title',
		description: 'Product Description',
		quantity: 0,
		tags: ['tag1'],
		image: 'https://picsum.photos/200/300',
		barcode: '',
		minimumQuantity: 0,
		preferredQuantity: 0
	};
	export let onEdit: any = () => {};
	export let onDelete: any = () => {};
	export let onAddOne: any = () => {};
	export let onRemoveOne: any = () => {};

	product.image = 'https://picsum.photos/200/300';

	function shadow() {
		if (product.minimumQuantity != null && product.quantity < product.minimumQuantity) {
			return 'shadow-2xl shadow-primary-500';
		} else if (product.preferredQuantity && product.quantity < product.preferredQuantity) {
			return 'shadow-2xl shadow-warning-800';
		} else {
			return '';
		}
	}
</script>

<div class="card overflow-hidden max-w-sm {shadow()}">
	<header class="aspect-[3/2]">
		<img class="w-full h-auto object-fit" src={product.image} alt={product.description} />
	</header>
	<section class="p-4 flex justify-between">
		<span class="my-auto">{product.name}</span>
		<div class="flex">
			<button class="btn" on:click={onEdit}><i class="material-icons">edit</i></button>
			<button class="btn" on:click={onDelete}><i class="material-icons">delete</i></button>
		</div>
	</section>
	<footer class="card-footer">
		<div class="flex flex-col justify-between flex-wrap gap-4">
			<div class="flex">
				<div class="flex gap-1 flex-wrap">
					{#each product.tags as tag}
						<span class="chip variant-ringed-primary">{tag}</span>
					{/each}
				</div>
			</div>
			<div class="flex justify-center m-a gap-2">
				<button class="btn-icon rounded variant-filled-secondary" on:click={onAddOne(product)}
					>+</button
				>
				<div class="flex flex-col justify-center">
					<div class="text-lg">{product.quantity}</div>
				</div>
				<button class="btn-icon rounded variant-filled-secondary" on:click={onRemoveOne(product)}
					>-</button
				>
			</div>
		</div>
	</footer>
</div>
