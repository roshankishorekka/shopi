<script>
    import { login } from "../lib/user";
    import { fade, fly } from "svelte/transition";
    import { Mail, Lock, Loader2, ArrowRight } from "lucide-svelte";

    let email = "";
    let password = "";
    let isLoading = false;
    let error = "";

    const handleLogin = async () => {
        if (!email || !password) {
            error = "Please fill in all fields";
            return;
        }

        isLoading = true;
        error = "";

        try {
            await login(email, password);
            window.location.href = "/profile";
        } catch (e) {
            error = e.message;
        } finally {
            isLoading = false;
        }
    };
</script>

<div class="auth-page" in:fade>
    <div class="auth-container" in:fly={{ y: 20, duration: 800, delay: 200 }}>
        <div class="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to access your custom designs</p>
        </div>

        <form on:submit|preventDefault={handleLogin} class="auth-form">
            {#if error}
                <div class="error-message" transition:fade>{error}</div>
            {/if}

            <div class="input-group">
                <div class="input-icon">
                    <Mail size={20} />
                </div>
                <input
                    type="email"
                    placeholder="Email Address"
                    bind:value={email}
                    disabled={isLoading}
                />
            </div>

            <div class="input-group">
                <div class="input-icon">
                    <Lock size={20} />
                </div>
                <input
                    type="password"
                    placeholder="Password"
                    bind:value={password}
                    disabled={isLoading}
                />
            </div>

            <div class="form-options">
                <label class="checkbox-label">
                    <input type="checkbox" />
                    <span>Remember me</span>
                </label>
                <a href="/forgot-password" class="forgot-link"
                    >Forgot Password?</a
                >
            </div>

            <button type="submit" class="submit-btn" disabled={isLoading}>
                {#if isLoading}
                    <span class="spin"><Loader2 size={20} /></span>
                {:else}
                    Sign In <ArrowRight size={20} />
                {/if}
            </button>
        </form>

        <div class="auth-footer">
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    </div>
</div>

<style>
    .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 120px 20px 40px;
        background: radial-gradient(
                circle at top right,
                rgba(139, 92, 246, 0.1),
                transparent 40%
            ),
            radial-gradient(
                circle at bottom left,
                rgba(236, 72, 153, 0.1),
                transparent 40%
            );
    }

    .auth-container {
        width: 100%;
        max-width: 450px;
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 3rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .auth-header {
        text-align: center;
        margin-bottom: 2.5rem;
    }

    .auth-header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        background: linear-gradient(to right, #fff, #a5a5a5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .auth-header p {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1.1rem;
    }

    .auth-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .input-group {
        position: relative;
    }

    .input-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.4);
        pointer-events: none;
    }

    input {
        width: 100%;
        padding: 1rem 1rem 1rem 3rem;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: white;
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    input:focus {
        outline: none;
        border-color: #8b5cf6;
        background: rgba(139, 92, 246, 0.05);
        box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
    }

    input::placeholder {
        color: rgba(255, 255, 255, 0.3);
    }

    .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.7);
    }

    .forgot-link {
        color: #8b5cf6;
        text-decoration: none;
        transition: color 0.2s;
    }

    .forgot-link:hover {
        color: #a78bfa;
    }

    .submit-btn {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
        margin-top: 1rem;
    }

    .submit-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
    }

    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .spin {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .error-message {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        color: #ef4444;
        padding: 0.75rem;
        border-radius: 8px;
        text-align: center;
        font-size: 0.9rem;
    }

    .auth-footer {
        text-align: center;
        margin-top: 2rem;
        color: rgba(255, 255, 255, 0.6);
    }

    .auth-footer a {
        color: white;
        text-decoration: none;
        font-weight: 600;
        margin-left: 0.25rem;
    }

    .auth-footer a:hover {
        text-decoration: underline;
    }

    @media (max-width: 480px) {
        .auth-container {
            padding: 2rem;
        }
    }
</style>
