import { writable } from "svelte/store";

export const myBooks= writable([
    {
         id: 'my1',
        title: 'Atomic Habits',
        author: 'James Clear',
        description: 'An easy & proven way to build good habits & break bad ones',
        image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg',
        background: '#3b82f6',
        genre: 'Self-Help',
        uploadedBy: 'me',
        cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg'
    },
    {
        id: 'my2',
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        description: 'Timeless lessons on wealth, greed, and happiness',
        image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg',
        background: '#10b981',
        genre: 'Business',
        uploadedBy: 'me',
        cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg'
    },
    {
        id: 'my3',
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        description: 'A brief history of humankind',
        image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1420585954i/23692271.jpg',
        background: '#f59e0b',
        genre: 'History',
        uploadedBy: 'me',
        cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1420585954i/23692271.jpg'
    },
    {
        id: 'my4',
        title: 'Think and Grow Rich',
        author: 'Napoleon Hill',
        description: 'The classic guide to success',
        image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg',
        background: '#8b5cf6',
        genre: 'Business',
        uploadedBy: 'me',
        cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg'
    },
    {
        id: 'my5',
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian social science fiction novel',
        image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg',
        background: '#ef4444',
        genre: 'Fiction',
        uploadedBy: 'me',
        cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg'
    }

    
]);

// Function to remove a book by ID
export function removeBook(bookId: string) {
    myBooks.update(books => books.filter(book => book.id !== bookId));
}

// Function to add a book
export function addBook(book: any) {
    myBooks.update(books => [...books, book]);
}