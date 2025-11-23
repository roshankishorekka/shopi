import { writable, derived } from 'svelte/store';

// Initialize wishlist from localStorage
const stored = typeof window !== 'undefined' ? localStorage.getItem('wishlist') : null;
const initialWishlist = stored ? JSON.parse(stored) : [];

export const wishlist = writable(initialWishlist);

// Subscribe to changes and update localStorage
if (typeof window !== 'undefined') {
    wishlist.subscribe(value => {
        localStorage.setItem('wishlist', JSON.stringify(value));
    });
}

// Derived store for wishlist count
export const wishlistCount = derived(wishlist, $wishlist => $wishlist.length);

// Add item to wishlist
export function addToWishlist(product) {
    wishlist.update(items => {
        const exists = items.find(item => item.id === product.id);
        if (exists) {
            return items; // Already in wishlist
        }
        return [...items, product];
    });
}

// Remove item from wishlist
export function removeFromWishlist(productId) {
    wishlist.update(items => items.filter(item => item.id !== productId));
}

// Check if item is in wishlist
export function isInWishlist(productId, $wishlist) {
    return $wishlist.some(item => item.id === productId);
}

// Clear wishlist
export function clearWishlist() {
    wishlist.set([]);
}
