/* =============================================
   CONTACT PAGE
   ============================================= */

function renderContactPage() {
  const contact = DB.getContact();

  return `
    <section class="section">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">Get In Touch</span>
          <h1 class="section__title">Contact Us</h1>
          <p class="section__subtitle">We'd love to hear from you. Reach out to us for reservations, inquiries, or feedback.</p>
        </div>

        <div class="contact-layout">
          <!-- Contact Info -->
          <div class="reveal-left">
            <div class="contact-info-card">
              <div class="contact-info__item">
                <div class="contact-info__icon">📍</div>
                <div>
                  <p class="contact-info__label">Address</p>
                  <p class="contact-info__value">${Utils.escapeHTML(contact.address)}</p>
                </div>
              </div>

              <div class="contact-info__item">
                <div class="contact-info__icon">📞</div>
                <div>
                  <p class="contact-info__label">Phone</p>
                  <p class="contact-info__value">
                    <a href="tel:${contact.phone.replace(/\s/g, '')}" style="color: var(--accent); text-decoration: none;">${Utils.escapeHTML(contact.phone)}</a>
                  </p>
                </div>
              </div>

              <div class="contact-info__item">
                <div class="contact-info__icon">✉️</div>
                <div>
                  <p class="contact-info__label">Email</p>
                  <p class="contact-info__value">
                    <a href="mailto:${contact.email}" style="color: var(--accent); text-decoration: none;">${Utils.escapeHTML(contact.email)}</a>
                  </p>
                </div>
              </div>

              <div class="contact-info__item">
                <div class="contact-info__icon">🕐</div>
                <div>
                  <p class="contact-info__label">Business Hours</p>
                  <p class="contact-info__value">
                    <strong>Lunch:</strong> ${Utils.escapeHTML(contact.lunchHours)}<br>
                    <strong>Dinner:</strong> ${Utils.escapeHTML(contact.dinnerHours)}
                  </p>
                </div>
              </div>
            </div>

            <!-- Quick Contact Form -->
            <div class="contact-info-card mt-xl">
              <h3 style="font-family: var(--font-accent); font-size: var(--fs-h4); margin-bottom: var(--space-lg);">Send us a Message</h3>
              <form id="contact-form">
                <div class="form-group">
                  <label class="form-label" for="contact-name">Your Name</label>
                  <input type="text" class="form-input" id="contact-name" placeholder="Enter your name" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-message">Message</label>
                  <textarea class="form-textarea form-input" id="contact-message" placeholder="Type your message..." rows="4" required></textarea>
                </div>
                <button type="submit" class="btn btn--primary" style="width: 100%;">Send Message</button>
              </form>
            </div>
          </div>

          <!-- Google Maps -->
          <div class="reveal-right">
            <div class="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.7!2d74.1853!3d17.2867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1819d60a0a7a3%3A0x3bef0!2sKarad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Shahi Rasoi Restaurant Location">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function initContactPage() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-name').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    if (!name || !message) {
      Utils.showToast('Please fill in all fields', '⚠️');
      return;
    }

    // Store message (could be sent via email API in production)
    const messages = DB.get('shahi_messages') || [];
    messages.push({
      id: Utils.uid(),
      name,
      message,
      createdAt: new Date().toISOString()
    });
    DB.set('shahi_messages', messages);

    Utils.showToast('Message sent successfully! We\'ll get back to you soon.', '✓');
    form.reset();
  });
}
