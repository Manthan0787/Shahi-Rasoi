/* =============================================
   HOME PAGE
   ============================================= */

function renderHomePage() {
  const settings = DB.getSettings();
  const menu = DB.getMenu();
  const featured = menu.filter(item => ['Paneer Butter Masala', 'Veg Biryani', 'Gulab Jamun', 'Paneer Chilli'].includes(item.name));
  const reviews = DEFAULT_DATA.reviews;

  return `
    <!-- Hero Section -->
    <section class="hero" id="hero">
      <img src="${Utils.imgSrc(settings.heroImage, 'Shahi Rasoi')}" alt="Shahi Rasoi Restaurant" class="hero__background" loading="eager">
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <span class="hero__label">Welcome to Shahi Rasoi</span>
        <h1 class="hero__title">${Utils.escapeHTML(settings.heroTitle)}</h1>
        <p class="hero__subtitle">${Utils.escapeHTML(settings.heroSubtitle)}</p>
        <div class="hero__buttons">
          <a href="#reservation" class="btn btn--primary btn--lg" data-nav="reservation">
            🍽️ Reserve Table
          </a>
          <a href="#menu" class="btn btn--secondary btn--lg" data-nav="menu">
            📋 View Menu
          </a>
        </div>
      </div>
      <div class="hero__scroll-indicator">Scroll to Explore</div>
    </section>

    <!-- Highlights -->
    <section class="section">
      <div class="container">
        <div class="highlights">
          <div class="highlight-card reveal stagger-1">
            <span class="highlight-card__icon">🌿</span>
            <h3 class="highlight-card__title">Fresh Ingredients</h3>
            <p class="highlight-card__text">Locally sourced, premium quality ingredients in every dish</p>
          </div>
          <div class="highlight-card reveal stagger-2">
            <span class="highlight-card__icon">👨‍👩‍👧‍👦</span>
            <h3 class="highlight-card__title">Family Friendly</h3>
            <p class="highlight-card__text">Warm atmosphere perfect for families and children</p>
          </div>
          <div class="highlight-card reveal stagger-3">
            <span class="highlight-card__icon">🛣️</span>
            <h3 class="highlight-card__title">Highway Oasis</h3>
            <p class="highlight-card__text">Convenient stop on the Pune-Bengaluru Highway</p>
          </div>
          <div class="highlight-card reveal stagger-4">
            <span class="highlight-card__icon">⭐</span>
            <h3 class="highlight-card__title">Top Rated</h3>
            <p class="highlight-card__text">Loved by travelers and locals alike</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Dishes -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">Our Specialties</span>
          <h2 class="section__title">Signature Dishes</h2>
          <p class="section__subtitle">Hand-crafted with love, served with pride. Discover our most-loved dishes.</p>
        </div>
        <div class="featured-dishes">
          ${featured.map((item, i) => `
            <div class="menu-card reveal stagger-${i + 1}">
              <div class="menu-card__image-wrapper">
                <img src="${Utils.imgSrc(item.image, item.name, 20 + i * 30)}" alt="${Utils.escapeHTML(item.name)}" class="menu-card__image" loading="lazy">
                <span class="menu-card__category">${Utils.escapeHTML(item.category)}</span>
              </div>
              <div class="menu-card__body">
                <h3 class="menu-card__name">${Utils.escapeHTML(item.name)}</h3>
                <p class="menu-card__desc">${Utils.escapeHTML(item.description)}</p>
                <div class="menu-card__footer">
                  <span class="menu-card__price">${Utils.escapeHTML(item.price)}</span>
                  <span class="tag tag--gold">Popular</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-2xl reveal">
          <a href="#menu" class="btn btn--outline" data-nav="menu">Explore Full Menu →</a>
        </div>
      </div>
    </section>

    <!-- Testimonial Preview -->
    <section class="section">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">What Guests Say</span>
          <h2 class="section__title">Guest Experiences</h2>
        </div>
        <div class="reviews-grid" style="max-width: 900px; margin: 0 auto;">
          ${reviews.slice(0, 2).map((review, i) => `
            <div class="testimonial-card reveal stagger-${i + 1}">
              <div class="stars">${Utils.starsHTML(review.rating)}</div>
              <p class="testimonial-card__quote">${Utils.escapeHTML(review.text)}</p>
              <p class="testimonial-card__author">${Utils.escapeHTML(review.author)}</p>
              <p class="testimonial-card__role">${Utils.escapeHTML(review.role)}</p>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-2xl reveal">
          <a href="#reviews" class="btn btn--outline btn--sm" data-nav="reviews">Read All Reviews →</a>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="section">
      <div class="container">
        <div class="cta-banner reveal-scale">
          <h2 class="cta-banner__title">Book Your Table Today</h2>
          <p class="cta-banner__text">Reserve your spot for an unforgettable dining experience with family and friends.</p>
          <a href="#reservation" class="btn btn--gold btn--lg" data-nav="reservation">Make a Reservation →</a>
        </div>
      </div>
    </section>
  `;
}
