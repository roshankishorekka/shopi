<script>
    import {
        cart,
        removeFromCart,
        updateQuantity,
        cartTotal,
    } from "../lib/cart";
    // import { Link } from "svelte-routing";
    import { Trash2, Minus, Plus, ArrowRight } from "lucide-svelte";
    import { fade, slide } from "svelte/transition";
</script>

<div class="cart-page">
    <div class="container">
        <h1>Your Cart</h1>

        {#if $cart.length > 0}
            <div class="cart-grid">
                <div class="cart-items">
                    {#each $cart as item (item.id)}
                        <div class="cart-item" transition:slide|local>
                            <div class="item-image">
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div class="item-details">
                                <div class="item-header">
                                    <h3>{item.name}</h3>
                                    <span class="item-price">${item.price}</span
                                    >
                                </div>
                                <p class="item-category">{item.category}</p>

                                <div class="item-actions">
                                    <div class="quantity-controls">
                                        <button
                                            on:click={() =>
                                                updateQuantity(item.id, -1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            on:click={() =>
                                                updateQuantity(item.id, 1)}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        class="remove-btn"
                                        on:click={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="cart-summary">
                    <h2>Order Summary</h2>
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>${$cartTotal}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div class="summary-divider"></div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span>${$cartTotal}</span>
                    </div>

                    <a href="/checkout" class="checkout-btn">
                        Proceed to Checkout <ArrowRight size={20} />
                    </a>

                    <a href="/shop" class="continue-shopping"
                        >Continue Shopping</a
                    >
                </div>
            </div>
        {:else}
            <div class="empty-cart" in:fade>
                <div class="empty-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="/shop" class="start-shopping-btn">Start Shopping</a>
            </div>
        {/if}
    </div>
</div>

<style>
    .cart-page {
        padding-top: 120px;
        padding-bottom: 4rem;
        min-height: 100vh;
        background: #0a0a0a;
        color: white;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 3rem;
        font-weight: 700;
    }

    .cart-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 4rem;
    }

    .cart-items {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .cart-item {
        display: flex;
        gap: 1.5rem;
        background: rgba(255, 255, 255, 0.03);
        padding: 1.5rem;
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .item-image {
        width: 100px;
        height: 120px;
        border-radius: 10px;
        overflow: hidden;
        flex-shrink: 0;
    }

    .item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .item-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .item-header h3 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
    }

    .item-price {
        font-weight: 700;
        color: #d946ef;
    }

    .item-category {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
        margin: 0.2rem 0 0;
    }

    .item-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
    }

    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: rgba(255, 255, 255, 0.05);
        padding: 0.3rem;
        border-radius: 8px;
    }

    .quantity-controls button {
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.3rem;
        border-radius: 4px;
        transition: background 0.2s;
    }

    .quantity-controls button:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.1);
    }

    .quantity-controls button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .remove-btn {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: color 0.2s;
    }

    .remove-btn:hover {
        color: #ef4444;
    }

    .cart-summary {
        background: rgba(255, 255, 255, 0.03);
        padding: 2rem;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        height: fit-content;
        position: sticky;
        top: 120px;
    }

    .cart-summary h2 {
        margin: 0 0 1.5rem;
        font-size: 1.5rem;
    }

    .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.7);
    }

    .summary-divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        margin: 1.5rem 0;
    }

    .summary-row.total {
        color: white;
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 2rem;
    }

    .checkout-btn {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.3s;
        margin-bottom: 1rem;
        text-decoration: none;
    }

    .checkout-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
    }

    :global(.continue-shopping) {
        display: block;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.2s;
    }

    :global(.continue-shopping:hover) {
        color: white;
    }

    .empty-cart {
        text-align: center;
        padding: 4rem 0;
    }

    .empty-icon {
        font-size: 4rem;
        margin-bottom: 1.5rem;
        opacity: 0.5;
    }

    .empty-cart h2 {
        margin-bottom: 1rem;
    }

    .empty-cart p {
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 2rem;
    }

    :global(.start-shopping-btn) {
        display: inline-block;
        padding: 1rem 2.5rem;
        background: white;
        color: black;
        text-decoration: none;
        border-radius: 50px;
        font-weight: 600;
        transition: transform 0.2s;
    }

    :global(.start-shopping-btn:hover) {
        transform: translateY(-2px);
    }

    @media (max-width: 968px) {
        .cart-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .cart-summary {
            position: static;
        }
    }

    @media (max-width: 480px) {
        .cart-item {
            flex-direction: column;
        }

        .item-image {
            width: 100%;
            height: 200px;
        }
    }
</style>
