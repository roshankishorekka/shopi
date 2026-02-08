// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('token');

// Centralized fetch wrapper with auth
async function apiRequest(endpoint, options = {}) {
    const token = getToken();

    const headers = {
        ...options.headers
    };

    // Add auth token if available (except for FormData)
    if (token && !(options.body instanceof FormData)) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Add Content-Type for JSON if not FormData
    if (options.body && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        // Handle 401 Unauthorized - redirect to login
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Unauthorized');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// === Products API ===
export const productsAPI = {
    // Get all products with optional filters
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
    },

    // Get single product by ID
    getById: (id) => apiRequest(`/products/${id}`),

    // Get products by category
    getByCategory: (category) => apiRequest(`/products/category/${category}`),

    // Search products
    search: (query) => apiRequest(`/products?search=${encodeURIComponent(query)}`)
};

// === Auth API ===
export const authAPI = {
    // Register new user
    register: (userData) => apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    }),

    // Login user
    login: (credentials) => apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    }),

    // Get current user
    me: () => apiRequest('/auth/me')
};

// === Orders API ===
export const ordersAPI = {
    // Create new order
    create: (orderData) => apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
    }),

    // Verify Razorpay payment
    verifyPayment: (paymentData) => apiRequest('/orders/verify-payment', {
        method: 'POST',
        body: JSON.stringify(paymentData)
    }),

    // Get user's orders
    getMyOrders: () => apiRequest('/orders/my-orders'),

    // Get single order
    getById: (id) => apiRequest(`/orders/${id}`)
};

// === Admin API ===
export const adminAPI = {
    // Get dashboard stats
    getStats: () => apiRequest('/admin/stats'),

    // Products management
    products: {
        getAll: () => apiRequest('/admin/products'),

        create: (formData) => {
            const token = getToken();
            return fetch(`${API_BASE_URL}/admin/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData // FormData for file upload
            }).then(res => res.json());
        },

        update: (id, formData) => {
            const token = getToken();
            return fetch(`${API_BASE_URL}/admin/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            }).then(res => res.json());
        },

        delete: (id) => apiRequest(`/admin/products/${id}`, {
            method: 'DELETE'
        })
    },

    // Orders management
    orders: {
        getAll: () => apiRequest('/admin/orders'),

        updateStatus: (id, statusData) => apiRequest(`/admin/orders/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify(statusData)
        })
    }
};

// Export base URL for direct use if needed
export { API_BASE_URL };
