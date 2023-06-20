<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let product: any;
	export let onEdit: any;
	export let onDelete: any;
	export let onAddOne: any;
	export let onRemoveOne: any;

	function shadow(product: any) {
		if (product.minimumQuantity != null && product.quantity < product.minimumQuantity) {
			return 'bg-primary-500';
		} else if (product.preferredQuantity != null && product.quantity < product.preferredQuantity) {
			return 'bg-warning-800';
		} else {
			return '';
		}
	}

	export let optionsPopup: PopupSettings = {
		event: 'focus-click',
		target: `${product.id}`,
		closeQuery: '.test'
	};

	function removeOne() {
		if (product.quantity <= 0) return;
		onRemoveOne(product);
	}

	function addOne() {
		onAddOne(product);
	}
</script>

<tr>
	<!-- <th>
		<label>
			<input type="checkbox" class="checkbox" />
		</label>
	</th> -->
	<td>{product.name}</td>
	<td class="flex gap-4">
		{#each product.tags as tag}
			<span class="chip variant-ringed-primary">{tag}</span>
		{/each}
	</td>
	<td class={shadow(product)}>{product.quantity}</td>
	<th class="">
		<div class="variant-filled-primary flex justify-center items-center rounded-lg w-fit">
			<button class="" on:click={addOne}><i class="material-icons">add</i></button>
			<input class="aspect-square h-10 input rounded-none" type="text" placeholder="1" value="1" />
			<button class="" on:click={removeOne}><i class="material-icons">remove</i></button>
		</div>
	</th>
	<th>
		<button use:popup={optionsPopup}><i class="material-icons">more_vert</i></button>
		<div class="card p-4" data-popup={`${product.id}`}>
			<div class="grid grid-cols-1 gap-2">
				<button
					id={`${product.id}_edit`}
					class="btn variant-filled-error test"
					on:click={onEdit(product)}
				>
					<i class="material-icons">edit</i>
					<span>Edit</span>
				</button>
				<button
					id={`${product.id}_delete`}
					class="btn variant-filled-success test"
					on:click={onDelete(product.id)}
				>
					<i class="material-icons">delete</i>
					<span>Delete</span>
				</button>
			</div>
		</div>
	</th>
</tr>
