<script>
  import { addToCart } from "../lib/cart";
  import {
    addToWishlist,
    removeFromWishlist,
    wishlist,
    isInWishlist,
  } from "../lib/wishlist";
  import { Heart } from "lucide-svelte";

  export let product;

  let isHovered = false;

  $: inWishlist = isInWishlist(product.id, $wishlist);

  function toggleWishlist() {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  function handleAddToCart() {
    addToCart(product, 1, "M"); // Default size M, quantity 1
  }
</script>

<div
  class="product-card"
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
  role="group"
  aria-label="Product card for {product.name}"
>
  <a href={`/product/${product.id}`} class="product-link">
    <div class="product-image">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        class="main-image"
        class:hidden={isHovered}
      />
      <img
        src={product.hoverImage}
        alt={product.name}
        loading="lazy"
        class="hover-image"
        class:visible={isHovered}
      />
    </div>
  </a>

  <div class="product-info">
    <button
      class="wishlist-btn"
      on:click={toggleWishlist}
      class:active={inWishlist}
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
    </button>
    <span class="product-category">{product.category}</span>
    <a href={`/product/${product.id}`} class="product-name-link">
      <h3 class="product-name">{product.name}</h3>
    </a>
    <p class="product-price">₹{product.price}</p>
    <button class="add-to-cart-btn" on:click={handleAddToCart}>
      Add to Cart
    </button>
  </div>
</div>

<style>
  .product-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .product-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
  }

  .product-link {
    display: block;
    flex: 1;
    overflow: hidden;
    position: relative;
    aspect-ratio: 3/4;
  }

  .product-image {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
    position: absolute;
    top: 0;
    left: 0;
  }

  .main-image {
    opacity: 1;
    transform: scale(1);
  }

  .main-image.hidden {
    opacity: 0;
    transform: scale(0.95);
  }

  .hover-image {
    opacity: 0;
    transform: scale(1.1);
  }

  .hover-image.visible {
    opacity: 1;
    transform: scale(1);
  }

  .product-info {
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: rgba(0, 0, 0, 0.2);
    position: relative;
  }

  .wishlist-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: none;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 2;
  }

  .wishlist-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .wishlist-btn.active {
    background: #8b5cf6;
    color: white;
  }

  .product-category {
    font-size: 0.75rem;
    color: #8b5cf6;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .product-name-link {
    text-decoration: none;
  }

  .product-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    line-height: 1.3;
    transition: color 0.2s;
  }

  .product-name:hover {
    color: #8b5cf6;
  }

  .product-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: #d946ef;
    margin: 0;
  }

  .add-to-cart-btn {
    width: 100%;
    padding: 0.9rem;
    background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 0.5rem;
  }

  .add-to-cart-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
  }
</style>
