<script>
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  import NetrHome from "./pages/NetrHome.svelte";
  import Shop from "./pages/Shop.svelte";
  import Cart from "./pages/Cart.svelte";
  import Wishlist from "./pages/Wishlist.svelte";
  import Checkout from "./pages/Checkout.svelte";
  import ProductDetails from "./pages/ProductDetails.svelte";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";
  import Profile from "./pages/Profile.svelte";
  import Admin from "./pages/Admin.svelte";
  import { onMount } from "svelte";

  let path = window.location.pathname;
  let productId = null;

  function updateRoute() {
    path = window.location.pathname;
    const productMatch = path.match(/^\/product\/(\d+)$/);
    if (productMatch) {
      productId = productMatch[1];
    } else {
      productId = null;
    }
    window.scrollTo(0, 0);
  }

  onMount(() => {
    updateRoute();
    const onPopState = () => {
      updateRoute();
    };
    window.addEventListener("popstate", onPopState);

    // Intercept link clicks for SPA navigation
    const handleLinkClick = (e) => {
      const anchor = e.target.closest("a");
      if (anchor && anchor.href.startsWith(window.location.origin)) {
        e.preventDefault();
        window.history.pushState({}, "", anchor.href);
        updateRoute();
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", handleLinkClick);
    };
  });
</script>

<main>
  {#if path === "/" || path === ""}
    <NetrHome />
  {:else}
    <Navbar />
    {#if path === "/shop" || path.startsWith("/shop?")}
      <Shop />
    {:else if path === "/cart"}
      <Cart />
    {:else if path === "/wishlist"}
      <Wishlist />
    {:else if path === "/checkout"}
      <Checkout />
    {:else if productId}
      <ProductDetails id={productId} />
    {:else if path === "/login"}
      <Login />
    {:else if path === "/signup"}
      <Signup />
    {:else if path === "/profile"}
      <Profile />
    {:else if path === "/admin"}
      <Admin />
    {:else}
      <div class="not-found">
        <h1>404 - Page Not Found</h1>
        <p>The page {path} does not exist.</p>
        <a href="/" class="home-link">Go Home</a>
      </div>
    {/if}
    <Footer />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      sans-serif;
    background: #0a0a0a;
    color: #ffffff;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(*) {
    box-sizing: border-box;
  }

  main {
    min-height: 100vh;
  }

  .not-found {
    padding-top: 150px;
    text-align: center;
    min-height: 60vh;
  }

  .not-found h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #8b5cf6;
  }

  .not-found p {
    font-size: 1.2rem;
    color: #a0a0a0;
    margin-bottom: 2rem;
  }

  .home-link {
    display: inline-block;
    padding: 1rem 2rem;
    background: #8b5cf6;
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .home-link:hover {
    background: #7c3aed;
    transform: translateY(-2px);
  }
</style>
