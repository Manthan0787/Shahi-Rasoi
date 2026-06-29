/* =============================================
   REVIEWS / TESTIMONIALS PAGE
   ============================================= */

function renderReviewsPage() {
  const reviews = DEFAULT_DATA.reviews;

  return `
    <section class="section">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">Testimonials</span>
          <h1 class="section__title">What Our Guests Say</h1>
          <p class="section__subtitle">Real experiences from real guests. We're proud of every review we receive.</p>
        </div>

        <!-- Reviews Grid -->
        <div class="reviews-grid">
          ${reviews.map((review, i) => `
            <div class="testimonial-card reveal stagger-${i + 1}">
              <div class="stars">${Utils.starsHTML(review.rating)}</div>
              <p class="testimonial-card__quote">${Utils.escapeHTML(review.text)}</p>
              <div style="display: flex; align-items: center; gap: var(--space-md); margin-top: var(--space-lg);">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--gradient-accent); display: flex; align-items: center; justify-content: center; color: white; font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; flex-shrink: 0;">
                  ${review.author.charAt(0)}
                </div>
                <div>
                  <p class="testimonial-card__author">${Utils.escapeHTML(review.author)}</p>
                  <p class="testimonial-card__role">${Utils.escapeHTML(review.role)}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Rating Summary -->
        <div class="reveal mt-2xl" style="max-width: 500px; margin-left: auto; margin-right: auto;">
          <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: var(--space-2xl); text-align: center;">
            <div style="font-size: 3.5rem; font-family: var(--font-heading); font-weight: 800; color: var(--accent-gold); line-height: 1;">5.0</div>
            <div class="stars" style="font-size: 1.5rem; margin: var(--space-md) 0;">★★★★★</div>
            <p class="text-muted" style="margin-bottom: 0; font-size: var(--fs-small);">Based on ${reviews.length} guest reviews</p>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-2xl reveal">
          <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">Had a great experience? We'd love to hear from you!</p>
          <a href="#reservation" class="btn btn--primary" data-nav="reservation">Reserve Your Table →</a>
        </div>
      </div>
    </section>
  `;
}
