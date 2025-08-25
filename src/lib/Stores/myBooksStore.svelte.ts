import { writable } from "svelte/store";
import mockBooks from "../../Mockdata/mockBooks";
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

export const allBooksStore = writable<Book[]>([]);
export const filteredBooksStore = writable<Book[]>([]);
export const searchResultsStore=writable<Book[]>([]);
export const isSearchingStore= writable<boolean>(false);
allBooksStore.set(mockBooks);
const mockUsers = ["Alice", "Bob", "Charlie","David","Eva"];


export async function fetchBooks(genre: string) {
    try {
        const selectedGenre=genre;
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${genre}&maxResults=5`);
        const data = await res.json();

        const books:Book[] = (data.items||[]).map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.[0] || "Unknown",
            description: item.volumeInfo.description || "No description",
            cover: item.volumeInfo.imageLinks?.thumbnail||" ",
            genre: selectedGenre,
            uploadedBy: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            image: item.volumeInfo.imageLinks?.thumbnail || "/placeholder-book.jpg",
            background: `hsl(${Math.random() * 360}, 70%, 90%)`
        }));

        filteredBooksStore.set(books);

    }
    catch (error) {
        console.error("Error fetching books:", error);
        
    }
}
export async function searchBooks(query:string){
    if(!query.trim()){
        searchResultsStore.set([]);
        isSearchingStore.set(false);
        return;
    }
    try{
        isSearchingStore.set(true);
        const res=await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=8`);
        const data = await res.json();

        const books: Book[] = (data.items || []).map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title || "Unknown Title",
            author: item.volumeInfo.authors?.[0] || "Unknown Author",
            description: item.volumeInfo.description || "No description available",
            cover: item.volumeInfo.imageLinks?.thumbnail || "",
            genre: "Search Result",
            uploadedBy: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            image: item.volumeInfo.imageLinks?.thumbnail || "/placeholder-book.jpg",
            background: `hsl(${Math.random() * 360}, 70%, 90%)`
        }));

        searchResultsStore.set(books);
        isSearchingStore.set(false);
  
    }
    catch (error) {
        console.error("Error searching books:", error);
        searchResultsStore.set([]);
        isSearchingStore.set(false);
    }
}