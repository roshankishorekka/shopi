<script>
    import { Palette, Truck, Gem } from "lucide-svelte";
    import ProductCard from "../components/ProductCard.svelte";
    import { products } from "../lib/products";
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";

    gsap.registerPlugin(ScrollTrigger);

    let heroSection;
    let productsSection;

    const featuredProducts = products.slice(0, 3);

    onMount(() => {
        // Hero section entrance animation
        if (heroSection) {
            const heroContent = heroSection.querySelector(".hero-content");
            if (heroContent) {
                gsap.fromTo(
                    heroContent,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                );
            }
        }

        // Stagger animation for product cards
        if (productsSection) {
            gsap.fromTo(
                ".product-card-wrapper",
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: productsSection,
                        start: "top 80%",
                        end: "bottom 20%",
                    },
                },
            );
        }
    });
</script>

<main>
    <!-- Hero Section -->
    <section class="hero-section" bind:this={heroSection}>
        <div class="hero-video-container">
            <video autoplay muted loop playsinline class="hero-video">
                <source
                    src="https://cdn.jsdelivr.net/gh/AbhishekBaske/clothcdn@main/AQOrkjzN5hALcaNrOFcjo1WMCStFLk3U2MyNN4LZ29YeagvkBlB_Q9dvmpSVD35HXGGOGnALSsJidpGh657RdRy6wQcWLl1Eei9fWkCEk2bOmP8RGWfMAL60jvIkknjR.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
            <div class="video-overlay"></div>
        </div>

        <div class="hero-content">
            <div class="content-wrapper">
                <div class="brand-section floating-element">
                    <div class="brand-logo">
                        <span class="brand-number">नेत्र</span>
                    </div>
                    <p class="brand-tagline">Crafted for the Exceptional</p>
                </div>

                <div class="hero-text">
                    <h1 class="hero-title">
                        <span class="title-line">PREMIUM</span>
                        <span class="title-line">CUSTOM</span>
                        <span class="title-line highlight">APPAREL</span>
                    </h1>
                    <p class="hero-description">
                        Where timeless craftsmanship meets contemporary design.
                        Each piece tells a story of uncompromising quality and
                        individual expression.
                    </p>
                </div>

                <div class="hero-actions">
                    <a href="/shop" class="cta-button primary">
                        <span>Explore Collection</span>
                        <div class="button-shine"></div>
                    </a>
                    <button class="cta-button secondary">
                        <span>Design Studio</span>
                    </button>
                </div>

                <div class="hero-stats">
                    <div class="stat-item">
                        <span class="stat-number">1000+</span>
                        <span class="stat-label">Designs</span>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat-item">
                        <span class="stat-number">50K+</span>
                        <span class="stat-label">Customers</span>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat-item">
                        <span class="stat-number">4.9★</span>
                        <span class="stat-label">Rating</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="scroll-indicator">
            <span class="scroll-text">Scroll to explore</span>
            <div class="scroll-arrow"></div>
        </div>
    </section>

    <!-- Products Showcase -->
    <section class="products-section" bind:this={productsSection}>
        <div class="container">
            <h2 class="section-title">Featured Products</h2>
            <div class="products-grid">
                {#each featuredProducts as product}
                    <div class="product-card-wrapper">
                        <ProductCard {product} />
                    </div>
                {/each}
            </div>
            <div class="view-all-container">
                <a href="/shop" class="view-all-btn">View All Products</a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
        <div class="container">
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">
                        <Palette size={48} strokeWidth={1.5} />
                    </div>
                    <h3>Custom Design</h3>
                    <p>
                        Create unique designs with our advanced customization
                        tools
                    </p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <Truck size={48} strokeWidth={1.5} />
                    </div>
                    <h3>Fast Shipping</h3>
                    <p>Free shipping on orders over $50 with 2-day delivery</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <Gem size={48} strokeWidth={1.5} />
                    </div>
                    <h3>Premium Quality</h3>
                    <p>100% premium cotton with sustainable printing methods</p>
                </div>
            </div>
        </div>
    </section>
</main>

<style>
    /* Hero Section */
    .hero-section {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: #000;
        padding-top: 90px;
    }

    .hero-video-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .hero-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    .video-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(139, 92, 246, 0.3) 50%,
            rgba(0, 0, 0, 0.6) 100%
        );
        z-index: 2;
    }

    .hero-content {
        position: relative;
        z-index: 3;
        width: 100%;
        max-width: 1200px;
        padding: 0 2rem;
        text-align: center;
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;
    }

    .brand-section {
        text-align: center;
    }

    .brand-logo {
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .brand-number {
        font-size: 4rem;
        font-weight: 900;
        background: linear-gradient(135deg, #ffffff 0%, #8b5cf6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: -2px;
    }

    .brand-tagline {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 300;
        letter-spacing: 3px;
        text-transform: uppercase;
    }

    .hero-text {
        text-align: center;
        max-width: 800px;
    }

    .hero-title {
        margin-bottom: 2rem;
        line-height: 0.9;
    }

    .title-line {
        display: block;
        font-size: clamp(3rem, 8vw, 6rem);
        font-weight: 700;
        color: #ffffff;
        letter-spacing: -3px;
        text-transform: uppercase;
    }

    .title-line.highlight {
        background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-description {
        font-size: 1.3rem;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.6;
        max-width: 600px;
        margin: 0 auto 3rem;
        font-weight: 300;
    }

    .hero-actions {
        display: flex;
        gap: 2rem;
        opacity: 0.9;
    }

    .cta-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 2.5rem;
        border-radius: 50px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease;
        text-decoration: none;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .cta-button.primary {
        background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
        color: white;
        border: none;
    }

    .cta-button.secondary {
        background: transparent;
        border: 2px solid rgba(255, 255, 255, 0.3);
        color: white;
    }

    .cta-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
    }

    .button-shine {
        position: absolute;
        top: 0;
        left: -100%;
        width: 50%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transform: skewX(-20deg);
        transition: 0.5s;
    }

    .cta-button:hover .button-shine {
        left: 150%;
        transition: 0.5s;
    }

    .stat-item {
        text-align: center;
    }

    .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 0.25rem;
    }

    .stat-label {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .stat-divider {
        width: 1px;
        height: 40px;
        background: rgba(255, 255, 255, 0.3);
    }

    .hero-stats {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-top: 2rem;
    }

    .scroll-indicator {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        color: rgba(255, 255, 255, 0.7);
        z-index: 3;
    }

    .scroll-text {
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    .scroll-arrow {
        width: 20px;
        height: 20px;
        border-right: 2px solid rgba(255, 255, 255, 0.7);
        border-bottom: 2px solid rgba(255, 255, 255, 0.7);
        transform: rotate(45deg);
        animation: bounce 2s infinite;
    }

    @keyframes bounce {
        0%,
        20%,
        50%,
        80%,
        100% {
            transform: translateY(0) rotate(45deg);
        }
        40% {
            transform: translateY(-10px) rotate(45deg);
        }
        60% {
            transform: translateY(-5px) rotate(45deg);
        }
    }

    /* Products Section */
    .products-section {
        padding: 8rem 0;
        background: #111111;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .section-title {
        text-align: center;
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 4rem;
        background: linear-gradient(135deg, #ffffff 0%, #8b5cf6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        max-width: 1000px;
        margin: 0 auto 3rem;
    }

    .view-all-container {
        text-align: center;
    }

    .view-all-btn {
        display: inline-block;
        padding: 1rem 2rem;
        background: transparent;
        border: 2px solid #8b5cf6;
        color: #8b5cf6;
        border-radius: 50px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .view-all-btn:hover {
        background: #8b5cf6;
        color: white;
        transform: translateY(-3px);
    }

    /* Features Section */
    .features-section {
        padding: 6rem 0;
        background: #0a0a0a;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 3rem;
    }

    .feature-item {
        text-align: center;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }

    .feature-item:hover {
        transform: translateY(-5px);
        background: rgba(139, 92, 246, 0.1);
        border-color: rgba(139, 92, 246, 0.3);
    }

    .feature-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
        color: #8b5cf6;
        transition: all 0.3s ease;
        font-size: 3rem;
    }

    .feature-item:hover .feature-icon {
        color: #d946ef;
        transform: scale(1.1);
    }

    .feature-item h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #ffffff;
    }

    .feature-item p {
        color: #a0a0a0;
        line-height: 1.6;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .hero-section {
            padding-top: 80px;
        }

        .hero-content {
            padding: 0 1rem;
        }

        .brand-number {
            font-size: 3rem;
        }

        .brand-tagline {
            font-size: 0.9rem;
            letter-spacing: 2px;
        }

        .title-line {
            font-size: clamp(2.5rem, 12vw, 4rem);
        }

        .hero-description {
            font-size: 1.1rem;
            margin-bottom: 2rem;
        }

        .hero-actions {
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 3rem;
        }

        .cta-button {
            width: 100%;
            max-width: 300px;
        }

        .hero-stats {
            flex-direction: column;
            gap: 1.5rem;
        }

        .stat-divider {
            width: 40px;
            height: 1px;
        }

        .products-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
        }

        .features-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 480px) {
        .hero-section {
            padding-top: 70px;
        }

        .content-wrapper {
            gap: 2rem;
        }

        .brand-number {
            font-size: 2.5rem;
        }

        .hero-description {
            font-size: 1rem;
        }

        .cta-button {
            padding: 1rem 2rem;
            font-size: 1rem;
        }

        .stat-number {
            font-size: 1.5rem;
        }

        .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }
    }
</style>
