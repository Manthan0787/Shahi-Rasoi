/* =============================================
   ADMIN DASHBOARD PAGE
   ============================================= */

// Global state for admin active tab
let adminActiveTab = 'menu';

function renderAdminPage() {
  if (!DB.isAdminLoggedIn()) {
    return renderAdminLogin();
  }
  return renderAdminDashboard();
}

function renderAdminLogin() {
  return `
    <div class="admin-login">
      <div class="admin-login__card reveal-scale">
        <div class="admin-login__icon">🔒</div>
        <h2 class="admin-login__title">Admin Portal</h2>
        <p class="admin-login__subtitle">Enter password to access the restaurant management system</p>
        
        <div class="admin-login__error" id="login-error-msg">Incorrect password. Please try again.</div>
        
        <form id="admin-login-form">
          <div class="form-group">
            <label class="form-label" for="login-pass">Password</label>
            <input type="password" class="form-input" id="login-pass" placeholder="••••••••" required>
          </div>
          <button type="submit" class="btn btn--primary" style="width: 100%; margin-top: var(--space-md);">
            🔓 Access Dashboard
          </button>
        </form>
      </div>
    </div>
  `;
}

function renderAdminDashboard() {
  const stats = getAdminStats();
  
  return `
    <div class="admin-dashboard">
      <!-- Sidebar -->
      <aside class="admin-sidebar">
        <div class="admin-sidebar__header">
          <h2 class="admin-sidebar__title">Shahi Rasoi</h2>
          <p class="admin-sidebar__subtitle">Management Console</p>
        </div>
        
        <nav class="admin-sidebar__nav">
          <a class="admin-sidebar__link ${adminActiveTab === 'menu' ? 'active' : ''}" data-tab="menu">
            <span class="admin-sidebar__link-icon">📋</span> Menu Manager
          </a>
          <a class="admin-sidebar__link ${adminActiveTab === 'reservations' ? 'active' : ''}" data-tab="reservations">
            <span class="admin-sidebar__link-icon">📅</span> Reservations
          </a>
          <a class="admin-sidebar__link ${adminActiveTab === 'events' ? 'active' : ''}" data-tab="events">
            <span class="admin-sidebar__link-icon">🎉</span> Events Manager
          </a>
          <a class="admin-sidebar__link ${adminActiveTab === 'gallery' ? 'active' : ''}" data-tab="gallery">
            <span class="admin-sidebar__link-icon">🖼️</span> Gallery Manager
          </a>
          <a class="admin-sidebar__link ${adminActiveTab === 'contact' ? 'active' : ''}" data-tab="contact">
            <span class="admin-sidebar__link-icon">📞</span> Contact Settings
          </a>
          <a class="admin-sidebar__link ${adminActiveTab === 'banner' ? 'active' : ''}" data-tab="banner">
            <span class="admin-sidebar__link-icon">🖥️</span> Banner Settings
          </a>
          <a class="admin-sidebar__link admin-sidebar__link--logout" id="admin-logout-btn" style="color: #E94560;">
            <span class="admin-sidebar__link-icon">🚪</span> Logout
          </a>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="admin-content" id="admin-main-content">
        ${renderActiveAdminTab(stats)}
      </main>
    </div>
  `;
}

function getAdminStats() {
  const menu = DB.getMenu();
  const reservations = DB.getReservations();
  const gallery = DB.getGallery();
  
  return {
    menuItems: menu.length,
    totalReservations: reservations.length,
    pendingReservations: reservations.filter(r => r.status === 'pending').length,
    confirmedReservations: reservations.filter(r => r.status === 'confirmed').length,
    galleryImages: gallery.length
  };
}

function renderActiveAdminTab(stats) {
  switch (adminActiveTab) {
    case 'menu':
      return renderAdminMenuManager();
    case 'reservations':
      return renderAdminReservations(stats);
    case 'events':
      return renderAdminEventsManager();
    case 'gallery':
      return renderAdminGalleryManager();
    case 'contact':
      return renderAdminContactSettings();
    case 'banner':
      return renderAdminBannerSettings();
    default:
      return renderAdminMenuManager();
  }
}

// ---- Tab Renderers ----

function renderAdminMenuManager() {
  const menu = DB.getMenu();
  const categories = ['Starters', 'Main Course', 'Indian Breads', 'Desserts', 'Beverages'];
  
  return `
    <div class="admin-content__header">
      <div>
        <h1 class="admin-content__title">Menu Manager</h1>
        <p class="admin-content__subtitle">Add, edit, or delete items on your digital menu.</p>
      </div>
    </div>

    <div class="admin-form-card">
      <h3 class="admin-form-card__title" id="menu-form-title">✨ Add New Menu Item</h3>
      <form id="admin-menu-form">
        <input type="hidden" id="menu-item-id" value="">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="menu-name">Item Name *</label>
            <input type="text" class="form-input" id="menu-name" placeholder="Paneer Butter Masala" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="menu-category">Category *</label>
            <select class="form-select form-input" id="menu-category" required>
              ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="menu-price">Price (e.g. ₹ 260) *</label>
            <input type="text" class="form-input" id="menu-price" placeholder="₹ 260" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="menu-image-file">Image Upload (Optional)</label>
            <input type="file" class="form-input" id="menu-image-file" accept="image/*">
            <input type="hidden" id="menu-image-data" value="">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="menu-desc">Description</label>
          <textarea class="form-textarea form-input" id="menu-desc" placeholder="Brief description of ingredients, flavor, spiciness..." rows="3"></textarea>
        </div>

        <div style="display: flex; gap: var(--space-md); justify-content: flex-end; margin-top: var(--space-md);">
          <button type="button" class="btn btn--outline" id="btn-cancel-menu-edit" style="display: none;">Cancel Edit</button>
          <button type="submit" class="btn btn--primary" id="btn-save-menu-item">💾 Save Menu Item</button>
        </div>
      </form>
    </div>

    <div style="margin-top: var(--space-2xl);">
      <h3 style="margin-bottom: var(--space-md);">Current Menu Items (${menu.length})</h3>
      
      <div class="admin-menu-list">
        ${menu.length === 0 ? '<p style="text-align: center; padding: var(--space-xl); color: var(--text-muted);">No items in the menu yet. Add some above!</p>' : ''}
        ${menu.map(item => `
          <div class="admin-menu-item">
            <div style="display: flex; align-items: center; gap: var(--space-md);">
              ${item.image ? `<img src="${item.image}" alt="" style="width: 50px; height: 50px; border-radius: var(--radius-sm); object-fit: cover;">` : `<div style="width: 50px; height: 50px; border-radius: var(--radius-sm); background: var(--border); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">🍽️</div>`}
              <div>
                <p class="admin-menu-item__name">${Utils.escapeHTML(item.name)}</p>
                <span class="admin-menu-item__category">${Utils.escapeHTML(item.category)}</span>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: var(--space-xl);">
              <span class="admin-menu-item__price">${Utils.escapeHTML(item.price)}</span>
              <div class="admin-menu-item__actions">
                <button class="admin-btn btn-edit-menu" data-id="${item.id}">✏️ Edit</button>
                <button class="admin-btn admin-btn--danger btn-delete-menu" data-id="${item.id}">🗑️ Delete</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAdminReservations(stats) {
  const list = DB.getReservations().reverse(); // Show newest first
  
  return `
    <div class="admin-content__header">
      <div>
        <h1 class="admin-content__title">Reservations Manager</h1>
        <p class="admin-content__subtitle">Manage booking requests and update reservation status.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="admin-stats">
      <div class="admin-stat">
        <div class="admin-stat__icon admin-stat__icon--accent">📅</div>
        <div>
          <h3 class="admin-stat__value">${stats.totalReservations}</h3>
          <p class="admin-stat__label">Total Bookings</p>
        </div>
      </div>
      <div class="admin-stat" style="border-left: 4px solid #FFB800;">
        <div class="admin-stat__icon" style="background: rgba(255, 184, 0, 0.1); color: #FFB800;">⏳</div>
        <div>
          <h3 class="admin-stat__value">${stats.pendingReservations}</h3>
          <p class="admin-stat__label">Pending</p>
        </div>
      </div>
      <div class="admin-stat" style="border-left: 4px solid #4CAF50;">
        <div class="admin-stat__icon" style="background: rgba(76, 175, 80, 0.1); color: #4CAF50;">✅</div>
        <div>
          <h3 class="admin-stat__value">${stats.confirmedReservations}</h3>
          <p class="admin-stat__label">Confirmed</p>
        </div>
      </div>
    </div>

    <!-- Reservations Table -->
    <div class="admin-table-wrapper">
      ${list.length === 0 ? `
        <div style="text-align: center; padding: var(--space-3xl); color: var(--text-muted);">
          <p style="font-size: 1.2rem; margin-bottom: var(--space-xs);">📬 No reservations yet</p>
          <p>Bookings made on the website will appear here in real time.</p>
        </div>
      ` : `
        <table class="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Date & Time</th>
              <th>Guests</th>
              <th>Requests</th>
              <th>Status</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(res => `
              <tr>
                <td>
                  <strong>${Utils.escapeHTML(res.name)}</strong><br>
                  <span style="font-size: 0.8rem; color: var(--text-muted);">${Utils.escapeHTML(res.phone)}</span><br>
                  <span style="font-size: 0.8rem; color: var(--text-muted);">${Utils.escapeHTML(res.email || 'No Email')}</span>
                </td>
                <td>
                  <strong>${Utils.formatDate(res.date)}</strong><br>
                  <span style="font-size: 0.8rem; color: var(--text-muted);">${Utils.formatTime(res.time)}</span>
                </td>
                <td>
                  <strong style="font-size: 1.1rem; color: var(--accent);">${res.guests}</strong> ${res.guests > 1 ? 'guests' : 'guest'}
                </td>
                <td>
                  <p style="max-width: 250px; font-size: 0.85rem; margin: 0; white-space: pre-wrap; overflow-wrap: break-word;">${res.request ? Utils.escapeHTML(res.request) : '<span style="color: var(--text-muted); font-style: italic;">None</span>'}</p>
                </td>
                <td>
                  <span class="status-badge status-badge--${res.status}">${res.status.toUpperCase()}</span>
                </td>
                <td style="text-align: right;">
                  <div style="display: flex; gap: var(--space-xs); justify-content: flex-end;">
                    ${res.status === 'pending' ? `
                      <button class="admin-btn admin-btn--success btn-approve-res" data-id="${res.id}">✓ Approve</button>
                      <button class="admin-btn admin-btn--danger btn-cancel-res" data-id="${res.id}">✕ Cancel</button>
                    ` : ''}
                    ${res.status === 'confirmed' ? `
                      <button class="admin-btn admin-btn--danger btn-cancel-res" data-id="${res.id}">✕ Cancel</button>
                    ` : ''}
                    ${res.status === 'cancelled' ? `
                      <button class="admin-btn admin-btn--success btn-approve-res" data-id="${res.id}">✓ Approve</button>
                    ` : ''}
                    <button class="admin-btn btn-delete-res" data-id="${res.id}" style="color: var(--text-muted);">🗑️ Delete</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `}
    </div>
  `;
}

function renderAdminEventsManager() {
  const events = DB.getEvents();
  
  return `
    <div class="admin-content__header">
      <div>
        <h1 class="admin-content__title">Events Manager</h1>
        <p class="admin-content__subtitle">Create and update promotional events and dining packages.</p>
      </div>
    </div>

    <div class="admin-form-card">
      <h3 class="admin-form-card__title" id="event-form-title">✨ Add New Event / Offer</h3>
      <form id="admin-event-form">
        <input type="hidden" id="event-id" value="">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="event-title">Event Title *</label>
            <input type="text" class="form-input" id="event-title" placeholder="Weekend Family Buffet" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="event-badge">Badge (e.g. Every Weekend) *</label>
            <input type="text" class="form-input" id="event-badge" placeholder="Every Weekend" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="event-icon">Icon Emoji *</label>
            <input type="text" class="form-input" id="event-icon" placeholder="🍽️" required>
          </div>
          <div class="form-group">
            <!-- Empty column for layout symmetry -->
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="event-desc">Event Description *</label>
          <textarea class="form-textarea form-input" id="event-desc" placeholder="Details of the buffet, timings, discounts, special attraction..." rows="3" required></textarea>
        </div>

        <div style="display: flex; gap: var(--space-md); justify-content: flex-end; margin-top: var(--space-md);">
          <button type="button" class="btn btn--outline" id="btn-cancel-event-edit" style="display: none;">Cancel Edit</button>
          <button type="submit" class="btn btn--primary" id="btn-save-event">💾 Save Event</button>
        </div>
      </form>
    </div>

    <div style="margin-top: var(--space-2xl);">
      <h3 style="margin-bottom: var(--space-md);">Current Events (${events.length})</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-lg);">
        ${events.map(ev => `
          <div class="admin-form-card" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-sm);">
                <span style="font-size: 1.5rem;">${Utils.escapeHTML(ev.icon)}</span>
                <h4 style="margin: 0;">${Utils.escapeHTML(ev.title)}</h4>
              </div>
              <span class="tag tag--gold" style="display: inline-block; margin-bottom: var(--space-md);">${Utils.escapeHTML(ev.badge)}</span>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">${Utils.escapeHTML(ev.description)}</p>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: var(--space-xs); border-top: 1px solid var(--divider); padding-top: var(--space-md); margin-top: var(--space-md);">
              <button class="admin-btn btn-edit-event" data-id="${ev.id}">✏️ Edit</button>
              <button class="admin-btn admin-btn--danger btn-delete-event" data-id="${ev.id}">🗑️ Delete</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAdminGalleryManager() {
  const gallery = DB.getGallery();
  
  return `
    <div class="admin-content__header">
      <div>
        <h1 class="admin-content__title">Gallery Manager</h1>
        <p class="admin-content__subtitle">Upload base64 photos or link URLs to populate your gallery grid.</p>
      </div>
    </div>

    <div class="admin-form-card">
      <h3 class="admin-form-card__title">✨ Add Image to Gallery</h3>
      <form id="admin-gallery-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="gal-caption">Image Caption / Name *</label>
            <input type="text" class="form-input" id="gal-caption" placeholder="Elegant Dining Hall" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="gal-category">Category *</label>
            <select class="form-select form-input" id="gal-category" required>
              <option value="Dining Area">Dining Area</option>
              <option value="Food Photography">Food Photography</option>
              <option value="Special Dishes">Special Dishes</option>
              <option value="Restaurant Exterior">Restaurant Exterior</option>
              <option value="Family Seating">Family Seating</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="gal-file">Upload Image File *</label>
            <input type="file" class="form-input" id="gal-file" accept="image/*" required>
            <input type="hidden" id="gal-image-data" value="">
          </div>
          <div class="form-group">
            <!-- empty for layout balance -->
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: var(--space-md);">
          <button type="submit" class="btn btn--primary">🖼️ Upload to Gallery</button>
        </div>
      </form>
    </div>

    <div style="margin-top: var(--space-2xl);">
      <h3 style="margin-bottom: var(--space-md);">Current Gallery Photos (${gallery.length})</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--space-md);">
        ${gallery.map(img => `
          <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border); aspect-ratio: 1; group;">
            <img src="${img.src}" alt="${Utils.escapeHTML(img.caption)}" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.7); padding: var(--space-xs); display: flex; flex-direction: column; justify-content: center; align-items: center;">
              <span style="font-size: 0.75rem; color: #fff; text-align: center; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; width: 100%;">${Utils.escapeHTML(img.caption)}</span>
              <span style="font-size: 0.65rem; color: var(--accent-gold); margin-bottom: var(--space-xs);">${Utils.escapeHTML(img.category)}</span>
              <button class="admin-btn admin-btn--danger btn-delete-gallery-img" data-id="${img.id}" style="width: 100%; font-size: 0.7rem; padding: 0.2rem 0;">🗑️ Delete</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAdminContactSettings() {
  const contact = DB.getContact();
  
  return `
    <div class="admin-content__header">
      <div>
        <h1 class="admin-content__title">Contact & Business Settings</h1>
        <p class="admin-content__subtitle">Update your phone numbers, opening hours, address, and Google Maps location.</p>
      </div>
    </div>

    <div class="admin-form-card">
      <h3 class="admin-form-card__title">⚙️ Business Contact Info</h3>
      <form id="admin-contact-form">
        <div class="form-group">
          <label class="form-label" for="con-address">Restaurant Address *</label>
          <input type="text" class="form-input" id="con-address" value="${Utils.escapeHTML(contact.address)}" required>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="con-phone">Phone Number (Display) *</label>
            <input type="text" class="form-input" id="con-phone" value="${Utils.escapeHTML(contact.phone)}" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="con-whatsapp">WhatsApp Number (e.g. +919876543210 - no spaces) *</label>
            <input type="text" class="form-input" id="con-whatsapp" value="${Utils.escapeHTML(contact.whatsapp)}" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="con-email">Email Address *</label>
            <input type="email" class="form-input" id="con-email" value="${Utils.escapeHTML(contact.email)}" required>
          </div>
          <div class="form-group">
            <!-- placeholder -->
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="con-lunch">Lunch Hours *</label>
            <input type="text" class="form-input" id="con-lunch" value="${Utils.escapeHTML(contact.lunchHours)}" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="con-dinner">Dinner Hours *</label>
            <input type="text" class="form-input" id="con-dinner" value="${Utils.escapeHTML(contact.dinnerHours)}" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="con-map">Google Maps Embed URL (src attribute of iframe) *</label>
          <textarea class="form-textarea form-input" id="con-map" rows="3" required>${Utils.escapeHTML(contact.mapEmbed)}</textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: var(--space-md);">
          <button type="submit" class="btn btn--primary">💾 Save Contact Settings</button>
        </div>
      </form>
    </div>
  `;
}

function renderAdminBannerSettings() {
  const settings = DB.getSettings();
  
  return `
    <div class="admin-content__header">
      <div>
        <h1 class="admin-content__title">Banner & Branding Settings</h1>
        <p class="admin-content__subtitle">Customize the home page hero section text and banner image.</p>
      </div>
    </div>

    <div class="admin-form-card">
      <h3 class="admin-form-card__title">⚙️ Hero Branding Settings</h3>
      <form id="admin-banner-form">
        <div class="form-group">
          <label class="form-label" for="ban-title">Hero Title Text *</label>
          <textarea class="form-textarea form-input" id="ban-title" rows="2" required>${Utils.escapeHTML(settings.heroTitle)}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label" for="ban-subtitle">Hero Subtitle Text *</label>
          <textarea class="form-textarea form-input" id="ban-subtitle" rows="3" required>${Utils.escapeHTML(settings.heroSubtitle)}</textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="ban-file">Hero Background Image</label>
            <input type="file" class="form-input" id="ban-file" accept="image/*">
            <input type="hidden" id="ban-image-data" value="">
          </div>
          <div class="form-group">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <span class="form-label" style="align-self: flex-start;">Current Banner Preview</span>
              <img src="${settings.heroImage}" alt="" id="ban-img-preview" style="max-height: 120px; width: 100%; object-fit: cover; border-radius: var(--radius-md); border: 1px solid var(--border); margin-top: 5px;">
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: var(--space-md);">
          <button type="submit" class="btn btn--primary">💾 Save Branding Settings</button>
        </div>
      </form>
    </div>

    <div class="admin-form-card mt-xl">
      <h3 class="admin-form-card__title" style="color: #E94560;">🔐 Change Administrator Password</h3>
      <form id="admin-password-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="pass-current">Current Password *</label>
            <input type="password" class="form-input" id="pass-current" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="pass-new">New Password *</label>
            <input type="password" class="form-input" id="pass-new" required>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: var(--space-md);">
          <button type="submit" class="btn btn--primary btn--danger">💾 Update Password</button>
        </div>
      </form>
    </div>
  `;
}

// ---- Initialization & Logic ----

function initAdminPage() {
  const loginForm = document.getElementById('admin-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const passInput = document.getElementById('login-pass');
      const errorDiv = document.getElementById('login-error-msg');
      const pass = passInput.value;
      
      if (pass === DB.getAdminPassword()) {
        DB.loginAdmin();
        Utils.showToast('Logged in successfully', '🔓');
        errorDiv.classList.remove('visible');
        
        // Re-render and initialize
        const appContainer = document.getElementById('app-content');
        if (appContainer) {
          appContainer.innerHTML = renderAdminPage();
          initAdminPage();
        }
      } else {
        errorDiv.classList.add('visible');
        passInput.focus();
        passInput.select();
      }
    });
    return;
  }
  
  // Tab Switching
  const tabs = document.querySelectorAll('.admin-sidebar__link[data-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      adminActiveTab = tab.dataset.tab;
      const appContainer = document.getElementById('app-content');
      if (appContainer) {
        appContainer.innerHTML = renderAdminPage();
        initAdminPage();
      }
    });
  });

  // Logout Button
  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      DB.logoutAdmin();
      Utils.showToast('Logged out successfully', '🚪');
      const appContainer = document.getElementById('app-content');
      if (appContainer) {
        appContainer.innerHTML = renderAdminPage();
        initAdminPage();
      }
    });
  }

  // --- Sub-Tab specific initialization ---
  
  if (adminActiveTab === 'menu') {
    initMenuManagerHandlers();
  } else if (adminActiveTab === 'reservations') {
    initReservationsHandlers();
  } else if (adminActiveTab === 'events') {
    initEventsHandlers();
  } else if (adminActiveTab === 'gallery') {
    initGalleryHandlers();
  } else if (adminActiveTab === 'contact') {
    initContactSettingsHandlers();
  } else if (adminActiveTab === 'banner') {
    initBannerSettingsHandlers();
  }
}

// ---- Event Handlers for Sub-Tabs ----

function initMenuManagerHandlers() {
  const form = document.getElementById('admin-menu-form');
  const fileInput = document.getElementById('menu-image-file');
  const hiddenImage = document.getElementById('menu-image-data');
  const cancelBtn = document.getElementById('btn-cancel-menu-edit');
  
  if (!form) return;

  // Handle image upload reader
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        hiddenImage.value = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Form submission (Add / Update)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemId = document.getElementById('menu-item-id').value;
    const name = document.getElementById('menu-name').value.trim();
    const category = document.getElementById('menu-category').value;
    const price = document.getElementById('menu-price').value.trim();
    const description = document.getElementById('menu-desc').value.trim();
    const image = hiddenImage.value;

    const items = DB.getMenu();

    if (itemId) {
      // Edit mode
      const idx = items.findIndex(item => item.id === itemId);
      if (idx !== -1) {
        // Retain original image if no new image uploaded
        const prevImage = items[idx].image;
        items[idx] = {
          id: itemId,
          name,
          category,
          price,
          description,
          image: image || prevImage
        };
        DB.setMenu(items);
        Utils.showToast('Menu item updated', '✓');
      }
    } else {
      // Add mode
      const newItem = {
        id: Date.now().toString(),
        name,
        category,
        price,
        description,
        image
      };
      items.push(newItem);
      DB.setMenu(items);
      Utils.showToast('Menu item added', '✓');
    }

    // Reset and reload
    adminRefresh();
  });

  // Cancel edit button
  cancelBtn?.addEventListener('click', () => {
    adminRefresh();
  });

  // Edit action
  document.querySelectorAll('.btn-edit-menu').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const items = DB.getMenu();
      const item = items.find(i => i.id === id);
      if (item) {
        document.getElementById('menu-item-id').value = item.id;
        document.getElementById('menu-name').value = item.name;
        document.getElementById('menu-category').value = item.category;
        document.getElementById('menu-price').value = item.price;
        document.getElementById('menu-desc').value = item.description;
        document.getElementById('menu-form-title').textContent = '✏️ Edit Menu Item';
        document.getElementById('btn-save-menu-item').textContent = '💾 Update Menu Item';
        cancelBtn.style.display = 'inline-block';
        
        // Scroll to form
        Utils.scrollTo('#admin-menu-form');
      }
    });
  });

  // Delete action
  document.querySelectorAll('.btn-delete-menu').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this menu item?')) {
        const id = btn.dataset.id;
        const items = DB.getMenu().filter(i => i.id !== id);
        DB.setMenu(items);
        Utils.showToast('Menu item deleted', '🗑️');
        adminRefresh();
      }
    });
  });
}

function initReservationsHandlers() {
  document.querySelectorAll('.btn-approve-res').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      DB.updateReservation(id, { status: 'confirmed' });
      Utils.showToast('Reservation approved', '✓');
      adminRefresh();
    });
  });

  document.querySelectorAll('.btn-cancel-res').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      DB.updateReservation(id, { status: 'cancelled' });
      Utils.showToast('Reservation cancelled', '✕');
      adminRefresh();
    });
  });

  document.querySelectorAll('.btn-delete-res').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to permanently delete this reservation?')) {
        const id = btn.dataset.id;
        DB.deleteReservation(id);
        Utils.showToast('Reservation deleted', '🗑️');
        adminRefresh();
      }
    });
  });
}

function initEventsHandlers() {
  const form = document.getElementById('admin-event-form');
  const cancelBtn = document.getElementById('btn-cancel-event-edit');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('event-id').value;
    const title = document.getElementById('event-title').value.trim();
    const badge = document.getElementById('event-badge').value.trim();
    const icon = document.getElementById('event-icon').value.trim();
    const description = document.getElementById('event-desc').value.trim();

    const events = DB.getEvents();

    if (id) {
      // Update
      const idx = events.findIndex(ev => ev.id === id);
      if (idx !== -1) {
        events[idx] = { id, title, badge, icon, description };
        DB.setEvents(events);
        Utils.showToast('Event updated', '✓');
      }
    } else {
      // Add
      events.push({
        id: Date.now().toString(),
        title,
        badge,
        icon,
        description
      });
      DB.setEvents(events);
      Utils.showToast('Event added', '✓');
    }

    adminRefresh();
  });

  cancelBtn?.addEventListener('click', () => {
    adminRefresh();
  });

  document.querySelectorAll('.btn-edit-event').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const events = DB.getEvents();
      const ev = events.find(e => e.id === id);
      if (ev) {
        document.getElementById('event-id').value = ev.id;
        document.getElementById('event-title').value = ev.title;
        document.getElementById('event-badge').value = ev.badge;
        document.getElementById('event-icon').value = ev.icon;
        document.getElementById('event-desc').value = ev.description;
        
        document.getElementById('event-form-title').textContent = '✏️ Edit Event';
        document.getElementById('btn-save-event').textContent = '💾 Update Event';
        cancelBtn.style.display = 'inline-block';
        
        Utils.scrollTo('#admin-event-form');
      }
    });
  });

  document.querySelectorAll('.btn-delete-event').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this event?')) {
        const id = btn.dataset.id;
        const events = DB.getEvents().filter(e => e.id !== id);
        DB.setEvents(events);
        Utils.showToast('Event deleted', '🗑️');
        adminRefresh();
      }
    });
  });
}

function initGalleryHandlers() {
  const form = document.getElementById('admin-gallery-form');
  const fileInput = document.getElementById('gal-file');
  const hiddenData = document.getElementById('gal-image-data');
  if (!form) return;

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        hiddenData.value = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const caption = document.getElementById('gal-caption').value.trim();
    const category = document.getElementById('gal-category').value;
    const src = hiddenData.value;

    if (!src) {
      Utils.showToast('Please select an image file', '⚠️');
      return;
    }

    const gallery = DB.getGallery();
    gallery.push({
      id: Date.now().toString(),
      src,
      caption,
      category
    });
    DB.setGallery(gallery);
    Utils.showToast('Image uploaded successfully', '🖼️');
    adminRefresh();
  });

  document.querySelectorAll('.btn-delete-gallery-img').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this photo from the gallery?')) {
        const id = btn.dataset.id;
        const gallery = DB.getGallery().filter(g => g.id !== id);
        DB.setGallery(gallery);
        Utils.showToast('Photo removed from gallery', '🗑️');
        adminRefresh();
      }
    });
  });
}

function initContactSettingsHandlers() {
  const form = document.getElementById('admin-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = document.getElementById('con-address').value.trim();
    const phone = document.getElementById('con-phone').value.trim();
    const whatsapp = document.getElementById('con-whatsapp').value.trim();
    const email = document.getElementById('con-email').value.trim();
    const lunchHours = document.getElementById('con-lunch').value.trim();
    const dinnerHours = document.getElementById('con-dinner').value.trim();
    const mapEmbed = document.getElementById('con-map').value.trim();

    DB.setContact({
      address,
      phone,
      whatsapp,
      email,
      lunchHours,
      dinnerHours,
      mapEmbed
    });

    Utils.showToast('Contact settings updated', '💾');
    adminRefresh();
  });
}

function initBannerSettingsHandlers() {
  const form = document.getElementById('admin-banner-form');
  const fileInput = document.getElementById('ban-file');
  const hiddenData = document.getElementById('ban-image-data');
  const preview = document.getElementById('ban-img-preview');
  
  if (form) {
    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          hiddenData.value = ev.target.result;
          preview.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const heroTitle = document.getElementById('ban-title').value.trim();
      const heroSubtitle = document.getElementById('ban-subtitle').value.trim();
      const heroImage = hiddenData.value || DB.getSettings().heroImage;

      DB.setSettings({
        adminPassword: DB.getAdminPassword(),
        heroTitle,
        heroSubtitle,
        heroImage
      });

      Utils.showToast('Branding settings updated', '💾');
      adminRefresh();
    });
  }

  // Password Update
  const passForm = document.getElementById('admin-password-form');
  if (passForm) {
    passForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = document.getElementById('pass-current').value;
      const newPass = document.getElementById('pass-new').value;

      if (current !== DB.getAdminPassword()) {
        Utils.showToast('Incorrect current password', '⚠️');
        return;
      }

      const settings = DB.getSettings();
      settings.adminPassword = newPass;
      DB.setSettings(settings);

      Utils.showToast('Admin password updated', '💾');
      passForm.reset();
    });
  }
}

// Refresh active tab views
function adminRefresh() {
  const appContainer = document.getElementById('app-content');
  if (appContainer) {
    appContainer.innerHTML = renderAdminPage();
    initAdminPage();
  }
}
