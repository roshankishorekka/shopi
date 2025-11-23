<script>
    import { onMount } from "svelte";
    import { products } from "../lib/products";
    import { addToCart } from "../lib/cart";
    // import { Link } from "svelte-routing";
    import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-svelte";

    export let id;

    let product;
    let selectedSize = "M";
    let currentImage;
    const sizes = ["S", "M", "L", "XL", "XXL"];

    $: {
        product = products.find((p) => p.id == id);
        if (product) {
            currentImage = product.image;
        }
    }
</script>

{#if product}
    <div class="product-details-page">
        <div class="container">
            <a href="/shop" class="back-link">
                <ArrowLeft size={20} /> Back to Shop
            </a>

            <div class="product-grid">
                <div class="product-gallery">
                    <div class="main-image-container">
                        <img
                            src={currentImage}
                            alt={product.name}
                            class="main-image"
                        />
                    </div>
                    <div class="thumbnails">
                        <button
                            class="thumb-btn"
                            on:click={() => (currentImage = product.image)}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                class="thumb"
                                class:active={currentImage === product.image}
                            />
                        </button>
                        <button
                            class="thumb-btn"
                            on:click={() => (currentImage = product.hoverImage)}
                        >
                            <img
                                src={product.hoverImage}
                                alt={product.name}
                                class="thumb"
                                class:active={currentImage ===
                                    product.hoverImage}
                            />
                        </button>
                    </div>
                </div>

                <div class="product-info">
                    <span class="category">{product.category}</span>
                    <h1>{product.name}</h1>
                    <div class="rating">
                        <div class="stars">
                            {#each Array(5) as _}
                                <Star
                                    size={16}
                                    fill="#fbbf24"
                                    strokeWidth={0}
                                />
                            {/each}
                        </div>
                        <span class="review-count">(128 reviews)</span>
                    </div>

                    <p class="price">${product.price}</p>

                    <p class="description">
                        {product.description ||
                            "Experience premium quality with our signature collection. Designed for comfort and style, this piece is a versatile addition to any wardrobe."}
                    </p>

                    <div class="options">
                        <div class="option-group">
                            <label>Size</label>
                            <div class="size-selector">
                                {#each sizes as size}
                                    <button
                                        class="size-btn"
                                        class:active={selectedSize === size}
                                        on:click={() => (selectedSize = size)}
                                    >
                                        {size}
                                    </button>
                                {/each}
                            </div>
                        </div>
                    </div>

                    <div class="actions">
                        <button
                            class="add-to-cart-btn"
                            on:click={() => addToCart(product)}
                        >
                            Add to Cart - ${product.price}
                        </button>
                    </div>

                    <div class="features">
                        <div class="feature">
                            <Truck size={20} />
                            <span>Free shipping over $50</span>
                        </div>
                        <div class="feature">
                            <ShieldCheck size={20} />
                            <span>30-day return policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="not-found">
        <h2>Product not found</h2>
        <a href="/shop" class="btn">Return to Shop</a>
    </div>
{/if}

<style>
    .product-details-page {
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

    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        margin-bottom: 2rem;
        transition: color 0.3s;
    }

    .back-link:hover {
        color: #8b5cf6;
    }

    .product-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
    }

    .main-image-container {
        aspect-ratio: 3/4;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 1rem;
        background: rgba(255, 255, 255, 0.05);
    }

    .main-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .thumbnails {
        display: flex;
        gap: 1rem;
    }

    .thumb-btn {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    .thumb {
        width: 80px;
        height: 100px;
        object-fit: cover;
        border-radius: 10px;
        opacity: 0.6;
        transition: all 0.3s;
        border: 2px solid transparent;
    }

    .thumb.active,
    .thumb:hover {
        opacity: 1;
        border-color: #8b5cf6;
    }

    .product-info {
        display: flex;
        flex-direction: column;
    }

    .category {
        color: #8b5cf6;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    h1 {
        font-size: 3rem;
        margin: 0 0 1rem;
        line-height: 1.1;
    }

    .rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }

    .stars {
        display: flex;
    }

    .review-count {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
    }

    .price {
        font-size: 2rem;
        font-weight: 700;
        color: #d946ef;
        margin: 0 0 2rem;
    }

    .description {
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.7;
        margin-bottom: 2.5rem;
        font-size: 1.1rem;
    }

    .option-group {
        margin-bottom: 2rem;
    }

    .option-group label {
        display: block;
        margin-bottom: 0.8rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
    }

    .size-selector {
        display: flex;
        gap: 1rem;
    }

    .size-btn {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: transparent;
        color: white;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 600;
    }

    .size-btn:hover,
    .size-btn.active {
        background: #8b5cf6;
        border-color: #8b5cf6;
    }

    .add-to-cart-btn {
        width: 100%;
        padding: 1.2rem;
        background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 2rem;
    }

    .add-to-cart-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
    }

    .features {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .feature {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: rgba(255, 255, 255, 0.7);
    }

    @media (max-width: 768px) {
        .product-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        h1 {
            font-size: 2rem;
        }
    }
</style>
