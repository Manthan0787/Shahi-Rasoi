/* =============================================
   RESERVATION PAGE
   ============================================= */

function renderReservationPage() {
  const contact = DB.getContact();

  return `
    <section class="section">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">Book a Table</span>
          <h1 class="section__title">Reserve Your Table</h1>
          <p class="section__subtitle">Secure your spot for a memorable dining experience. Fill in the details below and we'll confirm your reservation.</p>
        </div>

        <div class="reservation-layout">
          <!-- Form -->
          <div class="reservation-form-card reveal-left">
            <form id="reservation-form" novalidate>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="res-name">Full Name *</label>
                  <input type="text" class="form-input" id="res-name" name="name" placeholder="Enter your full name" required>
                  <p class="form-error">Please enter your name</p>
                </div>
                <div class="form-group">
                  <label class="form-label" for="res-phone">Phone Number *</label>
                  <input type="tel" class="form-input" id="res-phone" name="phone" placeholder="+91 98765 43210" required>
                  <p class="form-error">Please enter a valid phone number</p>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="res-email">Email Address</label>
                <input type="email" class="form-input" id="res-email" name="email" placeholder="your@email.com">
                <p class="form-error">Please enter a valid email</p>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="res-date">Preferred Date *</label>
                  <input type="date" class="form-input" id="res-date" name="date" min="${Utils.getTodayISO()}" required>
                  <p class="form-error">Please select a date</p>
                </div>
                <div class="form-group">
                  <label class="form-label" for="res-time">Preferred Time *</label>
                  <select class="form-select form-input" id="res-time" name="time" required>
                    <option value="">Select a time</option>
                    <optgroup label="Lunch (11 AM – 4 PM)">
                      <option value="11:00">11:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="14:30">2:30 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="15:30">3:30 PM</option>
                    </optgroup>
                    <optgroup label="Dinner (6 PM – 11 PM)">
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="21:30">9:30 PM</option>
                      <option value="22:00">10:00 PM</option>
                    </optgroup>
                  </select>
                  <p class="form-error">Please select a time</p>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="res-guests">Number of Guests *</label>
                <select class="form-select form-input" id="res-guests" name="guests" required>
                  <option value="">Select number of guests</option>
                  ${Array.from({length: 20}, (_, i) => `<option value="${i+1}">${i+1} ${i === 0 ? 'Guest' : 'Guests'}</option>`).join('')}
                </select>
                <p class="form-error">Please select number of guests</p>
              </div>

              <div class="form-group">
                <label class="form-label" for="res-request">Special Request</label>
                <textarea class="form-textarea form-input" id="res-request" name="request" placeholder="Birthday celebration, dietary requirements, seating preference..." rows="4"></textarea>
              </div>

              <button type="submit" class="btn btn--primary btn--lg" style="width: 100%;">
                ✨ Confirm Reservation
              </button>
            </form>
          </div>

          <!-- Info Side -->
          <div class="reservation-info reveal-right">
            <img src="${Utils.imgSrc('assets/images/restaurant-interior.png', 'Dining Ambiance', 25)}" alt="Restaurant Dining Area" class="reservation-info__image" loading="lazy">

            <div class="reservation-info__card">
              <div class="reservation-info__item">
                <span class="reservation-info__icon">📍</span>
                <p class="reservation-info__text">
                  <strong>Location</strong>
                  ${Utils.escapeHTML(contact.address)}
                </p>
              </div>
              <div class="reservation-info__item">
                <span class="reservation-info__icon">🕐</span>
                <p class="reservation-info__text">
                  <strong>Lunch Hours</strong>
                  ${Utils.escapeHTML(contact.lunchHours)}
                </p>
              </div>
              <div class="reservation-info__item">
                <span class="reservation-info__icon">🌙</span>
                <p class="reservation-info__text">
                  <strong>Dinner Hours</strong>
                  ${Utils.escapeHTML(contact.dinnerHours)}
                </p>
              </div>
              <div class="reservation-info__item">
                <span class="reservation-info__icon">📞</span>
                <p class="reservation-info__text">
                  <strong>Call Us</strong>
                  ${Utils.escapeHTML(contact.phone)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Modal -->
    <div class="modal-overlay" id="reservation-success-modal">
      <div class="modal">
        <button class="modal__close" id="modal-close-btn">✕</button>
        <div class="modal__icon modal__icon--success">✓</div>
        <h3 class="modal__title">Reservation Confirmed!</h3>
        <p class="modal__text" id="modal-details">Your table has been reserved successfully. We look forward to serving you!</p>
        <button class="btn btn--primary" id="modal-ok-btn">Wonderful!</button>
      </div>
    </div>
  `;
}

function initReservationPage() {
  const form = document.getElementById('reservation-form');
  const modal = document.getElementById('reservation-success-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const okBtn = document.getElementById('modal-ok-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

    // Validate
    let valid = true;
    const fields = {
      name: form.querySelector('#res-name'),
      phone: form.querySelector('#res-phone'),
      date: form.querySelector('#res-date'),
      time: form.querySelector('#res-time'),
      guests: form.querySelector('#res-guests')
    };

    if (!fields.name.value.trim()) { fields.name.closest('.form-group').classList.add('error'); valid = false; }
    if (!fields.phone.value.trim() || fields.phone.value.trim().length < 10) { fields.phone.closest('.form-group').classList.add('error'); valid = false; }
    if (!fields.date.value) { fields.date.closest('.form-group').classList.add('error'); valid = false; }
    if (!fields.time.value) { fields.time.closest('.form-group').classList.add('error'); valid = false; }
    if (!fields.guests.value) { fields.guests.closest('.form-group').classList.add('error'); valid = false; }

    // Email validation (optional field)
    const email = form.querySelector('#res-email');
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.closest('.form-group').classList.add('error');
      valid = false;
    }

    if (!valid) {
      Utils.showToast('Please fill in all required fields', '⚠️');
      return;
    }

    // Save reservation
    const reservation = DB.addReservation({
      name: fields.name.value.trim(),
      phone: fields.phone.value.trim(),
      email: email.value.trim(),
      date: fields.date.value,
      time: fields.time.value,
      guests: fields.guests.value,
      request: form.querySelector('#res-request').value.trim()
    });

    // Show success modal
    const details = document.getElementById('modal-details');
    details.innerHTML = `
      <strong>${Utils.escapeHTML(reservation.name)}</strong>, your table for 
      <strong>${reservation.guests} guest${reservation.guests > 1 ? 's' : ''}</strong> is reserved on 
      <strong>${Utils.formatDate(reservation.date)}</strong> at 
      <strong>${Utils.formatTime(reservation.time)}</strong>.<br><br>
      We look forward to serving you!
    `;
    modal.classList.add('active');
    form.reset();
  });

  // Close modal
  const closeModal = () => modal.classList.remove('active');
  closeBtn?.addEventListener('click', closeModal);
  okBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}
