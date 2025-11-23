import { writable, derived } from 'svelte/store';

// Initialize cart from localStorage if available
const storedCart = localStorage.getItem('cart');
export const cart = writable(storedCart ? JSON.parse(storedCart) : []);

// Subscribe to changes and update localStorage
cart.subscribe(value => {
    localStorage.setItem('cart', JSON.stringify(value));
});

export const addToCart = (product, quantity = 1, size = 'M') => {
    cart.update(items => {
        const existingItem = items.find(item => item.id === product.id && item.size === size);
        if (existingItem) {
            return items.map(item =>
                item.id === product.id && item.size === size
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        }
        return [...items, { ...product, quantity, size }];
    });
};

export const removeFromCart = (productId) => {
    cart.update(items => items.filter(item => item.id !== productId));
};

export const updateQuantity = (productId, change) => {
    cart.update(items => {
        return items.map(item => {
            if (item.id === productId) {
                const newQuantity = item.quantity + change;
                return { ...item, quantity: Math.max(1, newQuantity) };
            }
            return item;
        });
    });
};

export const clearCart = () => {
    cart.set([]);
};

export const cartTotal = derived(cart, $cart =>
    $cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
);

export const cartCount = derived(cart, $cart =>
    $cart.reduce((count, item) => count + item.quantity, 0)
);
