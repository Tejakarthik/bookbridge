<script lang="ts">
	import { allBooksStore } from '$lib/Stores/myBooksStore.svelte';
	import { filteredBooksStore, fetchBooks } from '$lib/Stores/myBooksStore.svelte';
	import { onMount, onDestroy } from 'svelte';
	import BookModal from '$lib/Modals/BookModal.svelte';
	import { likedbooksStore, toggleLike } from '$lib/Stores/likedBooks.svelte';

	interface Book {
		id: string;
		title: string;
		author: string;
		description: string;
		cover?: string;
		genre: string;
		uploadedBy: string;
		image: string;
		background: string;
		voters?: string;
		stars?: number[];
	}
	let genres = ['All Genres', 'Business', 'Science', 'Fiction', 'Philosophy', 'Biography'];
	let activeGenre = 'All genres';
	let gridBooks: Book[] = [];

	let showModal = false;
	let selectedBook: Book | null = null;
	let modalSource: 'carousel' | 'grid' = 'grid';

	function openModal(book: Book, source: 'carousel' | 'grid' = 'grid') {
		selectedBook = book;
		showModal = true;
		modalSource = source;
	}
	function closeModal() {
		showModal = false;
		selectedBook = null;
		modalSource = 'grid';
	}

	onMount(() => {
		gridBooks = $allBooksStore;
	});
	$: console.log('filteredBooksStore data', $filteredBooksStore);

	function handleGenreClick(genre: string) {
		activeGenre = genre;
		if (activeGenre === 'All Genres') {
			gridBooks = $allBooksStore;
		} else {
			fetchBooks(activeGenre).then(() => {
				gridBooks = $filteredBooksStore;
			});
		}
	}
</script>

<div class="main-page">
	<section class="popular-genre">
		<div class="page-header">
			<h1 class="page-title">
				<span class="title-light">Market</span><span class="title-dark"> Place</span>
			</h1>
		</div>

		<div class="genre-tabs">
			<div class="genre-tabs-title"><h2 class="section-title">Popular by Genre</h2></div>
			<div class="genre-buttons">
				{#each genres as genre}
					<button
						class="genre-button {genre === activeGenre ? 'active' : ''}"
						on:click={() => handleGenreClick(genre)}
					>
						{genre}
					</button>
				{/each}
			</div>
		</div>

		<div class="books-grid">
			{#each gridBooks as book}
				<div class="book-card">
					<!-- Main content container -->
					<div class="book-content-container">
						<!-- Heart button -->
						<button
							class="heart-button"
							aria-label="Add to favorites"
							on:click={() => toggleLike(book)}
						>
							<svg
								class="heart-icon {$likedbooksStore.find((b) => b.id === book.id) ? 'liked' : ''}"
								fill={$likedbooksStore.find((b) => b.id === book.id) ? 'currentColor' : 'none'}
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 000-6.364 4.5 4.5 0 00-6.364 0L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								></path>
							</svg>
						</button>

						<!-- Book cover container -->
						<div class="book-cover-container">
							<img
								src={book.cover || 'https://via.placeholder.com/192x288?text=No+Image'}
								alt={book.title + ' Cover'}
								class="book-cover-image"
							/>
						</div>

						<!-- Book details container -->
						<div class="book-details-container">
							<h3 class="book-title">{book.title}</h3>
							<p class="book-author">by {book.author}</p>
							<p class="book-description">{book.description}</p>
							<button class="book-action-button" on:click={() => openModal(book, 'grid')}>
								See The Book
							</button>
						</div>
					</div>

					<!-- Footer -->
					<div class="book-footer">
						<div class="upload-info">
							<span class="upload-label">Uploaded by</span>
							<span class="upload-user">{book.uploadedBy}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	{#if showModal && selectedBook}
		<BookModal book={selectedBook} source={modalSource} onClose={closeModal} />
	{/if}
</div>

<style>
	/* Main Page Layout */
	.main-page {
		padding: 0rem 2rem;
		max-width: 1400px;
		margin: 0 auto;
	}

	/* Page Header */
	.page-header {
		display: flex;
		height: 7.5rem;
		margin-bottom: 1.25rem;
		font-weight: bold;
		font-size: 2.25rem;
		align-items: center;
		justify-content: center;
	}

	.page-title {
		margin: 0;
		font-size: inherit;
		font-weight: inherit;
	}

	.title-light {
		color: #9ca3af;
	}

	.title-dark {
		color: #1f2937;
	}

	/* Section Title */
	.section-title {
		font-size: 1.2rem;
		font-weight: 400;
		color: #1f2937;
		margin-bottom: 0rem;
		text-align: center;
	}

	/* Genre Tabs */
	.genre-tabs-title{
		display: flex;
    align-items: center;

	}
	.genre-tabs {
		display: flex;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.genre-buttons {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.genre-button {
		padding: 1.2rem;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s ease-in-out;
		/* border: 1px solid #d1d5db; */
		border-radius: 4px;
		background-color: white;
		color: #374151;
	}

	.genre-button:hover {
		background-color: #f3f4f6;
		border-color: #9ca3af;
	}

	.genre-button.active {
		background-color: #007bff;
		color: white;
		border-color: #007bff;
		font-weight: bold;
	}

	/* Books Grid */
	.books-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		padding: 1rem;
		margin-top: 1rem;
	}

	/* Book Card */
	.book-card {
		position: relative;
		margin-top: 1rem;
		display: flex;
		height: 24rem;
		width: 100%;
		max-width: 585px;
		min-width: 585px;
		flex-shrink: 0;
		flex-direction: column;
		overflow: visible;
		border-radius: 0.5rem;
		background-color: white;
		transition: all 0.3s ease-in-out;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.book-card:hover {
		transform: translateY(-0.25rem);
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	}

	/* Book Content Container */
	.book-content-container {
		position: relative;
		display: flex;
		height: 80%;
		width: 100%;
		overflow: hidden;
	}

	/* Heart Button */
	.heart-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		z-index: 30;
		padding: 0.5rem;
		transition: all 0.2s;
		background: none;
		border: none;
		cursor: pointer;
		border-radius: 50%;
	}

	.heart-button:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.heart-icon {
		height: 1.5rem;
		width: 1.5rem;
		color: #9ca3af;
		transition: all 0.2s;
	}

	.heart-icon.liked {
		color: #ef4444;
		fill: #ef4444;
	}

	.heart-button:hover .heart-icon {
		transform: scale(1.1);
		color: #ef4444;
	}

	/* Book Cover Container */
	.book-cover-container {
		position: relative;
		display: flex;
		width: 40%;
		min-width: 192px;
		align-items: flex-end;
		justify-content: flex-start;
		padding-top: 1rem;
		padding-left: 1rem;
	}

	.book-cover-image {
		position: absolute;
		bottom: 0;
		left: 1rem;
		z-index: 20;
		border-radius: 0.5rem;
		object-fit: cover;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		transition: all 0.3s;
		width: 192px;
		height: 288px;
	}

	.book-card:hover .book-cover-image {
		transform: translateY(-1rem);
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	/* Book Details Container */
	.book-details-container {
		position: relative;
		z-index: 10;
		display: flex;
		width: 60%;
		flex-direction: column;
		justify-content: center;
		padding: 1.5rem;
		padding-right: 3rem;
	}

	.book-title {
		margin-bottom: 0.25rem;
		font-size: 1.25rem;
		line-height: 1.25;
		font-weight: bold;
		color: #1f2937;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.book-author {
		margin-bottom: 0.75rem;
		font-size: 0.875rem;
		color: #6b7280;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.book-description {
		margin-bottom: 1.5rem;
		flex: 1;
		font-size: 0.875rem;
		line-height: 1.625;
		color: #6b7280;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.book-action-button {
		cursor: pointer;
		align-self: flex-start;
		border-radius: 0.75rem;
		border: none;
		background-color: white;
		padding: 0.75rem 1.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #1f2937;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		transition: all 0.2s;
	}

	.book-action-button:hover {
		transform: translateY(-0.125rem);
		background-color: #f9fafb;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	}

	/* Book Footer */
	.book-footer {
		display: flex;
		height: 20%;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid #f3f4f6;
		padding: 0 1rem;
	}

	.upload-info {
		font-size: 0.875rem;
		color: #6b7280;
	}

	.upload-label {
		color: #9ca3af;
	}

	.upload-user {
		font-weight: 500;
		color: #4b5563;
	}

	/* Large Screen Optimizations */
	@media (min-width: 1920px) {
		.main-page {
			max-width: 1600px;
		}

		.books-grid {
			grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
			gap: 4rem;
			padding: 2rem;
		}

		.section-title {
			font-size: 1.5rem;
		}

		.genre-button {
			font-size: 1rem;
			padding: 0.75rem 1.5rem;
		}

		.book-card {
			max-width: none;
			min-width: 600px;
		}

		.book-cover-image {
			width: 220px;
			height: 330px;
		}

		.book-cover-container {
			min-width: 220px;
		}

		.book-title {
			font-size: 1.5rem;
		}

		.book-author,
		.book-description {
			font-size: 1rem;
		}

		.book-action-button {
			font-size: 1rem;
			padding: 1rem 2rem;
		}
	}

	@media (max-width: 1440px) {
		.books-grid {
			grid-template-columns: repeat(auto-fit, minmax( 1fr, 1fr));
			gap: 3rem;
		}

		.book-card {
			min-width: 510px;
		}

		.book-cover-image {
			width: 170px;
			height: 255px;
		}

		.book-cover-container {
			min-width: 170px;
		}
	}

	@media (max-width: 1024px) {
		.books-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding: 1rem;
		}

		.genre-button {
			font-size: 0.85rem;
			padding: 0.4rem 1rem;
		}

		.section-title {
			font-size: 1.1rem;
		}

		.book-card {
			max-width: none;
			min-width: 0;
		}

		.book-cover-image {
			width: 140px;
			height: 210px;
		}

		.book-cover-container {
			min-width: 140px;
		}

		.book-title {
			font-size: 1.1rem;
		}

		.book-author,
		.book-description {
			font-size: 0.8rem;
		}

		.book-action-button {
			font-size: 0.8rem;
			padding: 0.6rem 1.2rem;
		}
	}

	@media (max-width: 768px) {
		.main-page {
			padding: 1rem;
		}

		.section-title {
			font-size: 1rem;
		}

		.books-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
			padding: 0.5rem;
		}

		.genre-tabs {
			flex-direction: column;
			align-items: center;
		}

		.genre-buttons {
			justify-content: center;
		}

		.genre-button {
			font-size: 0.8rem;
			padding: 0.4rem 0.8rem;
			margin: 0.2rem;
		}

		.book-card {
			height: auto;
			min-height: 20rem;
		}

		.book-cover-image {
			width: 120px;
			height: 180px;
		}

		.book-cover-container {
			min-width: 120px;
			width: 35%;
		}

		.book-details-container {
			width: 65%;
			padding: 1rem;
		}

		.book-title {
			font-size: 1rem;
		}

		.book-author,
		.book-description {
			font-size: 0.75rem;
		}

		.book-action-button {
			font-size: 0.75rem;
			padding: 0.5rem 1rem;
		}
	}

	@media (max-width: 640px) {
		.books-grid {
			gap: 1rem;
		}

		.genre-button {
			font-size: 0.75rem;
			padding: 0.3rem 0.6rem;
		}

		.book-card {
			min-height: 18rem;
		}

		.book-cover-image {
			width: 100px;
			height: 150px;
		}

		.book-cover-container {
			min-width: 100px;
			width: 30%;
		}

		.book-details-container {
			width: 70%;
			padding: 0.75rem;
		}

		.book-title {
			font-size: 0.9rem;
		}

		.book-author,
		.book-description {
			font-size: 0.7rem;
		}

		.book-action-button {
			font-size: 0.7rem;
			padding: 0.4rem 0.8rem;
		}
	}

	@media (max-width: 480px) {
		.main-page {
			padding: 0.5rem;
		}

		.section-title {
			font-size: 0.9rem;
		}

		.books-grid {
			grid-template-columns: 1fr;
			gap: 0.75rem;
			padding: 0.25rem;
		}

		.genre-button {
			font-size: 0.7rem;
			padding: 0.25rem 0.5rem;
		}

		.page-header {
			font-size: 1.875rem;
		}

		.book-card {
			min-height: 13rem;
		}

		.book-cover-image {
			width: 80px;
			height: 120px;
		}

		.book-cover-container {
			min-width: 100px;
			width: 30%;
			height: 130px;
		}

		.book-details-container {
			width: 70%;
			padding: 0.5rem;
		}

		.book-title {
			font-size: 0.8rem;
		}

		.book-author,
		.book-description {
			font-size: 0.65rem;
		}

		.book-action-button {
			font-size: 0.65rem;
			padding: 0.3rem 0.6rem;
		}

		.upload-info {
			font-size: 0.75rem;
		}
		.heart-button {
			top: 0.3rem;
			right: 0.5rem;
			padding:0px;
		}
	}
</style>
