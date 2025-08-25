import {writable} from "svelte/store";
import book from "../../Mockdata/mockBooks";

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

export const likedbooksStore=writable<Book[]>([]);

export function toggleLike(book: Book): void {
    likedbooksStore.update((likedbooks: Book[]) => {
        const isLiked = likedbooks.find(b => b.id === book.id);
        if(isLiked){
            return likedbooks.filter(b => b.id !== book.id);
        }else{
            return [...likedbooks, book];
        }
    });
}