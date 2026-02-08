<script>
  import { onMount } from 'svelte';
  import { ShoppingBag, Package, TrendingUp, Users, Plus, Edit2, Trash2, Upload, X } from 'lucide-svelte';
  
  let stats = {
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: '0.00'
  };

  let products = [];
  let orders = [];
  let loading = false;
  let error = null;
  let activeTab = 'products'; // 'products' or 'orders'
  
  // Modal states
  let showAddModal = false;
  let showEditModal = false;
  let showDeleteConfirm = false;
  let editingProduct = null;
  let deletingProduct = null;

  // Form state
  let formData = {
    name: '',
    description: '',
    price: '',
    category: 'Graphic',
    stock: '',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    image: null,
    hoverImage: null
  };

  const API_BASE = 'http://localhost:5000/api';
  const token = localStorage.getItem('token');

  onMount(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }
    loadDashboard();
  });

  async function loadDashboard() {
    loading = true;
    try {
      await Promise.all([
        fetchStats(),
        fetchProducts(),
        fetchOrders()
      ]);
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  async function fetchStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch stats');
    stats = await res.json();
  }

  async function fetchProducts() {
    const res = await fetch(`${API_BASE}/admin/products`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    products = await res.json();
  }

  async function fetchOrders() {
    const res = await fetch(`${API_BASE}/admin/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    orders = await res.json();
  }

  function openAddModal() {
    formData = {
      name: '',
      description: '',
      price: '',
      category: 'Graphic',
      stock: '',
      sizes: ['S', 'M', 'L', 'XL'],
      featured: false,
      image: null,
      hoverImage: null
    };
    showAddModal = true;
  }

  function openEditModal(product) {
    editingProduct = product;
    formData = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      sizes: product.sizes || ['S', 'M', 'L', 'XL'],
      featured: product.featured || false,
      image: null,
      hoverImage: null
    };
    showEditModal = true;
  }

  function confirmDelete(product) {
    deletingProduct = product;
    showDeleteConfirm = true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    loading = true;

    try {
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('description', formData.description);
      formPayload.append('price', formData.price);
      formPayload.append('category', formData.category);
      formPayload.append('stock', formData.stock);
      formPayload.append('sizes', JSON.stringify(formData.sizes));
      formPayload.append('featured', formData.featured);

      if (formData.image) {
        formPayload.append('image', formData.image);
      }
      if (formData.hoverImage) {
        formPayload.append('hoverImage', formData.hoverImage);
      }

      const url = editingProduct 
        ? `${API_BASE}/admin/products/${editingProduct.id}`
        : `${API_BASE}/admin/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formPayload
      });

      if (!res.ok) throw new Error('Failed to save product');

      await fetchProducts();
      await fetchStats();
      showAddModal = false;
      showEditModal = false;
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      loading = false;
    }
  }

  async function handleDelete() {
    loading = true;
    try {
      const res = await fetch(`${API_BASE}/admin/products/${deletingProduct.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to delete product');

      await fetchProducts();
      await fetchStats();
      showDeleteConfirm = false;
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      loading = false;
    }
  }

  async function handleOrderStatusUpdate(order, newStatus) {
    try {
      const res = await fetch(`${API_BASE}/admin/orders/${order.id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderStatus: newStatus })
      });

      if (!res.ok) throw new Error('Failed to update order');
      await fetchOrders();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  function handleFileChange(e, field) {
    const file = e.target.files[0];
    if (file) {
      formData[field] = file;
    }
  }
</script>

<div class="admin-container">
  <div class="admin-header">
    <h1>Admin Dashboard</h1>
    <a href="/" class="back-btn">Back to Site</a>
  </div>

  <!-- Stats Cards -->
  <div class="stats-grid">
    <div class="stat-card">
      <Package size={32} />
      <div class="stat-info">
        <div class="stat-value">{stats.totalProducts}</div>
        <div class="stat-label">Total Products</div>
      </div>
    </div>

    <div class="stat-card">
      <ShoppingBag size={32} />
      <div class="stat-info">
        <div class="stat-value">{stats.totalOrders}</div>
        <div class="stat-label">Total Orders</div>
      </div>
    </div>

    <div class="stat-card">
      <TrendingUp size={32} />
      <div class="stat-info">
        <div class="stat-value">₹{stats.revenue}</div>
        <div class="stat-label">Revenue</div>
      </div>
    </div>

    <div class="stat-card">
      <Users size={32} />
      <div class="stat-info">
        <div class="stat-value">{stats.pendingOrders}</div>
        <div class="stat-label">Pending Orders</div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs">
    <button 
      class="tab-btn {activeTab === 'products' ? 'active' : ''}"
      on:click={() => activeTab = 'products'}
    >
      Products ({products.length})
    </button>
    <button 
      class="tab-btn {activeTab === 'orders' ? 'active' : ''}"
      on:click={() => activeTab = 'orders'}
    >
      Orders ({orders.length})
    </button>
  </div>

  <!-- Products Tab -->
  {#if activeTab === 'products'}
    <div class="section">
      <div class="section-header">
        <h2>Product Management</h2>
        <button class="add-btn" on:click={openAddModal}>
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each products as product}
              <tr>
                <td><img src={product.image} alt={product.name} class="product-thumb" /></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.featured ? '⭐' : '-'}</td>
                <td>
                  <button class="icon-btn" on:click={() => openEditModal(product)}>
                    <Edit2 size={16} />
                  </button>
                  <button class="icon-btn delete" on:click={() => confirmDelete(product)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}

  <!-- Orders Tab -->
  {#if activeTab === 'orders'}
    <div class="section">
      <h2>Order Management</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each orders as order}
              <tr>
                <td>{order.orderNumber}</td>
                <td>{order.customer?.name || 'N/A'}</td>
                <td>₹{order.total}</td>
                <td>
                  <select 
                    value={order.orderStatus}
                    on:change={(e) => handleOrderStatusUpdate(order, e.target.value)}
                    class="status-select"
                  >
                    <option>PENDING</option>
                    <option>CONFIRMED</option>
                    <option>PROCESSING</option>
                    <option>SHIPPED</option>
                    <option>DELIVERED</option>
                    <option>CANCELLED</option>
                  </select>
                </td>
                <td><span class="payment-badge {order.paymentStatus}">{order.paymentStatus}</span></td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <button class="icon-btn">View</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}
</div>

<!-- Add/Edit Product Modal -->
{#if showAddModal || showEditModal}
  <div class="modal-overlay" on:click={() => { showAddModal = false; showEditModal = false; }}>
    <div class="modal" on:click|stopPropagation>
      <div class="modal-header">
        <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
        <button class="close-btn" on:click={() => { showAddModal = false; showEditModal = false; }}>
          <X size={24} />
        </button>
      </div>

      <form on:submit={handleSubmit}>
        <div class="form-grid">
          <div class="form-group">
            <label>Product Name*</label>
            <input type="text" bind:value={formData.name} required />
          </div>

          <div class="form-group">
            <label>Category*</label>
            <select bind:value={formData.category} required>
              <option value="Graphic">Graphic</option>
              <option value="Basic">Basic</option>
              <option value="Hoodie">Hoodie</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div class="form-group">
            <label>Price*</label>
            <input type="number" bind:value={formData.price} required min="0" step="0.01" />
          </div>

          <div class="form-group">
            <label>Stock*</label>
            <input type="number" bind:value={formData.stock} required min="0" />
          </div>

          <div class="form-group full-width">
            <label>Description*</label>
            <textarea bind:value={formData.description} required rows="4"></textarea>
          </div>

          <div class="form-group">
            <label>Main Image*</label>
            <input type="file" accept="image/*" on:change={(e) => handleFileChange(e, 'image')} />
          </div>

          <div class="form-group">
            <label>Hover Image</label>
            <input type="file" accept="image/*" on:change={(e) => handleFileChange(e, 'hoverImage')} />
          </div>

          <div class="form-group">
            <label>
              <input type="checkbox" bind:checked={formData.featured} />
              Featured Product
            </label>
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" on:click={() => { showAddModal = false; showEditModal = false; }}>
            Cancel
          </button>
          <button type="submit" class="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Delete Confirmation Modal -->
{#if showDeleteConfirm}
  <div class="modal-overlay" on:click={() => showDeleteConfirm = false}>
    <div class="modal small" on:click|stopPropagation>
      <div class="modal-header">
        <h3>Confirm Delete</h3>
      </div>
      <p>Are you sure you want to delete "{deletingProduct?.name}"?</p>
      <div class="modal-actions">
        <button class="btn-secondary" on:click={() => showDeleteConfirm = false}>Cancel</button>
        <button class="btn-danger" on:click={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .admin-container {
    min-height: 100vh;
    padding: 2rem;
    background: #0a0a0a;
    color: white;
    max-width: 1400px;
    margin: 0 auto;
  }

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .admin-header h1 {
    font-size: 2.5rem;
    background: linear-gradient(135deg, #D4AF37, #F5E6D3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .back-btn {
    padding: 0.75rem 1.5rem;
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid #D4AF37;
    color: #D4AF37;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s;
  }

  .back-btn:hover {
    background: rgba(212, 175, 55, 0.2);
    transform: translateY(-2px);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .stat-card {
    background: rgba(26, 31, 46, 0.6);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .stat-info {
    flex: 1;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: #D4AF37;
  }

  .stat-label {
    color: #F5E6D3;
    font-size: 0.9rem;
  }

  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid rgba(212, 175, 55, 0.3);
  }

  .tab-btn {
    padding: 1rem 2rem;
    background: none;
    border: none;
    color: #F5E6D3;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
  }

  .tab-btn.active {
    color: #D4AF37;
    border-bottom-color: #D4AF37;
  }

  .section {
    background: rgba(26, 31, 46, 0.4);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 12px;
    padding: 2rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .section-header h2 {
    color: #D4AF37;
    font-size: 1.8rem;
  }

  .add-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #D4AF37, #F5E6D3);
    color: #1A1F2E;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
  }

  .add-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background: rgba(212, 175, 55, 0.1);
  }

  th {
    padding: 1rem;
    text-align: left;
    color: #D4AF37;
    font-weight: 600;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
    color: #F5E6D3;
  }

  .product-thumb {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
  }

  .icon-btn {
    padding: 0.5rem;
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 6px;
    cursor: pointer;
    color: #D4AF37;
    margin-right: 0.5rem;
    transition: all 0.3s;
  }

  .icon-btn:hover {
    background: rgba(212, 175, 55, 0.2);
  }

  .icon-btn.delete {
    border-color: rgba(220, 38, 38, 0.5);
    color: #dc2626;
  }

  .icon-btn.delete:hover {
    background: rgba(220, 38, 38, 0.2);
  }

  .status-select {
    padding: 0.5rem;
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 6px;
    color: #F5E6D3;
    cursor: pointer;
  }

  .payment-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .payment-badge.PAID {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
  }

  .payment-badge.PENDING {
    background: rgba(251, 191, 36, 0.2);
    color: #fbbf24;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
  }

  .modal {
    background: #1A1F2E;
    border: 1px solid #D4AF37;
    border-radius: 12px;
    padding: 2rem;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal.small {
    max-width: 400px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .modal-header h3 {
    color: #D4AF37;
    font-size: 1.5rem;
  }

  .close-btn {
    background: none;
    border: none;
    color: #F5E6D3;
    cursor: pointer;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group.full-width {
    grid-column: 1 / -1;
  }

  .form-group label {
    color: #F5E6D3;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.75rem;
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 6px;
    color: white;
    font-family: inherit;
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .btn-primary, .btn-secondary, .btn-danger {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
  }

  .btn-primary {
    background: linear-gradient(135deg, #D4AF37, #F5E6D3);
    color: #1A1F2E;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
  }

  .btn-secondary {
    background: rgba(245, 230, 211, 0.1);
    color: #F5E6D3;
    border: 1px solid rgba(212, 175, 55, 0.3);
  }

  .btn-danger {
    background: rgba(220, 38, 38, 0.2);
    color: #dc2626;
    border: 1px solid rgba(220, 38, 38, 0.5);
  }

  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
