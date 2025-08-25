<script lang="ts">
    import { myBooks } from '$lib/Stores/myBooks.svelte';
    import type { Book } from '../../routes/+layout.svelte';
    
    export let onClose: () => void;
    export let bookToTrade: Book;
    
    let selectedMyBook: any = null;
    
    function sendTradeRequest() {
        if (!selectedMyBook) return;
        
        // Show success notification (you can enhance this later)
        alert(`🎉 Trade request sent!\n\nYou offered: "${selectedMyBook.title}"\nFor: "${bookToTrade.title}"\n\nThe book owner will be notified of your request.`);
        onClose();
    }
    
    function selectBook(book: any) {
        selectedMyBook = book;
    }
</script>

<div class="trade-overlay" on:click={onClose} role="dialog" aria-modal="true">
    <div class="trade-content" on:click|stopPropagation>
        <!-- Header -->
        <div class="trade-header">
            <h2 class="trade-title">Choose Your Book to Trade</h2>
            <button class="close-btn" on:click={onClose} aria-label="Close">×</button>
        </div>
        
        <!-- Trade Info -->
        <div class="trade-info">
            <p class="trade-subtitle">
                Select one of your books to trade for 
                <strong class="book-name">"{bookToTrade.title}"</strong>
            </p>
        </div>
        
        <!-- My Books Grid -->
        <div class="my-books-section">
            <h3 class="section-title">Your Books</h3>
            <div class="my-books-grid">
                {#each $myBooks as book}
                    <div 
                        class="book-option {selectedMyBook?.id === book.id ? 'selected' : ''}"
                        on:click={() => selectBook(book)}
                        on:keydown={(e) => e.key === 'Enter' && selectBook(book)}
                        role="button"
                        tabindex="0"
                    >
                        <!-- Selection indicator -->
                        {#if selectedMyBook?.id === book.id}
                            <div class="selected-indicator">✓</div>
                        {/if}
                        
                        <!-- Book cover -->
                        <div class="book-cover">
                            <img src={book.image} alt={book.title} />
                        </div>
                        
                        <!-- Book info -->
                        <div class="book-info">
                            <h4 class="book-title">{book.title}</h4>
                            <p class="book-author">by {book.author}</p>
                            <p class="book-genre">{book.genre}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="trade-actions">
            <button class="cancel-btn" on:click={onClose}>Cancel</button>
            <button 
                class="send-request-btn" 
                on:click={sendTradeRequest}
                disabled={!selectedMyBook}
            >
                {#if selectedMyBook}
                    Send Trade Request
                {:else}
                    Select a Book First
                {/if}
            </button>
        </div>
    </div>
</div>

<style>
    .trade-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(2px);
    }
    
    .trade-content {
        background: #fff;
        border-radius: 20px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        width: 900px;
        max-width: 95vw;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: modalSlideIn 0.3s ease;
    }
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    .trade-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 2rem 1rem 2rem;
        border-bottom: 1px solid #f1f5f9;
    }
    
    .trade-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: #1e293b;
        margin: 0;
    }
    
    .close-btn {
        background: none;
        border: none;
        font-size: 2rem;
        color: #64748b;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: all 0.2s;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .close-btn:hover {
        background: #f1f5f9;
        color: #1e293b;
    }
    
    .trade-info {
        padding: 1rem 2rem;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .trade-subtitle {
        color: #475569;
        margin: 0;
        text-align: center;
        font-size: 1rem;
        line-height: 1.5;
    }
    
    .book-name {
        color: #1F3C88;
        font-weight: 600;
    }
    
    .my-books-section {
        padding: 2rem;
    }
    
    .section-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 1.5rem 0;
    }
    
    .my-books-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }
    
    .book-option {
        border: 2px solid #e2e8f0;
        border-radius: 16px;
        padding: 1.25rem;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        text-align: center;
        background: #fff;
    }
    
    .book-option:hover {
        border-color: #1F3C88;
        transform: translateY(-4px);
        box-shadow: 0 10px 25px rgba(31, 60, 136, 0.1);
    }
    
    .book-option.selected {
        border-color: #1F3C88;
        background: linear-gradient(135deg, #f0f4ff, #e0e7ff);
        transform: translateY(-4px);
        box-shadow: 0 10px 25px rgba(31, 60, 136, 0.15);
    }
    
    .selected-indicator {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        background: #1F3C88;
        color: white;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.875rem;
        font-weight: 700;
        box-shadow: 0 2px 8px rgba(31, 60, 136, 0.3);
    }
    
    .book-cover {
        margin-bottom: 1rem;
    }
    
    .book-cover img {
        width: 90px;
        height: 130px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .book-info h4 {
        font-size: 0.9rem;
        font-weight: 600;
        margin: 0 0 0.25rem 0;
        color: #1e293b;
        line-height: 1.3;
    }
    
    .book-info p {
        margin: 0;
        font-size: 0.8rem;
        color: #64748b;
        line-height: 1.4;
    }
    
    .book-genre {
        font-size: 0.75rem !important;
        color: #1F3C88 !important;
        font-weight: 500 !important;
        margin-top: 0.25rem !important;
    }
    
    .trade-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        padding: 1.5rem 2rem 2rem 2rem;
        border-top: 1px solid #f1f5f9;
        background: #fafbfc;
    }
    
    .cancel-btn, .send-request-btn {
        padding: 0.875rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
    }
    
    .cancel-btn {
        background: #f8fafc;
        color: #64748b;
        border: 1px solid #e2e8f0;
    }
    
    .cancel-btn:hover {
        background: #f1f5f9;
        color: #475569;
    }
    
    .send-request-btn {
        background: #1F3C88;
        color: #fff;
        min-width: 180px;
    }
    
    .send-request-btn:hover:not(:disabled) {
        background: #16306b;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(31, 60, 136, 0.3);
    }
    
    .send-request-btn:disabled {
        background: #94a3b8;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .trade-content {
            width: 95vw;
            margin: 1rem;
        }
        
        .trade-header, .my-books-section {
            padding: 1.5rem;
        }
        
        .my-books-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 1rem;
        }
        
        .trade-actions {
            flex-direction: column;
            padding: 1.5rem;
        }
    }
</style>