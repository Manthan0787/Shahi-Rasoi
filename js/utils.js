/* =============================================
   UTILITIES — Scroll Observer, Formatters, Helpers
   ============================================= */

const Utils = {
  // ---- Scroll Reveal (IntersectionObserver) ----
  initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Don't unobserve — allows re-animation if desired
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el);
    });

    return observer;
  },

  // ---- Generate Unique ID ----
  uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  },

  // ---- Format Date ----
  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  // ---- Format Time ----
  formatTime(timeStr) {
    const [h, m] = timeStr.split(':');
    const hr = parseInt(h);
    const ampm = hr >= 12 ? 'PM' : 'AM';
    const hr12 = hr % 12 || 12;
    return `${hr12}:${m} ${ampm}`;
  },

  // ---- Today's Date (for min attribute) ----
  getTodayISO() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  },

  // ---- Debounce ----
  debounce(fn, delay = 200) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  // ---- Escape HTML ----
  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // ---- Generate Stars HTML ----
  starsHTML(count) {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  },

  // ---- Smooth Scroll To Element ----
  scrollTo(selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  // ---- Create placeholder gradient image ----
  placeholderGradient(text, hue = 25) {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 800, 500);
    grad.addColorStop(0, `hsl(${hue}, 40%, 25%)`);
    grad.addColorStop(0.5, `hsl(${hue + 20}, 45%, 30%)`);
    grad.addColorStop(1, `hsl(${hue + 40}, 50%, 20%)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 500);

    // Decorative circles
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * 800,
        Math.random() * 500,
        Math.random() * 80 + 40,
        0, Math.PI * 2
      );
      ctx.fillStyle = `hsla(${hue + 15}, 60%, 50%, 0.08)`;
      ctx.fill();
    }

    // Text
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '600 28px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 400, 250);

    return canvas.toDataURL('image/jpeg', 0.8);
  },

  // ---- Show Toast Notification ----
  showToast(message, icon = '✓') {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `<span class="toast__icon">${icon}</span><span class="toast__message"></span>`;
      document.body.appendChild(toast);
    }
    toast.querySelector('.toast__icon').textContent = icon;
    toast.querySelector('.toast__message').textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  },

  // ---- Image with fallback ----
  imgSrc(src, fallbackText, hue) {
    if (src && src.trim() !== '') return src;
    return this.placeholderGradient(fallbackText || 'Image', hue || Math.random() * 360);
  }
};
