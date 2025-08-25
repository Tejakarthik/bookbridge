 BookBridge 

A book marketplace for the users to trade books with thier friends or find new friemds and exchange with them.

 Learning Objectives

This project was created as a hands-on learning experience of Svelte and SvelteKit concepts through building a real-world application. Each feature implementation taught me specific Svelte concepts and patterns.

 Features & Svelte Concepts Learned

 1. Book Search with Google Books API
 Concepts Learned:
- Reactive Statements (`$:`): Auto-updating search results when store values change
- Svelte Stores: Using `writable` stores for global state management (`searchResultsStore`, `isSearchingStore`)
- Debouncing: Implementing search input debouncing with `setTimeout` and `clearTimeout`
- Event Handling: `on:input`, `on:keypress` for user interactions
- Conditional Rendering: `{#if}` blocks for showing/hiding search dropdown
- API Integration: Async/await patterns with `fetch()` for external API calls
- Data Binding: Two-way binding with `bind:value` for input fields

 2. Book Carousel with Navigation
Concepts Learned:
- Component Lifecycle: Using `onMount` for initialization
- DOM Manipulation: Binding DOM elements with `bind:this` for carousel scrolling
- Event Handlers: Click handlers for carousel navigation buttons
- CSS-in-Svelte: Scoped styling and CSS animations
- Reactive Updates: Dynamic styling based on component state
- Array Iteration: `{#each}` blocks for rendering book cards

 3. Modal System
Concepts Learned:
- Component Communication: Parent-child component data flow
- Props: Passing data between components (`book`, `source`, `onClose`)
- Custom Events: Creating and dispatching custom events
- Conditional Components: Dynamic component rendering based on state
- Event Modifiers: `on:click|stopPropagation` for preventing event bubbling
- Component Composition: Building reusable modal components

 4. Responsive Design & Mobile Navigation
Concepts Learned:
- CSS Media Queries: Responsive design patterns in Svelte
- State Management: Managing UI state for mobile menu (`showMobileMenu`)
- Dynamic Classes: Conditional CSS classes with `{showMobileMenu ? 'class' : ''}`
- Touch Events: Mobile-optimized event handling
- CSS Animations: Keyframe animations and transitions
- Accessibility: ARIA labels, keyboard navigation, and semantic HTML

 5. Sidebar Navigation with Routing
Concepts Learned:
- SvelteKit Routing: File-based routing system
- Layout Components: Using `+layout.svelte` for shared UI
- Navigation State: Active route highlighting and state management
- CSS Flexbox: Layout patterns for sidebar and main content

 6. Book Management System 
Concepts Learned:
- Multiple Store Management: Coordinating multiple Svelte stores (`likedBooksStore`, `myBooksStore`)


 7. Search Functionality with Dropdown 
Concepts Learned:
- Outside Click Detection: Document event listeners in `onMount`
- Dropdown Positioning: CSS positioning for search results
- Loading States: Managing async operation feedback
- Result Limiting: Data manipulation and display optimization
- Error Handling: Graceful error handling in async operations

 8. Responsive Book Grid 
Concepts Learned:
- CSS Grid: Responsive grid layouts
- CSS Custom Properties: Dynamic styling with CSS variables
- Viewport Units: Using `vw`, `vh` for responsive design
- Breakpoint Management: Mobile-first responsive design

 9. State Management Architecture 
Concepts Learned:
- Store Patterns: Centralized state management with Svelte stores
- Derived Stores: Computing values from other stores
- Store Subscriptions: Reactive updates with `$` syntax
- Custom Store Creation: Building specialized stores for different data types
- Store Cleanup: Proper subscription management and memory handling



 Technical Stack

- Frontend Framework: SvelteKit
- Language: TypeScript
- Styling: CSS 
- API: Google Books API
- State Management: Svelte Stores
- Package Manager: npm

Key Svelte Concepts 

 Core Svelte Features:
- Reactivity `$:` reactive statements and store subscriptions
- Components Reusable component architecture
- Props & Events: Component communication patterns
- Stores: Global state management with writable stores
- Lifecycle: `onMount`, `onDestroy` for component lifecycle management
- Bindings: Two-way data binding and DOM element binding
- Transitions: CSS animations and transitions

 SvelteKit Features:
-  Routing: File-based routing system
-  Layouts: Shared layout components
-  Error Handling: Error boundaries and fallbacks
-  TypeScript Integration: Type-safe development


 Learning Outcomes

Through building BookBridge, I gained practical experience with:

1. Modern Frontend Development: Understanding reactive programming paradigms
2. State Management: Handling complex application state efficiently
3. API Integration: Working with external APIs and handling async operations
4. Responsive Design: Creating mobile-first, accessible user interfaces
5. TypeScript: Type-safe development practices
6. Modern CSS: Flexbox, Grid, and responsive design patterns

 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Project Structure

```
src/
├── routes/           # SvelteKit routes
│   ├── +layout.svelte
│   ├── +page.svelte
│   ├── likedBooks/
│   └── my-books/
├── lib/              # Reusable components and utilities
│   ├── Modals/
│   ├── Stores/
│   └── assets/
└── Mockdata/         # Mock data for development
```

---

Note: This project represents my learning journey with Svelte. Each feature was implemented to understand specific concepts and patterns, making it a comprehensive showcase of Svelte/SvelteKit capabilities.