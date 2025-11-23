<script>
    import { products } from "../lib/products";
    import ProductCard from "../components/ProductCard.svelte";
    import { fade } from "svelte/transition";

    let selectedCategory = "All";

    $: filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter((p) => p.category === selectedCategory);

    const categories = ["All", ...new Set(products.map((p) => p.category))];
</script>

<div class="shop-page">
    <div class="header-bg">
        <h1>Shop Collection</h1>
    </div>

    <div class="container">
        <div class="filters">
            {#each categories as category}
                <button
                    class="filter-btn"
                    class:active={selectedCategory === category}
                    on:click={() => (selectedCategory = category)}
                >
                    {category}
                </button>
            {/each}
        </div>

        <div class="products-grid">
            {#each filteredProducts as product (product.id)}
                <div in:fade={{ duration: 300 }}>
                    <ProductCard {product} />
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .shop-page {
        padding-top: 80px;
        min-height: 100vh;
        background: #0a0a0a;
    }

    .header-bg {
        background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
            url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
        background-size: cover;
        background-position: center;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 3rem;
    }

    h1 {
        font-size: 3.5rem;
        font-weight: 800;
        color: white;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem 4rem;
    }

    .filters {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
        flex-wrap: wrap;
    }

    .filter-btn {
        padding: 0.8rem 1.5rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.7);
        border-radius: 30px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .filter-btn:hover,
    .filter-btn.active {
        background: #8b5cf6;
        color: white;
        border-color: #8b5cf6;
        transform: translateY(-2px);
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
    }

    @media (max-width: 768px) {
        .header-bg {
            height: 200px;
        }

        h1 {
            font-size: 2.5rem;
        }
    }
</style>
