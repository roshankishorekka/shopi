<script>
    import { user, logout } from "../lib/user";
    import { fade } from "svelte/transition";
    import { LogOut, Package, Settings, Heart } from "lucide-svelte";
    import AnalyticsDashboard from "../components/AnalyticsDashboard.svelte";

    // Redirect if not logged in
    $: if (!$user) {
        window.location.href = "/login";
    }
</script>

{#if $user}
    <div class="profile-page" in:fade>
        <div class="container">
            <div class="profile-header">
                <div class="profile-info">
                    <div class="avatar">
                        <img src={$user.avatar} alt={$user.name} />
                    </div>
                    <div class="user-details">
                        <h1>{$user.name}</h1>
                        <p>{$user.email}</p>
                    </div>
                </div>
                <button class="logout-btn" on:click={logout}>
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>

            <AnalyticsDashboard />

            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <div class="card-icon">
                        <Package size={32} />
                    </div>
                    <h3>My Orders</h3>
                    <p>Track and manage your recent purchases</p>
                    <span class="card-link">View Orders →</span>
                </div>

                <div class="dashboard-card">
                    <div class="card-icon">
                        <Heart size={32} />
                    </div>
                    <h3>Wishlist</h3>
                    <p>Saved items you want to buy later</p>
                    <span class="card-link">View Wishlist →</span>
                </div>

                <div class="dashboard-card">
                    <div class="card-icon">
                        <Settings size={32} />
                    </div>
                    <h3>Settings</h3>
                    <p>Manage your account preferences</p>
                    <span class="card-link">Account Settings →</span>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .profile-page {
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

    .profile-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4rem;
        background: rgba(255, 255, 255, 0.03);
        padding: 2rem;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .profile-info {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #8b5cf6;
        background: #1a1a1a;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .user-details h1 {
        margin: 0;
        font-size: 1.8rem;
        font-weight: 700;
    }

    .user-details p {
        margin: 0.25rem 0 0;
        color: rgba(255, 255, 255, 0.6);
    }

    .logout-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.2);
        border-radius: 10px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
    }

    .logout-btn:hover {
        background: rgba(239, 68, 68, 0.2);
        transform: translateY(-2px);
    }

    .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .dashboard-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .dashboard-card:hover {
        background: rgba(255, 255, 255, 0.05);
        transform: translateY(-5px);
        border-color: rgba(139, 92, 246, 0.3);
    }

    .card-icon {
        background: rgba(139, 92, 246, 0.1);
        color: #8b5cf6;
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
    }

    .dashboard-card h3 {
        margin: 0 0 0.5rem;
        font-size: 1.25rem;
    }

    .dashboard-card p {
        color: rgba(255, 255, 255, 0.6);
        margin: 0 0 1.5rem;
        line-height: 1.5;
    }

    .card-link {
        margin-top: auto;
        color: #8b5cf6;
        font-weight: 600;
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        .profile-header {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
        }

        .profile-info {
            flex-direction: column;
        }
    }
</style>
