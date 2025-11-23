<script>
  import { ShoppingBag, Menu, X, User, Heart } from "lucide-svelte";
  import { cartCount } from "../lib/cart";
  import { wishlistCount } from "../lib/wishlist";
  import { user } from "../lib/user";

  let isMenuOpen = false;
  let isScrolled = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  // Handle scroll effect
  function handleScroll() {
    isScrolled = window.scrollY > 50;
  }
</script>

<svelte:window on:scroll={handleScroll} />

<nav class="navbar" class:scrolled={isScrolled}>
  <div class="nav-container">
    <a href="/" class="logo">
      <span class="logo-number">नेत्र</span>
    </a>

    <div class="nav-links desktop">
      <a href="/">Home</a>
      <a href="/shop">Shop</a>
      <a href="/shop?category=Basic">Basics</a>
      <a href="/shop?category=Graphic">Graphic</a>
    </div>

    <div class="nav-actions">
      {#if $user}
        <a href="/profile" class="profile-btn" title="My Profile">
          <div class="avatar-small">
            <img src={$user.avatar} alt={$user.name} />
          </div>
        </a>
      {:else}
        <a href="/login" class="login-btn">
          <User size={20} />
          <span>Login</span>
        </a>
      {/if}

      <a href="/wishlist" class="cart-btn">
        <Heart size={24} />
        {#if $wishlistCount > 0}
          <span class="cart-badge">{$wishlistCount}</span>
        {/if}
      </a>

      <a href="/cart" class="cart-btn">
        <ShoppingBag size={24} />
        {#if $cartCount > 0}
          <span class="cart-badge">{$cartCount}</span>
        {/if}
      </a>

      <button class="menu-btn mobile" on:click={toggleMenu}>
        {#if isMenuOpen}
          <X size={24} />
        {:else}
          <Menu size={24} />
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class="mobile-menu" class:open={isMenuOpen}>
    <div class="mobile-links">
      <a href="/" on:click={toggleMenu}>Home</a>
      <a href="/shop" on:click={toggleMenu}>Shop</a>
      <a href="/shop?category=Basic" on:click={toggleMenu}>Basics</a>
      <a href="/shop?category=Graphic" on:click={toggleMenu}>Graphic</a>
      {#if $user}
        <a href="/profile" on:click={toggleMenu}>My Profile</a>
      {:else}
        <a href="/login" on:click={toggleMenu}>Login</a>
      {/if}
    </div>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    transition: all 0.3s ease;
    padding: 1.5rem 0;
    background: transparent;
  }

  .navbar.scrolled {
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(10px);
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
    text-decoration: none;
    color: white;
  }

  .logo-number {
    font-size: 1.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #ffffff 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-links {
    display: flex;
    gap: 3rem;
  }

  .nav-links :global(a) {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.3s ease;
    position: relative;
  }

  .nav-links :global(a:hover) {
    color: #ffffff;
  }

  .nav-links :global(a::after) {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 1px;
    background: #8b5cf6;
    transition: width 0.3s ease;
  }

  .nav-links :global(a:hover::after) {
    width: 100%;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .cart-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
  }

  .cart-btn:hover {
    transform: scale(1.1);
    color: #8b5cf6;
  }

  .cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #d946ef;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: color 0.2s;
  }

  .login-btn:hover {
    color: #8b5cf6;
  }

  .profile-btn {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .avatar-small {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: border-color 0.2s;
  }

  .profile-btn:hover .avatar-small {
    border-color: #8b5cf6;
  }

  .avatar-small img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .menu-btn {
    display: none;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #0a0a0a;
    z-index: 99;
    transform: translateY(-100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-menu.open {
    transform: translateY(0);
  }

  .mobile-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .mobile-links :global(a) {
    font-size: 2rem;
    color: white;
    text-decoration: none;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: color 0.3s ease;
  }

  .mobile-links :global(a:hover) {
    color: #8b5cf6;
  }

  @media (max-width: 768px) {
    .desktop {
      display: none;
    }

    .menu-btn {
      display: block;
      z-index: 101;
    }
  }
</style>
