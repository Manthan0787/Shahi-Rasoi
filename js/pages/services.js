/* =============================================
   SERVICES PAGE
   ============================================= */

function renderServicesPage() {
  const services = [
    {
      icon: '🍽️',
      title: 'Service Options',
      items: ['Dine-In', 'Takeaway']
    },
    {
      icon: '🥘',
      title: 'Offerings',
      items: ['All You Can Eat', 'Small Plates']
    },
    {
      icon: '🕐',
      title: 'Dining Options',
      items: ['Lunch', 'Dinner', 'Table Service']
    },
    {
      icon: '🏠',
      title: 'Atmosphere',
      items: ['Casual', 'Family Friendly', 'Comfortable Seating']
    },
    {
      icon: '👥',
      title: 'Crowd',
      items: ['Family Groups', 'Friends Gatherings', 'Corporate Groups']
    },
    {
      icon: '🅿️',
      title: 'Parking',
      items: ['Free Street Parking', 'Easy Highway Access']
    }
  ];

  return `
    <section class="section">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">What We Offer</span>
          <h1 class="section__title">Our Services & Facilities</h1>
          <p class="section__subtitle">Everything you need for a comfortable and enjoyable dining experience.</p>
        </div>

        <div class="services-grid">
          ${services.map((service, i) => `
            <div class="icon-card reveal stagger-${i + 1}">
              <div class="icon-card__icon">${service.icon}</div>
              <h3 class="icon-card__title">${Utils.escapeHTML(service.title)}</h3>
              <ul class="icon-card__list">
                ${service.items.map(item => `
                  <li class="icon-card__list-item">${Utils.escapeHTML(item)}</li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Additional Info -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">At Your Service</span>
          <h2 class="section__title">We Cater to Every Need</h2>
        </div>
        <div class="grid-3 gap-xl" style="max-width: 900px; margin: 0 auto;">
          <div class="text-center reveal stagger-1">
            <span style="font-size: 3rem; display: block; margin-bottom: var(--space-md);">🎊</span>
            <h4 style="font-family: var(--font-accent); margin-bottom: var(--space-sm);">Private Events</h4>
            <p class="text-muted" style="font-size: var(--fs-small);">Dedicated space for your private celebrations and gatherings</p>
          </div>
          <div class="text-center reveal stagger-2">
            <span style="font-size: 3rem; display: block; margin-bottom: var(--space-md);">📦</span>
            <h4 style="font-family: var(--font-accent); margin-bottom: var(--space-sm);">Bulk Orders</h4>
            <p class="text-muted" style="font-size: var(--fs-small);">Large quantity orders for functions, meetings, and events</p>
          </div>
          <div class="text-center reveal stagger-3">
            <span style="font-size: 3rem; display: block; margin-bottom: var(--space-md);">🧒</span>
            <h4 style="font-family: var(--font-accent); margin-bottom: var(--space-sm);">Kids Welcome</h4>
            <p class="text-muted" style="font-size: var(--fs-small);">Child-friendly menu options and comfortable seating for families</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
