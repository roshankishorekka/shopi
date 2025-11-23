<script>
    import { cart, cartTotal, clearCart } from "../lib/cart";
    import { user } from "../lib/user";
    import { onMount } from "svelte";
    import { CreditCard, Truck, MapPin, User as UserIcon } from "lucide-svelte";

    let step = 1; // 1: Address, 2: Payment, 3: Confirmation
    let formData = {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        paymentMethod: "cod",
    };

    let orderPlaced = false;
    let orderId = "";

    onMount(() => {
        if (!$user) {
            window.location.href = "/login";
        }
        if ($cart.length === 0 && !orderPlaced) {
            window.location.href = "/cart";
        }
        if ($user) {
            formData.fullName = $user.name;
            formData.email = $user.email;
        }
    });

    function handleNext() {
        if (step === 1) {
            // Validate address form
            if (
                !formData.fullName ||
                !formData.phone ||
                !formData.address ||
                !formData.city ||
                !formData.pincode
            ) {
                alert("Please fill all address fields");
                return;
            }
            step = 2;
        } else if (step === 2) {
            // Process order
            placeOrder();
        }
    }

    function placeOrder() {
        // Generate order ID
        orderId = `ORD-${Date.now()}`;

        // Store order in localStorage (in production, this would be sent to backend)
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        const newOrder = {
            id: orderId,
            userId: $user?.id,
            items: $cart,
            total: $cartTotal,
            shippingAddress: { ...formData },
            status: "pending",
            createdAt: new Date().toISOString(),
        };
        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));

        // Clear cart
        clearCart();

        orderPlaced = true;
        step = 3;
    }

    const shippingCost = 0; // Free shipping
    const tax = Math.round($cartTotal * 0.18); // 18% GST
    const finalTotal = $cartTotal + shippingCost + tax;
</script>

<div class="checkout-page">
    <div class="container">
        {#if !orderPlaced}
            <div class="checkout-header">
                <h1>Checkout</h1>
                <div class="steps">
                    <div
                        class="step"
                        class:active={step >= 1}
                        class:completed={step > 1}
                    >
                        <div class="step-number">1</div>
                        <div class="step-label">Address</div>
                    </div>
                    <div class="step-line" class:completed={step > 1}></div>
                    <div
                        class="step"
                        class:active={step >= 2}
                        class:completed={step > 2}
                    >
                        <div class="step-number">2</div>
                        <div class="step-label">Payment</div>
                    </div>
                    <div class="step-line" class:completed={step > 2}></div>
                    <div class="step" class:active={step >= 3}>
                        <div class="step-number">3</div>
                        <div class="step-label">Confirm</div>
                    </div>
                </div>
            </div>

            <div class="checkout-content">
                <div class="checkout-main">
                    {#if step === 1}
                        <div class="form-section">
                            <h2>
                                <MapPin size={24} />
                                Shipping Address
                            </h2>
                            <form>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            bind:value={formData.fullName}
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>Email *</label>
                                        <input
                                            type="email"
                                            bind:value={formData.email}
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label>Phone *</label>
                                        <input
                                            type="tel"
                                            bind:value={formData.phone}
                                            placeholder="+91 XXXXX XXXXX"
                                            required
                                        />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Address *</label>
                                    <textarea
                                        bind:value={formData.address}
                                        placeholder="House No, Street, Landmark"
                                        required
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>City *</label>
                                        <input
                                            type="text"
                                            bind:value={formData.city}
                                            placeholder="City"
                                            required
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label>State *</label>
                                        <input
                                            type="text"
                                            bind:value={formData.state}
                                            placeholder="State"
                                            required
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label>Pincode *</label>
                                        <input
                                            type="text"
                                            bind:value={formData.pincode}
                                            placeholder="XXXXXX"
                                            required
                                            pattern="[0-9]{6}"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    {:else if step === 2}
                        <div class="form-section">
                            <h2>
                                <CreditCard size={24} />
                                Payment Method
                            </h2>
                            <div class="payment-methods">
                                <label class="payment-option">
                                    <input
                                        type="radio"
                                        bind:group={formData.paymentMethod}
                                        value="cod"
                                    />
                                    <div class="payment-card">
                                        <Truck size={32} />
                                        <div class="payment-details">
                                            <div class="payment-name">
                                                Cash on Delivery
                                            </div>
                                            <div class="payment-desc">
                                                Pay when you receive
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <label class="payment-option">
                                    <input
                                        type="radio"
                                        bind:group={formData.paymentMethod}
                                        value="upi"
                                    />
                                    <div class="payment-card">
                                        <CreditCard size={32} />
                                        <div class="payment-details">
                                            <div class="payment-name">
                                                UPI / Cards
                                            </div>
                                            <div class="payment-desc">
                                                Coming Soon
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    {/if}
                </div>

                <div class="checkout-sidebar">
                    <div class="order-summary">
                        <h3>Order Summary</h3>
                        <div class="summary-items">
                            {#each $cart as item}
                                <div class="summary-item">
                                    <img src={item.image} alt={item.name} />
                                    <div class="item-details">
                                        <div class="item-name">{item.name}</div>
                                        <div class="item-meta">
                                            Size: {item.size} × {item.quantity}
                                        </div>
                                    </div>
                                    <div class="item-price">
                                        ₹{item.price * item.quantity}
                                    </div>
                                </div>
                            {/each}
                        </div>
                        <div class="summary-totals">
                            <div class="total-row">
                                <span>Subtotal</span>
                                <span>₹{$cartTotal}</span>
                            </div>
                            <div class="total-row">
                                <span>Shipping</span>
                                <span class="free">FREE</span>
                            </div>
                            <div class="total-row">
                                <span>Tax (18% GST)</span>
                                <span>₹{tax}</span>
                            </div>
                            <div class="total-row final">
                                <span>Total</span>
                                <span>₹{finalTotal}</span>
                            </div>
                        </div>
                    </div>

                    <div class="actions">
                        {#if step > 1}
                            <button
                                class="btn-secondary"
                                on:click={() => step--}>Back</button
                            >
                        {/if}
                        <button class="btn-primary" on:click={handleNext}>
                            {step === 1 ? "Continue to Payment" : "Place Order"}
                        </button>
                    </div>
                </div>
            </div>
        {:else}
            <div class="order-confirmation">
                <div class="success-icon">✓</div>
                <h1>Order Placed Successfully!</h1>
                <p class="order-id">Order ID: <strong>{orderId}</strong></p>
                <p class="thank-you">
                    Thank you for shopping with नेत्र. We'll send you a
                    confirmation email shortly.
                </p>
                <div class="confirmation-actions">
                    <a href="/profile" class="btn-primary">View Orders</a>
                    <a href="/shop" class="btn-secondary">Continue Shopping</a>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .checkout-page {
        min-height: 100vh;
        padding: 120px 0 80px;
        background: #0a0a0a;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .checkout-header {
        margin-bottom: 3rem;
    }

    .checkout-header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 2rem;
        background: linear-gradient(135deg, #ffffff 0%, #8b5cf6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .steps {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        max-width: 600px;
        margin: 0 auto;
    }

    .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .step-number {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: #666;
        transition: all 0.3s ease;
    }

    .step.active .step-number {
        background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
        border-color: #8b5cf6;
        color: white;
    }

    .step.completed .step-number {
        background: #8b5cf6;
        border-color: #8b5cf6;
        color: white;
    }

    .step-label {
        font-size: 0.9rem;
        color: #666;
    }

    .step.active .step-label {
        color: #8b5cf6;
    }

    .step-line {
        flex: 1;
        height: 2px;
        background: rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }

    .step-line.completed {
        background: #8b5cf6;
    }

    .checkout-content {
        display: grid;
        grid-template-columns: 1fr 400px;
        gap: 3rem;
    }

    .checkout-main {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1rem;
        padding: 2rem;
    }

    .form-section h2 {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1.5rem;
        margin-bottom: 2rem;
        color: #ffffff;
    }

    .form-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: #a0a0a0;
        font-size: 0.9rem;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 0.5rem;
        color: white;
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #8b5cf6;
        background: rgba(255, 255, 255, 0.08);
    }

    .payment-methods {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .payment-option input[type="radio"] {
        display: none;
    }

    .payment-card {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.03);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 0.75rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .payment-option input:checked + .payment-card {
        border-color: #8b5cf6;
        background: rgba(139, 92, 246, 0.1);
    }

    .payment-card:hover {
        border-color: rgba(139, 92, 246, 0.5);
    }

    .payment-details {
        flex: 1;
    }

    .payment-name {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: #ffffff;
    }

    .payment-desc {
        font-size: 0.9rem;
        color: #a0a0a0;
    }

    .checkout-sidebar {
        position: sticky;
        top: 120px;
        height: fit-content;
    }

    .order-summary {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1rem;
        padding: 2rem;
        margin-bottom: 1.5rem;
    }

    .order-summary h3 {
        font-size: 1.25rem;
        margin-bottom: 1.5rem;
        color: #ffffff;
    }

    .summary-items {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
    }

    .summary-item {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .summary-item img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 0.5rem;
    }

    .item-details {
        flex: 1;
    }

    .item-name {
        font-size: 0.95rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
        color: #ffffff;
    }

    .item-meta {
        font-size: 0.85rem;
        color: #a0a0a0;
    }

    .item-price {
        font-weight: 600;
        color: #8b5cf6;
    }

    .summary-totals {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .total-row {
        display: flex;
        justify-content: space-between;
        color: #a0a0a0;
    }

    .total-row.final {
        font-size: 1.25rem;
        font-weight: 700;
        color: #ffffff;
        padding-top: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .free {
        color: #4ade80;
    }

    .actions {
        display: flex;
        gap: 1rem;
    }

    .btn-primary,
    .btn-secondary {
        flex: 1;
        padding: 1rem;
        border-radius: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        text-align: center;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-primary {
        background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
        color: white;
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
    }

    .btn-secondary {
        background: transparent;
        border: 2px solid rgba(255, 255, 255, 0.2);
        color: #a0a0a0;
    }

    .btn-secondary:hover {
        border-color: #8b5cf6;
        color: #8b5cf6;
    }

    .order-confirmation {
        text-align: center;
        max-width: 600px;
        margin: 5rem auto;
    }

    .success-icon {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
        color: white;
        font-size: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 2rem;
    }

    .order-confirmation h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #ffffff;
    }

    .order-id {
        font-size: 1.1rem;
        color: #a0a0a0;
        margin-bottom: 0.5rem;
    }

    .order-id strong {
        color: #8b5cf6;
    }

    .thank-you {
        font-size: 1.1rem;
        color: #a0a0a0;
        margin-bottom: 3rem;
    }

    .confirmation-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    @media (max-width: 968px) {
        .checkout-content {
            grid-template-columns: 1fr;
        }

        .checkout-sidebar {
            position: relative;
            top: 0;
        }
    }
</style>
