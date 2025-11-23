<script>
    import {
        Facebook,
        Twitter,
        Instagram,
        Mail,
        Phone,
        MapPin,
    } from "lucide-svelte";
</script>

<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-brand">
                <div class="brand-logo">
                    <span class="brand-number">नेत्र</span>
                </div>
                <p class="brand-desc">
                    Premium custom apparel crafted for the exceptional. Where
                    timeless craftsmanship meets contemporary design.
                </p>
                <div class="social-links">
                    <a href="#" class="social-link"><Facebook size={20} /></a>
                    <a href="#" class="social-link"><Twitter size={20} /></a>
                    <a href="#" class="social-link"><Instagram size={20} /></a>
                </div>
            </div>

            <div class="footer-links">
                <h3>Shop</h3>
                <ul>
                    <li><a href="/shop">All Products</a></li>
                    <li><a href="/shop?category=Basic">Basics</a></li>
                    <li>
                        <a href="/shop?category=Graphic">Graphic Tees</a>
                    </li>
                    <li><a href="/shop?category=Hoodie">Hoodies</a></li>
                </ul>
            </div>

            <div class="footer-links">
                <h3>Company</h3>
                <ul>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/terms">Terms & Conditions</a></li>
                </ul>
            </div>

            <div class="footer-contact">
                <h3>Contact Us</h3>
                <div class="contact-item">
                    <Mail size={18} />
                    <span>support@netra.com</span>
                </div>
                <div class="contact-item">
                    <Phone size={18} />
                    <span>+1 (555) 123-4567</span>
                </div>
                <div class="contact-item">
                    <MapPin size={18} />
                    <span>123 Fashion Ave, NY 10001</span>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>
                &copy; {new Date().getFullYear()} Netra. All rights reserved.
            </p>
        </div>
    </div>
</footer>

<style>
    .footer {
        background: #050505;
        padding: 5rem 0 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .footer-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1.5fr;
        gap: 4rem;
        margin-bottom: 4rem;
    }

    .brand-logo {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .brand-number {
        font-size: 2rem;
        font-weight: 900;
        background: linear-gradient(135deg, #ffffff 0%, #8b5cf6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .brand-desc {
        color: rgba(255, 255, 255, 0.6);
        line-height: 1.6;
        margin-bottom: 2rem;
        max-width: 300px;
    }

    .social-links {
        display: flex;
        gap: 1rem;
    }

    .social-link {
        color: rgba(255, 255, 255, 0.6);
        transition: color 0.3s ease;
    }

    .social-link:hover {
        color: #8b5cf6;
    }

    .footer-links h3,
    .footer-contact h3 {
        color: #ffffff;
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
        font-weight: 600;
    }

    .footer-links ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-links li {
        margin-bottom: 0.8rem;
    }

    .footer-links :global(a) {
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-links :global(a:hover) {
        color: #8b5cf6;
    }

    .contact-item {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 1rem;
    }

    .footer-bottom {
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        text-align: center;
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.9rem;
    }

    @media (max-width: 968px) {
        .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
        }
    }

    @media (max-width: 576px) {
        .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
        }
    }
</style>
