<script context="module" lang="ts">
	export interface Book {
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
</script>

<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import BookModal from '$lib/Modals/BookModal.svelte';
	import {
		searchBooks,
		searchResultsStore,
		isSearchingStore
	} from '$lib/Stores/myBooksStore.svelte';

	let isExpanded = false;
	let mounted = false;
	let carouselTrack: HTMLElement;

	let searchQuery = '';
	let searchResults: Book[] = [];
	let showSearchResults = false;
	let searchTimeout: number;
	let showMobileMenu = false;

	$: searchResults = $searchResultsStore;
	$: isSearching = $isSearchingStore;

	onMount(() => {
		mounted = true;
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const toggleSidebar = () => {
		isExpanded = !isExpanded;
	};

	const handleSearchInput = () => {
		clearTimeout(searchTimeout);

		if (searchQuery.trim()) {
			showSearchResults = true;

			searchTimeout = window.setTimeout(() => {
				searchBooks(searchQuery);
			}, 300);
		} else {
			showSearchResults = false;
			searchResultsStore.set([]);
		}
	};

	const handleSearchKeypress = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (searchQuery.trim()) {
				searchBooks(searchQuery);
			}
		}
		if (event.key === 'Escape') {
			showSearchResults = false;
			searchQuery = '';
		}
	};

	const selectSearchResult = (book: Book) => {
		openModal(book, 'grid');
		showSearchResults = false;
		searchQuery = '';
	};

	const toggleMobileMenu = () => {
		showMobileMenu = !showMobileMenu;
	};

	const handleClickOutside = (event: Event) => {
		const target = event.target as HTMLElement;
		const searchContainer = document.querySelector('.search-container');
		const mobileMenu = document.querySelector('.mobile-menu');
		const hamburgerButton = document.querySelector('.hamburger-button');
		
		if (searchContainer && !searchContainer.contains(target)) {
			showSearchResults = false;
		}
		
		// Close mobile menu when clicking outside
		if (showMobileMenu && mobileMenu && !mobileMenu.contains(target) && !hamburgerButton?.contains(target)) {
			showMobileMenu = false;
		}
	};

	let currentIndex = 0;
	const scrollCarousel = (direction: 'left' | 'right') => {
		const cardWidth = 600 + 8; // card width + gap
		if (carouselTrack) {
			if (direction === 'left') {
				currentIndex = (currentIndex - 1 + books.length) % books.length;
			} else {
				currentIndex = (currentIndex + 1) % books.length;
			}
			carouselTrack.scrollTo({
				left: currentIndex * cardWidth,
				behavior: 'smooth'
			});
		}
	};

	let books: Book[] = [
		{
			id: '1',
			title: 'Tomorrow, and Tomorrow',
			author: 'Gabrielle Zevin',
			image:
				'https://ia600505.us.archive.org/view_archive.php?archive=/35/items/l_covers_0014/l_covers_0014_39.zip&file=0014393020-L.jpg',
			background: 'linear-gradient(135deg, #1F3C88, #F9E79F, #F1948A, #7DCEA0)',
			voters: '1,234,567 voters',
			stars: [1, 1, 1, 1, 0],
			description:
				'A moving story about friendship, creativity, and love, following two friends over decades as they collaborate on video games and navigate the complexities of life, ambition, and heartbreak.',
			cover: 'https://covers.openlibrary.org/b/id/12345678-L.jpg',
			genre: 'Fiction',
			uploadedBy: 'user123'
		},

		{
			id: '2',
			title: 'Dune',
			author: 'Frank Herbert',
			image:
				'https://ia800100.us.archive.org/view_archive.php?archive=/5/items/l_covers_0012/l_covers_0012_80.zip&file=0012802823-L.jpg',
			background: ' linear-gradient(135deg, #ff7e5f, #feb47b)',
			voters: '1,987,765 voters',
			stars: [1, 1, 1, 1, 0.5],
			description:
				'Set on the desert planet Arrakis, Dune is the story of Paul Atreides, who would become the mysterious man known as Muad’Dib. He seeks vengeance for the betrayal of his family and becomes embroiled in a complex struggle for control of the planet’s valuable spice, melange.',
			cover: 'https://covers.openlibrary.org/b/id/23456789-L.jpg',
			genre: 'Science Fiction',
			uploadedBy: 'user456'
		},
		{
			id: '3',
			title: 'The Priory of the Orange Tree',
			author: 'Samantha Shannon',
			image:
				'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1700221964i/40275288.jpg',
			background: 'linear-gradient(135deg, #FFF3E2, #F9C784)',
			voters: '1,987,765 voters',
			stars: [1, 1, 1, 1, 0.5],
			description:
				'A sweeping epic fantasy about a divided world on the brink of war, and a young queen whose reign is threatened by forces from both within and without. Dragons, magic, and strong female characters drive this tale of courage and destiny.',
			cover: 'https://covers.openlibrary.org/b/id/34567890-L.jpg',
			genre: 'Fantasy',
			uploadedBy: 'user789'
		},
		{
			id: '4',
			title: 'The Atlas Six',
			author: 'Olivia Blake',
			image:
				'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1714503138i/50520939.jpg',
			background: 'linear-gradient(135deg, #0f0f0f, #3a2c0f, #c7a008)',
			voters: '3,456,789 voters',
			stars: [1, 1, 1, 1, 0.5],
			description:
				'Six talented magicians are invited to join a secret society known as the Alexandrian Society. Only five will be chosen. As they compete, alliances and betrayals abound in this dark, twisty fantasy.',
			cover: 'https://covers.openlibrary.org/b/id/45678901-L.jpg',
			genre: 'Mystery',
			uploadedBy: 'user101'
		},
		{
			id: '5',
			title: 'The Midnight Library',
			author: 'Matt Haig',
			image:
				'https://ia800404.us.archive.org/view_archive.php?archive=/33/items/l_covers_0010/l_covers_0010_31.zip&file=0010313767-L.jpg',
			background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
			voters: '2,345,678 voters',
			stars: [1, 1, 1, 1, 1],
			description:
				'Between life and death there is a library. Nora Seed finds herself in the Midnight Library, where she is given the chance to undo her regrets and try out each of her possible lives. A poignant exploration of choices, regrets, and hope.',
			cover: 'https://covers.openlibrary.org/b/id/56789012-L.jpg',
			genre: 'Philosophy',
			uploadedBy: 'user202'
		}
	];

	let showModal = false;
	let selectedBook: Book | null = null;
	let modalSource: 'grid' | 'carousel' = 'grid';

	function openModal(book: Book, source: 'grid' | 'carousel' = 'grid') {
		selectedBook = book;
		showModal = true;
		modalSource = source;
	}
	function closeModal() {
		showModal = false;
		selectedBook = null;
		modalSource = 'grid';
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="app-layout">
	<!-- Top Navigation Bar -->
	<nav class="top-navigation">
		<div class="nav-content">
			<!-- Logo Row (always visible) -->
			<div class="nav-center">
				<h1 class="logo">
					<span class="logo-light">Book</span><span class="logo-bold">Bridge</span>
				</h1>
			</div>

			<!-- Main Navigation Row -->
			<div class="nav-main-row">
				<div class="nav-left">
					<!-- Hamburger Menu Button -->
					<button 
						class="hamburger-button"
						on:click={toggleMobileMenu}
						aria-label="Toggle menu"
					>
						<div class="hamburger-lines">
							<span class="line {showMobileMenu ? 'rotate1' : ''}"></span>
							<span class="line {showMobileMenu ? 'fade' : ''}"></span>
							<span class="line {showMobileMenu ? 'rotate2' : ''}"></span>
						</div>
					</button>

					<!-- Search Container (hidden on mobile, moved to center on mobile) -->
					<div class="search-container desktop-search">
						<svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
						<input  type="text" 
						placeholder="Search Book" 
						class="search-input"
						bind:value={searchQuery}
						on:input={handleSearchInput}
						on:keypress={handleSearchKeypress} />

						{#if showSearchResults && (searchResults.length > 0 || isSearching)}
						<div class="search-dropdown">
							{#if isSearching}
								<div class="search-loading">Searching...</div>
							{:else}
								{#each searchResults.slice(0, 5) as book}
									<button 
										class="search-result-item" 
										on:click={() => selectSearchResult(book)}
										type="button"
										aria-label="View {book.title} by {book.author}"
									>
										<img 
											src={book.cover || '/placeholder-book.jpg'} 
											alt={book.title} 
											class="search-book-cover" 
										/>
										<div class="search-book-info">
											<div class="search-book-title">{book.title}</div>
											<div class="search-book-author">by {book.author}</div>
										</div>
									</button>
								{/each}
								{#if searchResults.length > 5}
									<div class="search-see-all">
										{searchResults.length - 5} more results...
									</div>
								{/if}
							{/if}
						</div>
					{/if}
					</div>
				</div>

				<!-- Mobile Search (center position on mobile) -->
				<div class="mobile-search-container">
					<svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
					<input  type="text" 
					placeholder="Search Book" 
					class="search-input"
					bind:value={searchQuery}
					on:input={handleSearchInput}
					on:keypress={handleSearchKeypress} />

					{#if showSearchResults && (searchResults.length > 0 || isSearching)}
					<div class="search-dropdown">
						{#if isSearching}
							<div class="search-loading">Searching...</div>
						{:else}
							{#each searchResults.slice(0, 5) as book}
								<button 
									class="search-result-item" 
									on:click={() => selectSearchResult(book)}
									type="button"
									aria-label="View {book.title} by {book.author}"
								>
									<img 
										src={book.cover || '/placeholder-book.jpg'} 
										alt={book.title} 
										class="search-book-cover" 
									/>
									<div class="search-book-info">
										<div class="search-book-title">{book.title}</div>
										<div class="search-book-author">by {book.author}</div>
									</div>
								</button>
							{/each}
							{#if searchResults.length > 5}
								<div class="search-see-all">
									{searchResults.length - 5} more results...
								</div>
							{/if}
						{/if}
					</div>
				{/if}
				</div>

				<div class="nav-right">
					<div class="user-avatar">
						<div class="avatar-frame">
							<img
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
								alt="User Avatar"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<!-- Mobile Menu Overlay -->
	{#if showMobileMenu}
		<div class="mobile-menu-overlay" on:click={toggleMobileMenu} role="button" tabindex="0" on:keypress={(e) => e.key === 'Escape' && toggleMobileMenu()}>
			<div class="mobile-menu" on:click|stopPropagation role="navigation" aria-label="Mobile navigation menu">
				<div class="mobile-menu-header">
					<h2 class="mobile-menu-title">
						<span class="title-light">My</span><span class="title-dark"> Place</span>
					</h2>
					<button class="close-mobile-menu" on:click={toggleMobileMenu} aria-label="Close menu">
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</button>
				</div>
				
				<nav class="mobile-nav">
					<a href="/" class="mobile-nav-item" on:click={toggleMobileMenu}>
						<svg class="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
						</svg>
						<span class="mobile-nav-text">Marketplace</span>
					</a>

					<a href="/likedBooks" class="mobile-nav-item" on:click={toggleMobileMenu}>
						<svg class="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
						</svg>
						<span class="mobile-nav-text">Liked Books</span>
					</a>

					<a href="/my-books" class="mobile-nav-item" on:click={toggleMobileMenu}>
						<svg class="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
						</svg>
						<span class="mobile-nav-text">My Books</span>
					</a>
				</nav>
			</div>
		</div>
	{/if}

	<!-- Book Carousel Section (100% width) -->
	<section class="book-carousel-section">
		<div class="flex h-30 items-center justify-center text-4xl">
			<h1>New Releases</h1>
		</div>

		<div class="carousel-container">
			<button
				class="carousel-nav carousel-prev"
				aria-label="Previous books"
				on:click={() => scrollCarousel('left')}
			>
				<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
					></path>
				</svg>
			</button>

			<div class="carousel-track" bind:this={carouselTrack}>
				{#each books as book}
					<div class="book-card" style="background: white;">
						<div class="book-card-inner" style="background: {book.background};">
							<div class="book-image-wrapper">
								<img src={book.image} alt={book.title + ' Book Cover'} />
							</div>
							<div class="book-content">
								<h3 class="book-title">{book.title}</h3>
								<p class="book-author">by {book.author}</p>
								<div class="book-rating">
									{#if book.stars}
										<div class="stars">
											{#each book.stars as star}
												<span class="star {star === 1 ? 'filled' : star === 0.5 ? 'half' : ''}"
													>★</span
												>
											{/each}
										</div>
									{/if}
									{#if book.voters}
										<span class="voters">{book.voters}</span>
									{/if}
								</div>
								<p class="book-description">{book.description}</p>
								<button class="book-button" on:click={() => openModal(book, 'carousel')}
									>See The Book</button
								>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<button
				class="carousel-nav carousel-next"
				aria-label="Next books"
				on:click={() => scrollCarousel('right')}
			>
				<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
					></path>
				</svg>
			</button>
		</div>
	</section>

	<!-- Main Content with Sidebar (100% width) -->
	<div class="main-content">
		<!-- Left Sidebar -->
		<aside class="left-sidebar">
			<!-- Sidebar Header -->
			<div class="mb-5 flex h-30 items-center justify-center text-2xl font-medium">
				<h1>
					<span class="text-gray-400">My</span><span class="text-gray-800"> Place</span>
				</h1>
			</div>

			<!-- Navigation Menu -->
			<nav class="sidebar-nav">
				<a href="/" class="nav-item">
					<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
						></path>
					</svg>
					<span class="nav-text">Marketplace</span>
				</a>

				<a href="/likedBooks" class="nav-item">
					<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						></path>
					</svg>
					<span class="nav-text">Liked Books</span>
				</a>

				<a href="/my-books" class="nav-item">
					<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
						></path>
					</svg>
					<span class="nav-text">My Books</span>
				</a>
			</nav>
		</aside>

		<!-- Main Content Area -->
		<main class="main-content-area">
			<slot />
		</main>
	</div>

	{#if showModal && selectedBook}
		<BookModal book={selectedBook} source={modalSource} onClose={closeModal} />
	{/if}
</div>

<style>
	* {
		font-family: 'Montserrat', sans-serif;
	}

	.app-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: white;
	}

	/* Root Typography Scaling */
	html {
		font-size: 16px;
	}

	@media (max-width: 768px) {
		html {
			font-size: 15px;
		}
	}

	@media (max-width: 480px) {
		html {
			font-size: 14px;
		}
	}

	@media (min-width: 1920px) {
		html {
			font-size: 18px;
		}
	}

	/* Touch Device Optimizations */
	@media (hover: none) and (pointer: coarse) {
		.nav-item {
			padding: 1.25rem;
		}
		
		.search-input {
			padding: 0.75rem 0.75rem 0.75rem 2.5rem;
		}
		
		.search-result-item {
			padding: 1rem;
		}
		
		.book-button {
			padding: 0.75rem 1.5rem;
			font-size: 1rem;
		}
		
		.carousel-nav {
			width: 52px;
			height: 52px;
		}
		
		.genre-tabs button {
			padding: 0.75rem 1.25rem;
			font-size: 1rem;
		}
	}

	/* Top Navigation */
	.top-navigation {
		background: white;
		border-bottom: 1px solid #e5e7eb;
		padding: 1rem 2rem;
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.nav-content {
		display: flex;
		flex-direction: row;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
		position: relative;
	}

	.nav-main-row {
		display: flex;
		align-items: center;
		width: 100%;
		position: relative;
	}

	.nav-left {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.nav-center {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;
		justify-content: flex-end;
	}

	/* Desktop search - visible by default */
	.desktop-search {
		display: flex;
	}

	/* Mobile search - hidden by default */
	.mobile-search-container {
		display: none;
		position: relative;
		align-items: center;
	}

	/* /* .nav-left {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	} */

	.separator {
		width: 1px;
		height: 24px;
		background-color: #e5e7eb;
	}

	.search-container {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: 0.75rem;
		width: 1.25rem;
		height: 1.25rem;
		color: #6b7280;
	}

	.search-input {
		padding: 0.5rem 0.75rem 0.5rem 2.5rem;
		border: none;
		/* border-radius: 8px; */
		width: 200px;
		font-size: 0.875rem;
		background: white;
	}

	.search-input:focus {
		outline: none;
		border-radius: 8px;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.nav-center .logo {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0;
	}

	.logo-light {
		color: #9ca3af;
	}

	.logo-bold {
		color: #374151;
	}

	.user-avatar {
		position: relative;
	}

	.avatar-frame {
		position: relative;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: linear-gradient(135deg, #fbbf24, #f59e0b);
		padding: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar-frame img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
	}

	.avatar-icon {
		width: 24px;
		height: 24px;
		color: white;
	}

	.notification-dot {
		position: absolute;
		top: 0;
		right: 0;
		width: 12px;
		height: 12px;
		background-color: #ef4444;
		border-radius: 50%;
		border: 2px solid white;
	}

	.menu-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 8px;
		transition: background-color 0.2s;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.menu-button:hover {
		background-color: #f3f4f6;
	}

	.menu-icon {
		width: 1.5rem;
		height: 1.5rem;
		color: #374151;
	}

	.menu-text {
		font-size: 0.875rem;
		color: #374151;
		font-weight: 500;
	}

	.search-container {
    position: relative;
}

.search-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 400px;
    overflow-y: auto;
    margin-top: 4px;
}

.search-loading {
    padding: 16px;
    text-align: center;
    color: #6b7280;
    font-size: 0.875rem;
}

.search-result-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #f3f4f6;
    cursor: pointer;
    transition: background-color 0.2s;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
}

.search-result-item:hover {
    background-color: #f9fafb;
}

.search-result-item:last-child {
    border-bottom: none;
}

.search-book-cover {
    width: 40px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 12px;
    flex-shrink: 0;
}

.search-book-info {
    flex: 1;
    min-width: 0;
}

.search-book-title {
    font-weight: 600;
    color: #374151;
    font-size: 0.875rem;
    line-height: 1.25;
    margin-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.search-book-author {
    color: #6b7280;
    font-size: 0.75rem;
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

	.search-see-all {
		padding: 12px;
		text-align: center;
		color: #6b7280;
		font-size: 0.75rem;
		font-style: italic;
	}

	/* Hamburger Menu Button */
	.hamburger-button {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		margin-right: 1rem;
	}

	.hamburger-lines {
		width: 24px;
		height: 18px;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.line {
		width: 100%;
		height: 2px;
		background-color: #374151;
		transition: all 0.3s ease;
		transform-origin: center;
	}

	.line.rotate1 {
		transform: translateY(8px) rotate(45deg);
	}

	.line.fade {
		opacity: 0;
	}

	.line.rotate2 {
		transform: translateY(-8px) rotate(-45deg);
	}

	/* Mobile Menu Overlay */
	.mobile-menu-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.mobile-menu {
		background: white;
		width: 280px;
		height: 100vh;
		box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
		transform: translateX(0);
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.mobile-menu-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.mobile-menu-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
	}

	.title-light {
		color: #9ca3af;
	}

	.title-dark {
		color: #374151;
	}

	.close-mobile-menu {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 50%;
		transition: background-color 0.2s;
	}

	.close-mobile-menu:hover {
		background-color: #f3f4f6;
	}

	.close-mobile-menu svg {
		width: 20px;
		height: 20px;
		color: #6b7280;
	}

	.mobile-nav {
		padding: 1rem 0;
	}

	.mobile-nav-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.5rem;
		text-decoration: none;
		color: #6b7280;
		font-weight: 500;
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.mobile-nav-item:hover {
		background-color: #f3f4f6;
		color: #374151;
	}

	.mobile-nav-icon {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
	}

	.mobile-nav-text {
		font-size: 1rem;
	}

	/* Authentication styles */
	/* .user-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.user-name {
		font-size: 0.875rem;
		color: #374151;
		font-weight: 500;
	}

	.auth-buttons {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.auth-btn {
		padding: 0.5rem 1rem;
		border-radius: 8px;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		text-decoration: none;
		border: none;
	}

	.login-btn {
		background-color: transparent;
		color: #374151;
		border: 1px solid #d1d5db;
	}

	.login-btn:hover {
		background-color: #f9fafb;
		border-color: #9ca3af;
	}

	.register-btn {
		background-color: #3b82f6;
		color: white;
		border: 1px solid #3b82f6;
	}

	.register-btn:hover {
		background-color: #2563eb;
		border-color: #2563eb;
	} */

	/* Main Content Layout */
	.main-content {
		display: flex;
		flex: 1;
		overflow: visible;
		width: 100%;
		margin-top: 2rem;
	}

	/* Left Sidebar */
	.left-sidebar {
		width: 20%;
		min-width: 250px;
		max-width: 300px;
		background: white;
		padding: 2rem;
		overflow-y: auto;
		flex-shrink: 0;
	}

	.sidebar-nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		border-radius: 12px;
		text-decoration: none;
		color: #6b7280;
		font-weight: 500;
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.nav-item:hover {
		background-color: #f3f4f6;
		color: #374151;
		transform: translateX(4px);
	}

	/* .nav-item.active {
		background-color: #1F3C88;
		color: white;
	} */

	.nav-icon {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
	}

	.nav-text {
		font-size: 0.9rem;
	}

	/* Main Content Area */
	.main-content-area {
		flex: 1;
		width: 80%;
		padding: 0rem 2rem;
		overflow-y: auto;
		background: white;
	}

	/* Book Carousel Styles */
	.book-carousel-section {
		margin-bottom: 2rem;
		overflow: visible;
		padding: 0rem 0.25rem;
	}

	.book-carousel-section h1 {
		font-family: 'Playfair Display', serif;
		font-style: italic;
		font-weight: 700;
	}

	.carousel-container {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1rem;
		overflow: hidden;
		height: 400px;
	}

	.carousel-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: white;
		border: none;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		transition: all 0.2s ease;
	}

	.carousel-nav:hover {
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
		transform: translateY(-50%) scale(1.05);
	}

	.carousel-nav svg {
		width: 20px;
		height: 20px;
		color: #374151;
	}

	.carousel-prev {
		left: 9px;
	}

	.carousel-next {
		right: 9px;
	}

	.carousel-track {
		display: flex;
		gap: 0.1rem;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-behavior: smooth;
		padding: 1rem 0;
		scrollbar-width: none;
		-ms-overflow-style: none;
		height: 100%;
		align-items: center;
	}

	.carousel-track::-webkit-scrollbar {
		display: none;
	}

	.book-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		min-width: 700px;
		max-width: 600px;
		height: 420px;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		flex-shrink: 0;
		background: inherit;
	}

	.book-card-inner {
		width: 100%;
		height: 80%;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		position: relative;
		background: pink;
		padding: 1rem;
	}

	.book-image-wrapper {
		width: 45%;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		position: relative;
		z-index: 2;
	}

	.book-image-wrapper img {
		width: 250px;
		height: 350px;
		border-radius: 5px;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 30;
		z-index: 2;
		transform: translateY(30px);
	}

	.book-content {
		width: 55%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		min-width: 0;
		position: relative;
		z-index: 1;
		padding: 1.5rem;
	}

	.book-title {
		font-size: 2rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.2rem 0;
		line-height: 1.2;
	}

	.book-author {
		font-size: 0.8rem;
		color: #6b7280;
		margin: 0 0 0.5rem 0;
	}

	.book-rating {
		margin-bottom: 0.5rem;
	}

	.stars {
		font-size: 0.9rem;
		justify-content: center;
	}

	.star {
		color: #fff;
		font-size: 1rem;
	}

	.star.filled {
		color: #fff;
	}

	.star.half {
		color: #fff;
		opacity: 0.6;
	}

	.voters {
		font-size: 0.7rem;
	}

	.book-description {
		font-size: 0.8rem;
		color: #6b7280;
		line-height: 1.4;
		margin: 0 0 1rem 0;
		max-width: 90%;
		flex: 1;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.book-button {
		font-size: 0.85rem;
		padding: 0.6rem 1.5rem;
		background: white;
		color: #374151;
		border: none;
		border-radius: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		margin-top: 1rem;
	}

	.book-button:hover {
		background: #f9fafb;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	/* Carousel Responsive Design */
	@media (max-width: 1440px) {
		.book-card {
			min-width: 600px;
		}
		
		.book-image-wrapper img {
			width: 200px;
			height: 300px;
		}
		
		.book-title {
			font-size: 1.75rem;
		}
	}

	@media (max-width: 1024px) {
		.carousel-container {
			height: 350px;
		}
		
		.book-card {
			min-width: 500px;
			height: 320px;
		}
		
		.book-image-wrapper img {
			width: 180px;
			height: 270px;
		}
		
		.book-title {
			font-size: 1.5rem;
		}
		
		.book-content {
			padding: 1rem;
		}
	}

	@media (max-width: 768px) {
		.carousel-container {
			height: 280px;
		}
		
		.book-card {
			min-width: 400px;
			height: 260px;
		}
		
		.book-card-inner {
			flex-direction: row;
			padding: 0.75rem;
		}
		
		.book-image-wrapper {
			width: 35%;
		}
		
		.book-image-wrapper img {
			width: 120px;
			height: 180px;
			transform: translateY(20px);
		}
		
		.book-content {
			width: 65%;
			padding: 0.75rem;
		}
		
		.book-title {
			font-size: 1.2rem;
			margin-bottom: 0.25rem;
		}
		
		.book-author {
			font-size: 0.75rem;
		}
		
		.book-description {
			font-size: 0.75rem;
			-webkit-line-clamp: 2;
			line-clamp: 2;
		}
		
		.book-button {
			font-size: 0.75rem;
			padding: 0.5rem 1rem;
		}
	}

	@media (max-width: 640px) {
		/* .carousel-container {
			height: 240px;
		}
		
		.book-card {
			min-width: 320px;
			height: 220px;
		}
		
		.book-card-inner {
			flex-direction: column;
			text-align: center;
			padding: 0.5rem;
		}
		
		.book-image-wrapper {
			width: 100%;
			height: 60%;
			justify-content: center;
		}
		
		.book-image-wrapper img {
			width: 100px;
			height: 140px;
			position: relative;
			transform: none;
			left: auto;
		}
		
		.book-content {
			width: 100%;
			height: 40%;
			padding: 0.5rem;
			text-align: center;
		}
		
		.book-title {
			font-size: 1rem;
			margin-bottom: 0.2rem;
		}
		
		.book-author {
			font-size: 0.7rem;
			margin-bottom: 0.3rem;
		}
		
		.book-description {
			font-size: 0.7rem;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			margin-bottom: 0.5rem;
		}
		
		.book-button {
			font-size: 0.7rem;
			padding: 0.4rem 0.8rem;
			margin-top: 0.5rem;
		}
		
		.carousel-nav {
			width: 36px;
			height: 36px;
		}
		
		.carousel-nav svg {
			width: 16px;
			height: 16px;
		} */
		.carousel-container {
		height: 320px;
		padding: 1rem 0;
	}
	
	.carousel-track {
		gap: 1rem;
		padding: 0.5rem;
	}
	
	.book-card {
		min-width: 85vw;
		max-width: 320px;
		height: 130px;
		background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
		border-radius: 20px;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
		overflow: hidden;
	}
	
	.book-card-inner {
		display: flex;
		flex-direction: row;
		height: 100%;
		padding: 1rem;
		background: transparent;
		align-items: center;
	}
	
	.book-image-wrapper {
		width: 30%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.book-image-wrapper img {
		width: 70px;
		height: 100px;
		border-radius: 10px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
		position: static;
		transform: none;
		left: auto;
	}
	
	.book-content {
		width: 70%;
		height: 100%;
		padding-left: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
	}
	
	.book-title {
		font-size: 1rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.25rem;
		line-height: 1.2;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.book-author {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 0.75rem;
	}
	
	.book-description {
		display: none; /* Hide on mobile for cleaner look */
	}
	
	.book-button {
		font-size: 0.75rem;
		padding: 0.4rem 1rem;
		background: rgba(255, 255, 255, 0.95);
		color: #4f46e5;
		border-radius: 20px;
		font-weight: 600;
		align-self: flex-start;
		border: none;
		cursor: pointer;
	}
	
	.book-button:hover {
		background: white;
		transform: scale(1.05);
	}
	
	/* Navigation arrows - smaller on mobile */
	.carousel-nav {
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
	}
	
	.carousel-nav svg {
		width: 18px;
		height: 18px;
	}
	}

	@media (max-width: 480px) {
		/* .carousel-container {
			height: 200px;
		}
		
		.book-card {
			min-width: 280px;
			height: 180px;
		}
		
		.book-image-wrapper img {
			width: 80px;
			height: 120px;
		}
		
		.book-title {
			font-size: 0.9rem;
		}
		
		.book-author {
			font-size: 0.65rem;
		}
		
		.book-description {
			font-size: 0.65rem;
			-webkit-line-clamp: 1;
			line-clamp: 1;
		}
		
		.book-button {
			font-size: 0.65rem;
			padding: 0.3rem 0.6rem;
		}
		
		.carousel-nav {
			width: 32px;
			height: 32px;
		}
		
		.carousel-nav svg {
			width: 14px;
			height: 14px;
		} */
		.main-content {
		
		margin-top: 0rem;
	}
		.carousel-container {
		height: 280px;
	}
	
	.book-card {
		min-width: 90vw;
		max-width: 280px;
		height: 219px;
	}
	
	.book-card-inner {
		padding: 0.75rem;
	}
	
	.book-image-wrapper  {
		width: 60%;
		height: 180px;
	}
	.book-image-wrapper img{
		width: 110px;
        height: 180px;
	}
	
	.book-title {
		font-size: 0.9rem;
	}
	
	.book-author {
		font-size: 0.7rem;
	}
	
	.book-button {
		font-size: 0.7rem;
		padding: 0.3rem 0.8rem;
	}
	
	/* Hide navigation arrows on very small screens */
	.carousel-nav {
		display: none;
	}
	
	/* Add swipe hint */
	.carousel-container::after {
		content: "← Swipe →";
		position: absolute;
		bottom: -25px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.7rem;
		color: #9ca3af;
		font-style: italic;
	}
	}

	/* Search Responsive Design */
	@media (max-width: 1440px) {
		.search-input {
			width: 180px;
		}
	}

	@media (max-width: 1024px) {
		.search-input {
			width: 160px;
		}
		
		.search-dropdown {
			left: -20px;
			right: -20px;
		}
	}

	@media (max-width: 768px) {
		.nav-content {
			padding: 0.75rem 1rem;
		}

		.search-input {
			width: 140px;
			font-size: 0.8rem;
			padding: 0.4rem 0.5rem 0.4rem 2rem;
		}
		
		.search-icon {
			width: 1rem;
			height: 1rem;
			left: 0.5rem;
		}
		
		.search-dropdown {
			left: -60px;
			right: -60px;
			max-width: 320px;
		}
		
		.search-book-cover {
			width: 32px;
			height: 48px;
		}
		
		.search-book-title {
			font-size: 0.8rem;
		}
		
		.search-book-author {
			font-size: 0.7rem;
		}
		
		.search-loading {
			padding: 12px;
			font-size: 0.8rem;
		}
	}

	@media (max-width: 640px) {
		.search-input {
			width: 120px;
			font-size: 0.75rem;
		}
		
		.search-dropdown {
			left: -80px;
			right: -80px;
			max-width: 280px;
		}
	}

	@media (max-width: 480px) {
		.nav-content {
			padding: 0.5rem;
		}

		.search-input {
			width: 100px;
			font-size: 0.7rem;
			padding: 0.3rem 0.4rem 0.3rem 1.8rem;
		}
		
		.search-icon {
			width: 0.9rem;
			height: 0.9rem;
			left: 0.4rem;
		}
		
		.search-dropdown {
			left: -90px;
			right: -90px;
			max-width: 260px;
		}
		
		.search-result-item {
			padding: 8px;
		}
		
		.search-book-cover {
			width: 28px;
			height: 42px;
			margin-right: 8px;
		}
		
		.search-book-title {
			font-size: 0.75rem;
		}
		
		.search-book-author {
			font-size: 0.65rem;
		}

		/* Mobile menu full width on very small screens */
		.mobile-menu {
			width: 100vw;
		}
		
		.mobile-menu-header {
			padding: 1rem;
		}
		
		.mobile-nav-item {
			padding: 0.75rem 1rem;
		}
	}

	/* Main Layout Responsive Design */
	@media (max-width: 1024px) {
		.left-sidebar {
			width: 25%;
			min-width: 220px;
			padding: 1.5rem;
		}

		.main-content-area {
			width: 75%;
		}
	}

	@media (max-width: 768px) {
		.nav-content {
			flex-direction: column;
			gap: 0.75rem;
			padding: 0.75rem 1rem;
		}

		.nav-left {
			justify-content: flex-start;
			order: 2;
			flex: 1;
		}

		.nav-center {
			position: relative;
			left: auto;
			transform: none;
			order: 1;
		}

		.nav-right {
			order: 2;
			justify-content: flex-end;
			flex: 1;
		}

		/* Create a new row for hamburger, search, and profile */
		.mobile-nav-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			order: 2;
		}

		.left-sidebar {
			width: 30%;
			min-width: 200px;
			padding: 1rem;
		}

		.main-content-area {
			width: 70%;
			padding: 1rem;
		}

		.user-avatar {
			transform: scale(0.9);
		}
	}

	@media (max-width: 640px) {
		.nav-content {
			flex-direction: column;
			gap: 1rem;
			padding: 1rem;
		}

		/* Logo row - centered at top */
		.nav-center {
			position: relative;
			left: auto;
			transform: none;
			width: 100%;
			display: flex;
			justify-content: center;
			order: 1;
		}

		.nav-center .logo {
			font-size: 1.25rem;
		}

		/* Main navigation row - hamburger left, search center, profile right */
		.nav-main-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			order: 2;
		}

		.nav-left {
			flex: none;
			justify-content: flex-start;
		}

		.nav-right {
			flex: none;
			justify-content: flex-end;
		}

		/* Hide desktop search on mobile */
		.desktop-search {
			display: none;
		}

		/* Show mobile search in center */
		.mobile-search-container {
			display: flex;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}

		.user-avatar {
			transform: scale(0.8);
		}

		.left-sidebar {
			display: none;
		}

		.main-content-area {
			width: 100%;
			padding: 1rem;
		}

		/* Show hamburger button only on mobile */
		.hamburger-button {
			display: block;
			margin-right: 0;
		}
	}

	/* Large Screen Optimizations */
	@media (min-width: 1920px) {
		.nav-content {
			max-width: 1600px;
		}

		.search-input {
			width: 250px;
			font-size: 1rem;
		}

		.nav-center .logo {
			font-size: 1.75rem;
		}

		.left-sidebar {
			width: 18%;
			padding: 2.5rem;
		}

		.main-content-area {
			width: 82%;
		}

		.carousel-container {
			height: 450px;
		}

		.book-card {
			min-width: 750px;
		}

		.book-title {
			font-size: 2.25rem;
		}
	}
</style>
