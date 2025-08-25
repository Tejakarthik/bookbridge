<script lang="ts">
    import { myBooks } from '$lib/Stores/myBooks.svelte';
    import BookModal from '$lib/Modals/BookModal.svelte';
    import type { Book } from '../+layout.svelte';

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

    function removeBook(bookId: string) {
        if (confirm('Are you sure you want to remove this book from your collection?')) {
            myBooks.update(books => books.filter(book => book.id !== bookId));
        }
    }
</script>

<div class="my-books-page">
    <div class="page-header">
        <h1 class="page-title">
            My Books
        </h1>
        <p class="page-subtitle">Your personal book collection available for trading</p>
    </div>

    {#if $myBooks.length === 0}
        <!-- Empty state -->
        <div class="empty-state">
            <div class="empty-icon">📖</div>
            <h2>No books in your collection yet</h2>
            <p>Start building your library by adding books you own and want to trade!</p>
            <button class="add-book-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Your First Book
            </button>
        </div>
    {:else}
        <!-- Books grid -->
        <div class="stats-bar">
            <div class="stat-item">
                <span class="stat-number">{$myBooks.length}</span>
                <span class="stat-label">Books</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">{new Set($myBooks.map(book => book.genre)).size}</span>
                <span class="stat-label">Genres</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">Available</span>
                <span class="stat-label">Status</span>
            </div>
        </div>

        <div class="my-books-grid">
            {#each $myBooks as book}
                <div class="book-card">
                    <!-- Action buttons -->
                    <div class="book-actions">
                        <button 
                            class="action-btn view-btn"
                            on:click={() => openModal(book)}
                            aria-label="View book details"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </button>
                        <button 
                            class="action-btn remove-btn"
                            on:click={() => removeBook(book.id)}
                            aria-label="Remove from collection"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Book cover and info -->
                    <div class="book-content">
                        <div class="book-cover">
                            <img 
                                src={book.image || book.cover || 'https://via.placeholder.com/120x180?text=No+Image'} 
                                alt={book.title}
                            />
                            <div class="availability-badge">Available</div>
                        </div>

                        <div class="book-info">
                            <h3 class="book-title">{book.title}</h3>
                            <p class="book-author">by {book.author}</p>
                            <div class="book-genre-tag">{book.genre}</div>
                            <p class="book-description">{book.description}</p>
                        </div>
                    </div>

                    <!-- Book footer -->
                    <div class="book-footer">
                        <div class="trade-status">
                            <span class="status-dot available"></span>
                            <span class="status-text">Ready to trade</span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Add new book button -->
        <div class="add-book-section">
            <button class="add-book-btn secondary">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Another Book
            </button>
        </div>
    {/if}
</div>

{#if showModal && selectedBook}
    <BookModal book={selectedBook} source="grid" onClose={closeModal} />
{/if}

<style>
    .my-books-page {
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

    /* Stats bar */
    .stats-bar {
        display: flex;
        justify-content: center;
        gap: 3rem;
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: #f8fafc;
        border-radius: 12px;
    }

    .stat-item {
        text-align: center;
    }

    .stat-number {
        display: block;
        font-size: 1.75rem;
        font-weight: 700;
        color: #1F3C88;
        margin-bottom: 0.25rem;
    }

    .stat-label {
        font-size: 0.875rem;
        color: #6b7280;
        font-weight: 500;
    }

    /* Books grid */
    .my-books-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .book-card {
        background: white;
        border-radius: 16px;
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

    .book-actions {
        position: absolute;
        top: 1rem;
        right: 1rem;
        display: flex;
        gap: 0.5rem;
        z-index: 10;
    }

    .action-btn {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 0.5rem;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .view-btn:hover {
        background: #f0f4ff;
        border-color: #1F3C88;
        color: #1F3C88;
    }

    .remove-btn:hover {
        background: #fef2f2;
        border-color: #ef4444;
        color: #ef4444;
    }

    .book-content {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .book-cover {
        position: relative;
        flex-shrink: 0;
    }

    .book-cover img {
        width: 100px;
        height: 150px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .availability-badge {
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        background: #10b981;
        color: white;
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-weight: 600;
    }

    .book-info {
        flex: 1;
        padding-right: 2rem;
    }

    .book-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.25rem;
        line-height: 1.4;
    }

    .book-author {
        font-size: 0.9rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
    }

    .book-genre-tag {
        display: inline-block;
        background: #e0e7ff;
        color: #1F3C88;
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-weight: 500;
        margin-bottom: 0.75rem;
    }

    .book-description {
        font-size: 0.85rem;
        color: #6b7280;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .book-footer {
        border-top: 1px solid #f1f5f9;
        padding-top: 1rem;
    }

    .trade-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .status-dot.available {
        background: #10b981;
    }

    .status-text {
        font-size: 0.875rem;
        color: #6b7280;
        font-weight: 500;
    }

    /* Add book section */
    .add-book-section {
        text-align: center;
        padding: 2rem;
    }

    .add-book-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: #1F3C88;
        color: white;
        border: none;
        border-radius: 12px;
        padding: 0.875rem 2rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }

    .add-book-btn:hover {
        background: #16306b;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(31, 60, 136, 0.3);
    }

    .add-book-btn.secondary {
        background: white;
        color: #1F3C88;
        border: 2px solid #1F3C88;
    }

    .add-book-btn.secondary:hover {
        background: #f0f4ff;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(31, 60, 136, 0.2);
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .my-books-page {
            padding: 1rem;
        }

        .page-title {
            font-size: 2rem;
        }

        .my-books-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
        }

        .stats-bar {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
        }

        .book-content {
            flex-direction: column;
            text-align: center;
        }

        .book-info {
            padding-right: 0;
        }
    }

    @media (max-width: 480px) {
        .my-books-grid {
            grid-template-columns: 1fr;
        }

        .book-actions {
            position: static;
            justify-content: center;
            margin-bottom: 1rem;
        }
    }
</style>
