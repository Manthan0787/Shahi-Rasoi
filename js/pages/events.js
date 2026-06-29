/* =============================================
   EVENTS & SPECIAL OFFERS PAGE
   ============================================= */

function renderEventsPage() {
  const events = DB.getEvents();

  const eventImages = [
    { gradient: 'linear-gradient(135deg, #C8553D 0%, #D4A853 100%)', icon: '🍽️' },
    { gradient: 'linear-gradient(135deg, #E94560 0%, #FFD700 100%)', icon: '🎉' },
    { gradient: 'linear-gradient(135deg, #6B4F3A 0%, #C8553D 100%)', icon: '🎂' },
    { gradient: 'linear-gradient(135deg, #16213E 0%, #0F3460 100%)', icon: '💼' },
    { gradient: 'linear-gradient(135deg, #2C1810 0%, #D4A853 100%)', icon: '🎪' }
  ];

  return `
    <section class="section">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">What's Happening</span>
          <h1 class="section__title">Events & Special Offers</h1>
          <p class="section__subtitle">Join us for special dining events, festivals, and celebrations. There's always something exciting at Shahi Rasoi!</p>
        </div>

        <div class="events-grid">
          ${events.map((event, i) => {
            const img = eventImages[i] || eventImages[0];
            return `
              <div class="event-card reveal stagger-${i + 1}">
                <div class="event-card__image-wrapper">
                  <div class="event-card__image" style="background: ${img.gradient}; display: flex; align-items: center; justify-content: center; font-size: 4rem;">
                    ${event.icon || img.icon}
                  </div>
                  <span class="event-card__badge">${Utils.escapeHTML(event.badge)}</span>
                </div>
                <div class="event-card__body">
                  <h3 class="event-card__title">${Utils.escapeHTML(event.title)}</h3>
                  <p class="event-card__text">${Utils.escapeHTML(event.description)}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- CTA -->
        <div class="text-center mt-2xl reveal">
          <div class="cta-banner" style="max-width: 700px; margin: var(--space-3xl) auto 0;">
            <h3 class="cta-banner__title">Planning a Special Occasion?</h3>
            <p class="cta-banner__text">Let us make it memorable. Contact us to customize a package for your event.</p>
            <a href="#reservation" class="btn btn--gold btn--lg" data-nav="reservation">Book Now →</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
