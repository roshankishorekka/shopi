<script>
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { products } from "../lib/products";

    const logoSrc = "/assets/netr_logo.png";
    const featuredProducts = products.slice(0, 4); // Get first 4 products
    const mainProduct = products[0]; // Bollywood Shocker Tee

    let email = "";
</script>

<div class="netr-page">
    <!-- Background -->
    <div class="bg-layer">
        <div class="gradient-overlay"></div>
        <div class="glow-center">
            <div class="glow-blob"></div>
            <div class="glow-blob-2"></div>
        </div>
    </div>

    <header class="header">
        <div class="brand">
            <img src={logoSrc} class="logo-img" alt="Netra Logo" />
            <div class="brand-text">
                <h1>नेत्र</h1>
                <p>antigravity streetwear</p>
            </div>
        </div>

        <nav class="nav-links">
            <a href="/shop">Shop</a>
            <a href="/collections">Collections</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </nav>

        <div class="nav-actions">
            <button class="btn-signin">Sign in</button>
            <button class="btn-icon">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <path d="M3 3h18v18H3z" stroke-width="0" />
                    <path
                        d="M3 3h18v18H3z"
                        stroke="currentColor"
                        stroke-width="2"
                    />
                </svg>
            </button>
        </div>
    </header>

    <main class="main-content">
        <section class="hero">
            <div class="hero-left">
                <div class="floating-orb-container">
                    <div class="floating-orb animate-float">
                        <img src={logoSrc} alt="logo orb" />
                    </div>
                </div>

                <h2 class="hero-title">नेत्र</h2>
                <p class="hero-desc">
                    A clothing brand inspired by sight, mystery and motion.
                    Designs that seem to hover — clothes with presence. Welcome
                    to the antigravity edit.
                </p>

                <div class="hero-buttons">
                    <button class="btn-primary">Shop the Drop</button>
                    <button class="btn-secondary">Explore</button>
                </div>

                <div class="hero-cards">
                    <div class="glass-card floating-card">
                        <p class="card-label">Limited run</p>
                        <strong>Glide Jacket</strong>
                    </div>
                    <div
                        class="glass-card floating-card delay-1"
                        style="transform: translateY(-6px);"
                    >
                        <p class="card-label">New</p>
                        <strong>Orbit Tee</strong>
                    </div>
                </div>
            </div>

            <div class="hero-right">
                <div class="product-mockup-container">
                    <div class="product-card-3d">
                        <div class="mockup-image">
                            <img
                                src={mainProduct.image}
                                alt={mainProduct.name}
                            />
                        </div>

                        <div class="mockup-info">
                            <h3>{mainProduct.name}</h3>
                            <p>{mainProduct.description}</p>

                            <div class="mockup-footer">
                                <div class="price">₹{mainProduct.price}</div>
                                <div class="mockup-actions">
                                    <a
                                        href="/product/{mainProduct.id}"
                                        class="btn-sm-glass">View</a
                                    >
                                    <button class="btn-sm-primary">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span class="tag-best-seller">Featured</span>
                </div>
            </div>
        </section>

        <section class="collections">
            <h4>Featured Collection</h4>
            <div class="collections-grid">
                {#each featuredProducts as product}
                    <a href="/product/{product.id}" class="collection-card">
                        <div class="collection-img">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div class="collection-info">
                            <strong>{product.name}</strong>
                            <div class="edition">₹{product.price}</div>
                        </div>
                    </a>
                {/each}
            </div>
        </section>

        <section class="footer-cta">
            <div class="cta-content">
                <div>
                    <h5>Stay lifted.</h5>
                    <p>Subscribe for early drops and exclusive access.</p>
                </div>
                <div class="cta-form">
                    <input
                        type="text"
                        placeholder="Your email"
                        bind:value={email}
                    />
                    <button>Subscribe</button>
                </div>
            </div>
        </section>
    </main>

    <button class="floating-cart">
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >
            <path d="M6 6h15l-1.5 9h-12z" stroke-width="1.2" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
        </svg>
    </button>
</div>

<style>
    :global(body) {
        margin: 0;
        background: black;
        color: white;
        font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
    }

    .netr-page {
        min-height: 100vh;
        position: relative;
        overflow-x: hidden;
    }

    /* Background */
    .bg-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: -10;
    }

    .gradient-overlay {
        height: 100%;
        width: 100%;
        background: linear-gradient(to bottom, black, #171717, black);
        opacity: 0.8;
    }

    .glow-center {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .glow-blob {
        width: 900px;
        height: 420px;
        border-radius: 50%;
        background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(100, 100, 100, 0.1) 40%,
            rgba(0, 0, 0, 0) 70%
        );
        filter: blur(100px);
        opacity: 0.4;
        position: absolute;
    }

    .glow-blob-2 {
        width: 600px;
        height: 600px;
        border-radius: 50%;
        background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(150, 150, 150, 0.15) 30%,
            rgba(0, 0, 0, 0) 60%
        );
        filter: blur(80px);
        opacity: 0.3;
        position: absolute;
    }

    /* Header */
    .header {
        max-width: 1152px; /* max-w-6xl */
        margin: 0 auto;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .logo-img {
        width: 3.5rem;
        height: 3.5rem;
        object-fit: contain;
    }

    .brand-text h1 {
        font-size: 1.5rem;
        font-weight: 600;
        letter-spacing: 0.025em;
        margin: 0;
    }

    .brand-text p {
        font-size: 0.875rem;
        color: #a3a3a3; /* neutral-400 */
        margin: -0.25rem 0 0;
    }

    .nav-links {
        display: none;
    }

    @media (min-width: 768px) {
        .nav-links {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            color: #d4d4d4; /* neutral-300 */
        }
    }

    .nav-links a {
        text-decoration: none;
        color: inherit;
        transition: color 0.2s;
        cursor: pointer;
    }

    .nav-links a:hover {
        color: white;
    }

    .nav-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .btn-signin {
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        border: 1px solid #404040; /* neutral-700 */
        background: transparent;
        color: white;
        font-size: 0.875rem;
        cursor: pointer;
    }

    .btn-icon {
        position: relative;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(12px);
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        color: white;
    }

    /* Main */
    .main-content {
        max-width: 1152px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
    }

    .hero {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        align-items: center;
    }

    @media (min-width: 768px) {
        .hero {
            grid-template-columns: 1fr 1fr;
        }
    }

    .hero-left {
        position: relative;
    }

    .floating-orb-container {
        position: absolute;
        left: -1.5rem;
        top: -3rem;
        width: 9rem;
        height: 9rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        /* shadow-2xl */
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .floating-orb img {
        width: 7rem;
        height: 7rem;
    }

    .hero-title {
        font-size: 3rem;
        font-weight: 800;
        line-height: 1.25;
        margin: 0;
    }

    @media (min-width: 768px) {
        .hero-title {
            font-size: 3.75rem; /* 6xl */
        }
    }

    .hero-desc {
        margin-top: 1rem;
        color: #a3a3a3;
        max-width: 36rem;
        line-height: 1.6;
    }

    .hero-buttons {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
    }

    .btn-primary {
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        background: white;
        color: black;
        font-weight: 600;
        border: none;
        cursor: pointer;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
    }

    .btn-primary:hover {
        transform: translateY(-4px);
    }

    .btn-secondary {
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        border: 1px solid #404040;
        background: transparent;
        color: #d4d4d4;
        cursor: pointer;
        transition: color 0.2s;
    }

    .btn-secondary:hover {
        color: white;
    }

    .hero-cards {
        margin-top: 3rem;
        display: flex;
        gap: 1.5rem;
    }

    .glass-card {
        padding: 1rem;
        border-radius: 0.5rem;
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(12px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .card-label {
        font-size: 0.875rem;
        color: #e5e5e5;
        margin: 0;
    }

    .glass-card strong {
        display: block;
        margin-top: 0.25rem;
    }

    /* Product Mockup */
    .hero-right {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .product-mockup-container {
        position: relative;
        width: 100%;
        max-width: 28rem;
    }

    .product-card-3d {
        border-radius: 1rem;
        padding: 1.5rem;
        background: linear-gradient(to bottom, rgba(23, 23, 23, 0.8), black);
        border: 1px solid #262626;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .product-card-3d::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 1rem;
        background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.08),
            transparent 70%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .product-card-3d:hover::before {
        opacity: 1;
    }

    .product-card-3d:hover {
        transform: translateY(-1rem);
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0 30px 60px rgba(255, 255, 255, 0.08);
    }

    .mockup-image {
        height: 18rem;
        width: 100%;
        border-radius: 0.5rem;
        background: #171717;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .mockup-image img {
        width: 12rem;
        height: 12rem;
        object-fit: contain;
        opacity: 0.9;
    }

    .mockup-info {
        margin-top: 1rem;
    }

    .mockup-info h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
    }

    .mockup-info p {
        font-size: 0.875rem;
        color: #a3a3a3;
        margin: 0.25rem 0 0;
    }

    .mockup-footer {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .price {
        font-size: 1.125rem;
        font-weight: 700;
    }

    .mockup-actions {
        display: flex;
        gap: 0.5rem;
    }

    .btn-sm-glass {
        padding: 0.5rem 0.75rem;
        border-radius: 0.375rem;
        background: rgba(255, 255, 255, 0.06);
        border: none;
        color: white;
        cursor: pointer;
    }

    .btn-sm-primary {
        padding: 0.5rem 0.75rem;
        border-radius: 0.375rem;
        background: white;
        color: black;
        font-weight: 600;
        border: none;
        cursor: pointer;
    }

    .tag-best-seller {
        position: absolute;
        right: -1.5rem;
        top: -1rem;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        background: rgba(255, 255, 255, 0.06);
        font-size: 0.875rem;
        color: white;
    }

    /* Collections */
    .collections {
        margin-top: 3rem;
    }

    .collections h4 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .collections-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }

    @media (min-width: 768px) {
        .collections-grid {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    .collection-card {
        padding: 1rem;
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(12px);
        border: 1px solid #262626;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        display: block;
    }

    .collection-card::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 1rem;
        background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.1),
            transparent 70%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .collection-card:hover::before {
        opacity: 1;
    }

    .collection-card:hover {
        transform: translateY(-0.75rem);
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
    }

    .collection-img {
        height: 12rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }

    .collection-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .collection-info {
        margin-top: 0.75rem;
    }

    .collection-info strong {
        display: block;
    }

    .edition {
        font-size: 0.875rem;
        color: #a3a3a3;
    }

    /* Footer CTA */
    .footer-cta {
        margin-top: 4rem;
        border-radius: 1rem;
        padding: 2rem;
        background: linear-gradient(to right, rgba(23, 23, 23, 0.6), black);
        border: 1px solid #262626;
    }

    .cta-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: space-between;
    }

    @media (min-width: 768px) {
        .cta-content {
            flex-direction: row;
            align-items: center;
        }
    }

    .cta-content h5 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
    }

    .cta-content p {
        color: #a3a3a3;
        margin: 0.25rem 0 0;
    }

    .cta-form {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
    }

    @media (min-width: 768px) {
        .cta-form {
            width: auto;
        }
    }

    .cta-form input {
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        background: transparent;
        border: 1px solid #404040;
        color: white;
        width: 100%;
    }

    .cta-form input::placeholder {
        color: #737373;
    }

    .cta-form button {
        padding: 0.75rem 1.25rem;
        border-radius: 0.5rem;
        background: white;
        color: black;
        font-weight: 600;
        border: none;
        cursor: pointer;
        white-space: nowrap;
    }

    /* Floating Cart */
    .floating-cart {
        position: fixed;
        right: 2rem;
        bottom: 2rem;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.07);
        backdrop-filter: blur(12px);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        border: none;
        color: white;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .floating-cart:hover {
        transform: scale(1.05);
    }

    /* Animations */
    @keyframes floaty {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-8px);
        }
        100% {
            transform: translateY(0px);
        }
    }

    .animate-float {
        animation: floaty 4s ease-in-out infinite;
    }

    .floating-card {
        animation: floaty 5s ease-in-out infinite;
    }

    .delay-1 {
        animation-delay: 1s;
    }
</style>
