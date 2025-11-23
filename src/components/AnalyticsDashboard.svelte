<script>
    import { onMount } from "svelte";
    import { getDbConnection } from "../lib/db";
    import { fade } from "svelte/transition";
    import { BarChart, Users, ShoppingBag, Activity } from "lucide-svelte";

    let stats = {
        totalUsers: 0,
        totalProducts: 0,
        totalLogins: 0,
        recentEvents: [],
    };

    let loading = true;

    onMount(async () => {
        try {
            const conn = await getDbConnection();

            // Run analytical queries
            const userCount = await conn.query(
                "SELECT count(*) as count FROM users",
            );
            const productCount = await conn.query(
                "SELECT count(*) as count FROM products",
            );
            const loginCount = await conn.query(
                "SELECT count(*) as count FROM analytics WHERE event_type = 'login'",
            );
            const events = await conn.query(
                "SELECT * FROM analytics ORDER BY timestamp DESC LIMIT 5",
            );

            stats = {
                totalUsers: Number(userCount.toArray()[0].count),
                totalProducts: Number(productCount.toArray()[0].count),
                totalLogins: Number(loginCount.toArray()[0].count),
                recentEvents: events.toArray().map((r) => r.toJSON()),
            };
        } catch (e) {
            console.error("Analytics error:", e);
        } finally {
            loading = false;
        }
    });
</script>

<div class="analytics-dashboard" in:fade>
    <h2><Activity class="icon" /> Analytics Dashboard</h2>

    {#if loading}
        <p>Loading analytics data...</p>
    {:else}
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon users">
                    <Users size={24} />
                </div>
                <div class="stat-info">
                    <span class="stat-value">{stats.totalUsers}</span>
                    <span class="stat-label">Total Users</span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon products">
                    <ShoppingBag size={24} />
                </div>
                <div class="stat-info">
                    <span class="stat-value">{stats.totalProducts}</span>
                    <span class="stat-label">Products</span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon logins">
                    <BarChart size={24} />
                </div>
                <div class="stat-info">
                    <span class="stat-value">{stats.totalLogins}</span>
                    <span class="stat-label">Total Logins</span>
                </div>
            </div>
        </div>

        <div class="recent-activity">
            <h3>Recent Activity</h3>
            <div class="activity-list">
                {#each stats.recentEvents as event}
                    <div class="activity-item">
                        <span class="event-type type-{event.event_type}"
                            >{event.event_type}</span
                        >
                        <span class="event-user"
                            >User: {event.user_id.substring(0, 8)}...</span
                        >
                        <span class="event-time"
                            >{new Date(
                                event.timestamp,
                            ).toLocaleTimeString()}</span
                        >
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .analytics-dashboard {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 16px;
        padding: 1.5rem;
        margin-top: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    h2 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: #fff;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .stat-card {
        background: rgba(0, 0, 0, 0.2);
        padding: 1.25rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .stat-icon.users {
        background: rgba(59, 130, 246, 0.2);
        color: #3b82f6;
    }
    .stat-icon.products {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
    }
    .stat-icon.logins {
        background: rgba(245, 158, 11, 0.2);
        color: #f59e0b;
    }

    .stat-info {
        display: flex;
        flex-direction: column;
    }

    .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #fff;
    }

    .stat-label {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.6);
    }

    .recent-activity h3 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.8);
    }

    .activity-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .activity-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        font-size: 0.9rem;
    }

    .event-type {
        text-transform: uppercase;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
    }

    .type-login {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
    }
    .type-signup {
        background: rgba(59, 130, 246, 0.2);
        color: #3b82f6;
    }
    .type-logout {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
    }

    .event-user {
        color: rgba(255, 255, 255, 0.8);
    }

    .event-time {
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.8rem;
    }
</style>
