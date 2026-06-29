/* =============================================
   MENU PAGE
   ============================================= */

function renderMenuPage() {
  const menu = DB.getMenu();
  const categories = [...new Set(menu.map(item => item.category))];

  return `
    <section class="section">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">Our Menu</span>
          <h1 class="section__title">Delicious Offerings</h1>
          <p class="section__subtitle">Explore our carefully curated menu featuring authentic Indian cuisine, from sizzling starters to heavenly desserts.</p>
        </div>

        <!-- Category Tabs -->
        <div class="tabs reveal" id="menu-tabs">
          <button class="tab active" data-category="all">All Items</button>
          ${categories.map(cat => `
            <button class="tab" data-category="${Utils.escapeHTML(cat)}">${Utils.escapeHTML(cat)}</button>
          `).join('')}
        </div>

        <!-- Menu Grid -->
        <div class="menu-grid" id="menu-grid">
          ${menu.map((item, i) => `
            <div class="menu-card reveal stagger-${(i % 8) + 1}" data-category="${Utils.escapeHTML(item.category)}">
              <div class="menu-card__image-wrapper">
                <img src="${Utils.imgSrc(item.image, item.name, getCategoryHue(item.category))}" alt="${Utils.escapeHTML(item.name)}" class="menu-card__image" loading="lazy">
                <span class="menu-card__category">${Utils.escapeHTML(item.category)}</span>
              </div>
              <div class="menu-card__body">
                <h3 class="menu-card__name">${Utils.escapeHTML(item.name)}</h3>
                <p class="menu-card__desc">${Utils.escapeHTML(item.description)}</p>
                <div class="menu-card__footer">
                  <span class="menu-card__price">${Utils.escapeHTML(item.price)}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <p class="text-center text-muted mt-2xl reveal" style="font-size: var(--fs-small); font-style: italic;">
          * Prices are subject to change. Please contact us for the latest pricing. All prices inclusive of taxes.
        </p>
      </div>
    </section>
  `;
}

function getCategoryHue(category) {
  const hues = {
    'Starters': 30,
    'Main Course': 15,
    'Indian Breads': 40,
    'Desserts': 340,
    'Beverages': 180
  };
  return hues[category] || 25;
}

function initMenuPage() {
  const tabs = document.querySelectorAll('#menu-tabs .tab');
  const cards = document.querySelectorAll('#menu-grid .menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.category;

      // Filter cards
      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          // Re-trigger animation
          card.classList.remove('visible');
          requestAnimationFrame(() => {
            card.classList.add('visible');
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
