<script>
    import {
        wishlist,
        removeFromWishlist,
        clearWishlist,
    } from "../lib/wishlist";
    import { addToCart } from "../lib/cart";
    import { Trash2, ShoppingCart, Heart } from "lucide-svelte";
    import { fade } from "svelte/transition";

    function handleAddToCart(product) {
        addToCart(product, 1, "M"); // Default size M
        removeFromWishlist(product.id);
    }

    function handleRemove(productId) {
        removeFromWishlist(productId);
    }
</script>

<div class="wishlist-page">
    <div class="container">
        <div class="wishlist-header">
            <h1>
                <Heart size={32} />
                My Wishlist
            </h1>
            {#if $wishlist.length > 0}
                <p class="wishlist-count">
                    {$wishlist.length}
                    {$wishlist.length === 1 ? "item" : "items"}
                </p>
            {/if}
        </div>

        {#if $wishlist.length === 0}
            <div class="empty-state" transition:fade>
                <Heart size={64} class="empty-icon" />
                <h2>Your Wishlist is Empty</h2>
                <p>
                    Add items you love to your wishlist and come back to them
                    anytime.
                </p>
                <a href="/shop" class="shop-btn">Start Shopping</a>
            </div>
        {:else}
            <div class="wishlist-grid">
                {#each $wishlist as product (product.id)}
                    <div class="wishlist-card" transition:fade>
                        <button
                            class="remove-btn"
                            on:click={() => handleRemove(product.id)}
                        >
                            <Trash2 size={18} />
                        </button>

                        <a href="/product/{product.id}" class="product-image">
                            <img src={product.image} alt={product.name} />
                        </a>

                        <div class="product-info">
                            <a href="/product/{product.id}" class="product-name"
                                >{product.name}</a
                            >
                            <p class="product-category">{product.category}</p>
                            <div class="product-price">₹{product.price}</div>
                        </div>

                        <button
                            class="add-to-cart-btn"
                            on:click={() => handleAddToCart(product)}
                        >
                            <ShoppingCart size={18} />
                            Add to Cart
                        </button>
                    </div>
                {/each}
            </div>

            {#if $wishlist.length > 0}
                <div class="wishlist-actions">
                    <button class="clear-btn" on:click={clearWishlist}>
                        Clear Wishlist
                    </button>
                </div>
            {/if}
        {/if}
    </div>
</div>

<style>
    .wishlist-page {
        min-height: 100vh;
        padding: 120px 0 80px;
        background: #0a0a0a;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .wishlist-header {
        margin-bottom: 3rem;
        text-align: center;
    }

    .wishlist-header h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 0.5rem;
        background: linear-gradient(135deg, #ffffff 0%, #8b5cf6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .wishlist-count {
        color: #a0a0a0;
        font-size: 1.1rem;
    }

    .empty-state {
        text-align: center;
        padding: 5rem 2rem;
        max-width: 500px;
        margin: 0 auto;
    }

    .empty-state :global(.empty-icon) {
        color: #444;
        margin-bottom: 2rem;
    }

    .empty-state h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #ffffff;
    }

    .empty-state p {
        color: #a0a0a0;
        margin-bottom: 2rem;
        font-size: 1.1rem;
    }

    .shop-btn {
        display: inline-block;
        padding: 1rem 2.5rem;
        background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
        color: white;
        text-decoration: none;
        border-radius: 50px;
        font-weight: 600;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
    }

    .shop-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
    }

    .wishlist-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .wishlist-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1rem;
        padding: 1.5rem;
        position: relative;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
    }

    .wishlist-card:hover {
        transform: translateY(-5px);
        border-color: rgba(139, 92, 246, 0.3);
        box-shadow: 0 10px 30px rgba(139, 92, 246, 0.2);
    }

    .remove-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: #ff4444;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 2;
    }

    .remove-btn:hover {
        background: #ff4444;
        color: white;
        transform: scale(1.1);
    }

    .product-image {
        width: 100%;
        aspect-ratio: 1;
        border-radius: 0.75rem;
        overflow: hidden;
        margin-bottom: 1rem;
        display: block;
    }

    .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .wishlist-card:hover .product-image img {
        transform: scale(1.05);
    }

    .product-info {
        flex: 1;
        margin-bottom: 1rem;
    }

    .product-name {
        font-size: 1.1rem;
        font-weight: 600;
        color: #ffffff;
        text-decoration: none;
        display: block;
        margin-bottom: 0.25rem;
        transition: color 0.3s ease;
    }

    .product-name:hover {
        color: #8b5cf6;
    }

    .product-category {
        font-size: 0.9rem;
        color: #a0a0a0;
        margin: 0 0 0.75rem;
    }

    .product-price {
        font-size: 1.25rem;
        font-weight: 700;
        color: #8b5cf6;
    }

    .add-to-cart-btn {
        width: 100%;
        padding: 0.75rem;
        background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
    }

    .add-to-cart-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
    }

    .wishlist-actions {
        text-align: center;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .clear-btn {
        padding: 0.75rem 2rem;
        background: transparent;
        border: 2px solid rgba(255, 255, 255, 0.2);
        color: #a0a0a0;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .clear-btn:hover {
        border-color: #ff4444;
        color: #ff4444;
        background: rgba(255, 68, 68, 0.1);
    }

    @media (max-width: 768px) {
        .wishlist-page {
            padding: 100px 0 60px;
        }

        .wishlist-header h1 {
            font-size: 2rem;
        }

        .wishlist-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 1.5rem;
        }
    }
</style>
