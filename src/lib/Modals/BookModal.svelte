<script lang="ts">
	import type { Book } from '../../routes/+layout.svelte';
	    import TradeModal from './TradeModal.svelte';

	export let book: Book;
	export let onClose: () => void;
	export let source: 'carousel' | 'grid' = 'grid';
	 let showTradeModal = false;
    
    function openTradeModal() {
        showTradeModal = true;
    }
    
    function closeTradeModal() {
        showTradeModal = false;
    }
</script>

<div class="modal-overlay" role="dialog" aria-modal="true" tabindex="-1"on:click={onClose}>
	<div class="modal-content" on:click|stopPropagation >
		<button class="close-modal" on:click={onClose} aria-label="Close">×</button>
		<div class="modal-body">
			<div class="modal-left">
				<img src={book.image} alt={book.title + ' Cover'} class="modal-book-image" />
			</div>
			<div class="modal-right">
				<h2 class="modal-title">{book.title}</h2>
				<p class="modal-author">by {book.author}</p>
				<p class="modal-description">{book.description}</p>
				{#if source === 'carousel'}
					<button class="trade-button" on:click={openTradeModal}>Add to Tote</button>
				{:else}
					<button class="trade-button" on:click={openTradeModal}>Trade</button>
				{/if}
			</div>
		</div>
	</div>
</div>
{#if showTradeModal}
    <TradeModal bookToTrade={book} onClose={closeTradeModal} />
{/if}
<style>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0,0,0,0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
}
.modal-content {
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 8px 32px rgba(0,0,0,0.2);
	width: 700px;
	max-width: 95vw;
	position: relative;
	padding: 2rem;
}
.close-modal {
	position: absolute;
	top: 1rem;
	right: 1rem;
	background: none;
	border: none;
	font-size: 2rem;
	color: #374151;
	cursor: pointer;
	z-index: 2;
}
.modal-body {
	display: flex;
	flex-direction: row;
	gap: 2rem;
}
.modal-left {
	width: 45%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.modal-book-image {
	width: 250px;
	height: 350px;
	object-fit: cover;
	border-radius: 8px;
	box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
.modal-right {
	width: 55%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}
.modal-title {
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
}
.modal-author {
	font-size: 1rem;
	color: #6b7280;
	margin-bottom: 1rem;
}
.modal-description {
	font-size: 1rem;
	color: #374151;
	margin-bottom: 1.5rem;
}
.trade-button {
	background: #1F3C88;
	color: #fff;
	font-size: 1rem;
	font-weight: 600;
	border: none;
	border-radius: 8px;
	padding: 0.75rem 2rem;
	cursor: pointer;
	margin-top: auto;
	align-self: flex-end;
	transition: background 0.2s;
}
.trade-button:hover {
	background: #16306b;
}
/* Large Screen Optimizations */
@media (min-width: 1920px) {
	.modal-content {
		width: 900px;
		padding: 3rem;
	}
	.modal-book-image {
		width: 300px;
		height: 420px;
	}
	.modal-title {
		font-size: 2.5rem;
	}
	.modal-author {
		font-size: 1.25rem;
	}
	.modal-description {
		font-size: 1.125rem;
	}
	.trade-button {
		font-size: 1.125rem;
		padding: 1rem 2.5rem;
	}
}

@media (max-width: 1024px) {
	.modal-content {
		width: 600px;
		padding: 1.5rem;
	}
	.modal-book-image {
		width: 200px;
		height: 280px;
	}
	.modal-title {
		font-size: 1.75rem;
	}
	.modal-author {
		font-size: 0.9rem;
	}
	.modal-description {
		font-size: 0.9rem;
	}
	.trade-button {
		font-size: 0.9rem;
		padding: 0.65rem 1.75rem;
	}
}

@media (max-width: 768px) {
	.modal-content {
		width: 95vw;
		max-width: 500px;
		padding: 1.5rem;
		margin: 1rem;
	}
	.modal-body {
		flex-direction: column;
		gap: 1.5rem;
	}
	.modal-left, .modal-right {
		width: 100%;
		padding: 0;
	}
	.modal-left {
		display: flex;
		justify-content: center;
	}
	.modal-book-image {
		width: 200px;
		height: 280px;
		margin: 0;
	}
	.modal-title {
		font-size: 1.5rem;
		text-align: center;
	}
	.modal-author {
		font-size: 0.85rem;
		text-align: center;
	}
	.modal-description {
		font-size: 0.85rem;
		text-align: center;
	}
	.trade-button {
		align-self: center;
		font-size: 0.85rem;
		padding: 0.6rem 1.5rem;
	}
}

@media (max-width: 640px) {
	.modal-content {
		width: 95vw;
		max-width: 400px;
		padding: 1rem;
		margin: 0.5rem;
	}
	.modal-book-image {
		width: 160px;
		height: 240px;
	}
	.modal-title {
		font-size: 1.25rem;
	}
	.modal-author {
		font-size: 0.8rem;
	}
	.modal-description {
		font-size: 0.8rem;
	}
	.trade-button {
		font-size: 0.8rem;
		padding: 0.5rem 1.25rem;
	}
	.close-modal {
		font-size: 1.5rem;
		top: 0.5rem;
		right: 0.5rem;
	}
}

@media (max-width: 480px) {
	.modal-content {
		width: 95vw;
		max-width: 350px;
		padding: 0.75rem;
		margin: 0.25rem;
	}
	.modal-body {
		gap: 1rem;
	}
	.modal-book-image {
		width: 140px;
		height: 200px;
	}
	.modal-title {
		font-size: 1.1rem;
		margin-bottom: 0.25rem;
	}
	.modal-author {
		font-size: 0.75rem;
		margin-bottom: 0.75rem;
	}
	.modal-description {
		font-size: 0.75rem;
		margin-bottom: 1rem;
	}
	.trade-button {
		font-size: 0.75rem;
		padding: 0.4rem 1rem;
	}
	.close-modal {
		font-size: 1.25rem;
		top: 0.25rem;
		right: 0.25rem;
	}
}
</style>
