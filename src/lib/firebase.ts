import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, type User } from 'firebase/auth';
import { writable, type Writable } from 'svelte/store';

// Define user type
export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// Your Firebase config (replace with your actual config from Step 4)
const firebaseConfig = {
  apiKey: "AIzaSyCHiEiTs9WXIFiQl3mNqwlchRC7dYxY-rg",
  authDomain: "bookbridge-app-c7b50.firebaseapp.com",
  projectId: "bookbridge-app-c7b50",
  storageBucket: "bookbridge-app-c7b50.firebasestorage.app",
  messagingSenderId: "146070039808",
  appId: "1:146070039808:web:878f742d9dfb3a157857e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// User store
export const user: Writable<AppUser | null> = writable(null);

// Auth state listener
onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    user.set({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || firebaseUser.email
    });
  } else {
    user.set(null);
  }
});

// Sign in function
export async function signIn(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Sign in failed' };
  }
}

// Sign up function
export async function signUp(email: string, password: string, name?: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Sign up failed' };
  }
}

// Sign out function
export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Sign out failed' };
  }
}