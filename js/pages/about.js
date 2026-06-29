/* =============================================
   ABOUT PAGE
   ============================================= */

function renderAboutPage() {
  return `
    <section class="section">
      <div class="container">
        <div class="about-hero">
          <div class="reveal-left">
            <span class="about-hero__subtitle">Our Story</span>
            <h1 class="about-hero__title">A Legacy of Taste & Tradition</h1>
            <p class="about-hero__text">
              Shahi Rasoi is an established family-friendly dining destination on the bustling Pune-Bengaluru Highway in Karad, Maharashtra. We've been serving delicious food and creating memorable dining experiences for families, travelers, and groups for years.
            </p>
            <p class="about-hero__text">
              Our convenient highway location makes us the perfect pit-stop for long-distance travelers, while our warm atmosphere and quality service have made us a favorite among local families and food enthusiasts.
            </p>
            <p class="about-hero__text">
              We believe in using only the freshest ingredients, prepared with love and served with genuine hospitality. From our signature Paneer Butter Masala to our aromatic Veg Biryani, every dish tells a story of culinary passion.
            </p>

            <div class="about-features">
              <div class="about-feature">
                <div class="about-feature__icon">🏪</div>
                <div>
                  <h4 class="about-feature__title">Established Legacy</h4>
                  <p class="about-feature__text">Years of serving authentic flavors</p>
                </div>
              </div>
              <div class="about-feature">
                <div class="about-feature__icon">🛣️</div>
                <div>
                  <h4 class="about-feature__title">Highway Location</h4>
                  <p class="about-feature__text">Pune-Bengaluru Hwy, Karad</p>
                </div>
              </div>
              <div class="about-feature">
                <div class="about-feature__icon">🌿</div>
                <div>
                  <h4 class="about-feature__title">Fresh Ingredients</h4>
                  <p class="about-feature__text">Locally sourced, daily fresh</p>
                </div>
              </div>
              <div class="about-feature">
                <div class="about-feature__icon">💺</div>
                <div>
                  <h4 class="about-feature__title">Comfortable Dining</h4>
                  <p class="about-feature__text">Spacious seating for all groups</p>
                </div>
              </div>
            </div>
          </div>
          <div class="reveal-right">
            <img src="${Utils.imgSrc('assets/images/restaurant-interior.png', 'Restaurant Interior', 30)}" alt="Shahi Rasoi Interior" class="about-hero__image" loading="lazy">
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">Why Choose Us</span>
          <h2 class="section__title">The Shahi Rasoi Difference</h2>
          <p class="section__subtitle">What makes us the preferred dining destination on the highway.</p>
        </div>
        <div class="grid-3 gap-xl">
          <div class="icon-card reveal stagger-1">
            <div class="icon-card__icon">🍳</div>
            <h3 class="icon-card__title">Authentic Recipes</h3>
            <p class="card__text">Time-tested recipes passed down through generations, preserving the authentic taste of Maharashtra and North Indian cuisine.</p>
          </div>
          <div class="icon-card reveal stagger-2">
            <div class="icon-card__icon">⚡</div>
            <h3 class="icon-card__title">Quick Service</h3>
            <p class="card__text">We understand you're on a journey. Our efficient kitchen ensures fresh, hot meals served promptly without compromising quality.</p>
          </div>
          <div class="icon-card reveal stagger-3">
            <div class="icon-card__icon">🧹</div>
            <h3 class="icon-card__title">Spotless Hygiene</h3>
            <p class="card__text">Our restaurant and kitchen maintain the highest standards of cleanliness and food safety, ensuring peace of mind for every guest.</p>
          </div>
          <div class="icon-card reveal stagger-4">
            <div class="icon-card__icon">🅿️</div>
            <h3 class="icon-card__title">Ample Parking</h3>
            <p class="card__text">Free and spacious parking area for cars, buses, and trucks. Easy highway access makes stopping convenient and stress-free.</p>
          </div>
          <div class="icon-card reveal stagger-5">
            <div class="icon-card__icon">💰</div>
            <h3 class="icon-card__title">Value for Money</h3>
            <p class="card__text">Generous portions at fair prices. We believe great food shouldn't break the bank — quality dining for every budget.</p>
          </div>
          <div class="icon-card reveal stagger-6">
            <div class="icon-card__icon">🤝</div>
            <h3 class="icon-card__title">Warm Hospitality</h3>
            <p class="card__text">Our staff treats every guest like family. From the moment you walk in until you leave, you'll feel genuinely welcome and cared for.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
