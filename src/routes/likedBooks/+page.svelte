<script lang="ts">
    import { likedbooksStore, toggleLike } from '$lib/Stores/likedBooks.svelte';
    import BookModal from '$lib/Modals/BookModal.svelte';

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

    let showModal = false;
    let selectedBook: Book | null = null;

    function openModal(book: Book) {
        selectedBook = book;
        showModal = true;
    }

    function closeModal() {
        showModal = false;
        selectedBook = null;
    }
</script>

<div class="liked-books-page">
    <div class="page-header">
        <h1 class="page-title">
             Liked Books
        </h1>
        <p class="page-subtitle">Your favorite books collection</p>
    </div>

    {#if $likedbooksStore.length === 0}
        <!-- Empty state -->
        <div class="empty-state">
           
            <h2>No liked books yet</h2>
            <p>Start exploring books and click the heart icon to add them to your favorites!</p>
            <a href="/" class="browse-btn">Browse Books</a>
        </div>
    {:else}
        <!-- Books grid -->
        <div class="liked-books-grid">
            {#each $likedbooksStore as book}
                <div class="book-card">
                    <!-- Heart button -->
                    <button
                        class="heart-btn"
                        on:click={() => toggleLike(book)}
                        aria-label="Remove from favorites"
                    >
                        <svg
                            class="h-6 w-6 text-red-500 fill-red-500 hover:scale-110 transition-transform"
                            fill="currentColor"
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

                    <!-- Book cover -->
                    <div class="book-cover">
                        <img 
                            src={book.cover ?? book.image ?? 'https://via.placeholder.com/200x300?text=No+Image'} 
                            alt={book.title}
                        />
                    </div>

                    <!-- Book info -->
                    <div class="book-info">
                        <h3 class="book-title">{book.title}</h3>
                        <p class="book-author">by {book.author}</p>
                        <p class="book-description">{book.description}</p>
                        
                        <div class="book-actions">
                            <button 
                                class="view-btn"
                                on:click={() => openModal(book)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Books count -->
        <div class="books-count">
            {$likedbooksStore.length} book{$likedbooksStore.length === 1 ? '' : 's'} in your favorites
        </div>
    {/if}
</div>

{#if showModal && selectedBook}
    <BookModal book={selectedBook} source="grid" onClose={closeModal} />
{/if}

<style>
    .liked-books-page {
        padding: 2rem;
        max-width: 1400px;
        margin: 0 auto;
        min-height: 80vh;
    }

    .page-header {
        text-align: center;
        margin-bottom: 3rem;
    }

    .page-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.5rem;
    }

    .page-subtitle {
        font-size: 1.1rem;
        color: #6b7280;
    }

    /* Empty state */
    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        color: #6b7280;
    }

    .empty-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }

    .empty-state h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #374151;
    }

    .empty-state p {
        margin-bottom: 2rem;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
    }

    .browse-btn {
        display: inline-block;
        background: #1F3C88;
        color: white;
        padding: 0.75rem 2rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        transition: background 0.2s;
    }

    .browse-btn:hover {
        background: #16306b;
    }

    /* Books grid */
    .liked-books-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .book-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        position: relative;
        border: 1px solid #e5e7eb;
    }

    .book-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
    }

    .heart-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 10;
        padding: 0.5rem;
        border-radius: 50%;
        transition: background 0.2s;
    }

    .heart-btn:hover {
        background: rgba(239, 68, 68, 0.1);
    }

    .book-cover {
        text-align: center;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .book-cover img {
        width: 120px;
        height: 180px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .book-info {
        text-align: center;
    }

    .book-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.5rem;
        line-height: 1.4;
    }

    .book-author {
        font-size: 0.9rem;
        color: #6b7280;
        margin-bottom: 1rem;
    }

    .book-description {
        font-size: 0.85rem;
        color: #6b7280;
        line-height: 1.5;
        margin-bottom: 1.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .book-actions {
        display: flex;
        justify-content: center;
    }

    .view-btn {
        background: #1F3C88;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.5rem 1.5rem;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }

    .view-btn:hover {
        background: #16306b;
        transform: translateY(-1px);
    }

    .books-count {
        text-align: center;
        color: #6b7280;
        font-size: 0.9rem;
        padding: 1rem;
        background: #f9fafb;
        border-radius: 8px;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .liked-books-page {
            padding: 1rem;
        }

        .page-title {
            font-size: 2rem;
        }

        .liked-books-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
        }

        .book-card {
            padding: 1rem;
        }
    }

    @media (max-width: 480px) {
        .liked-books-grid {
            grid-template-columns: 1fr;
        }
    }
</style>