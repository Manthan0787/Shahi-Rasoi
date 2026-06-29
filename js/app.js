/* =============================================
   APP CORE — SPA Router & Global Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  // ---- Current Route ----
  currentRoute: '',

  // ---- Page Renderers Registry ----
  routes: {
    'home': { render: renderHomePage, init: null },
    'about': { render: renderAboutPage, init: null },
    'menu': { render: renderMenuPage, init: initMenuPage },
    'reservation': { render: renderReservationPage, init: initReservationPage },
    'events': { render: renderEventsPage, init: null },
    'services': { render: renderServicesPage, init: null },
    'gallery': { render: renderGalleryPage, init: initGalleryPage },
    'reviews': { render: renderReviewsPage, init: null },
    'contact': { render: renderContactPage, init: initContactPage },
    'admin': { render: renderAdminPage, init: initAdminPage }
  },

  // ---- Initialize Application ----
  init() {
    // 1. Initial Theme Setup
    this.initTheme();

    // 2. Client Side Routing Setup
    window.addEventListener('hashchange', () => this.handleRouting());
    // Initial route check
    this.handleRouting();

    // 3. Setup Sticky Navbar & Top Floating Button Scroll Listeners
    window.addEventListener('scroll', Utils.debounce(() => this.handleScroll(), 20));
    this.handleScroll(); // Check immediately on load

    // 4. Setup Global UI Event Listeners
    this.setupGlobalListeners();

    // 5. Update Dynamic Contact Links (Call & WhatsApp Buttons)
    this.updateContactLinks();
  },

  // ---- Client-Side SPA Routing ----
  handleRouting() {
    // Retrieve hash, default to 'home'
    let hash = window.location.hash.substring(1) || 'home';
    
    // Normalize hash if it contains parameters or sub-routes
    // (our app currently uses simple hash routing: e.g., #menu, #reservation)
    if (!this.routes[hash]) {
      hash = 'home';
    }

    this.currentRoute = hash;

    // Render page
    const appContent = document.getElementById('app-content');
    if (appContent) {
      const page = this.routes[hash];
      
      // Inject page template
      appContent.innerHTML = page.render();
      
      // Run page-specific initialization if available
      if (page.init) {
        page.init();
      }

      // Initialize scroll animations for elements on the newly loaded page
      setTimeout(() => {
        Utils.initScrollReveal();
      }, 50);
    }

    // Scroll window to top smoothly
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update active nav links in header and mobile overlay
    this.updateActiveNavLinks(hash);

    // Close mobile menu if open
    this.closeMobileMenu();
  },

  // ---- Update Navigation Active States ----
  updateActiveNavLinks(route) {
    // Desktop Nav Links
    document.querySelectorAll('.navbar__link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${route}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Mobile Nav Links
    document.querySelectorAll('.mobile-menu__link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${route}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  // ---- Theme (Dark/Light) Management ----
  initTheme() {
    const savedTheme = DB.get(DB.KEYS.THEME) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeToggleIcon(savedTheme);
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    DB.set(DB.KEYS.THEME, newTheme);
    this.updateThemeToggleIcon(newTheme);
    Utils.showToast(`Theme changed to ${newTheme} mode`, newTheme === 'light' ? '☀️' : '🌙');
  },

  updateThemeToggleIcon(theme) {
    const toggles = document.querySelectorAll('.navbar__theme-toggle');
    toggles.forEach(toggle => {
      toggle.textContent = theme === 'light' ? '🌙' : '☀️';
      toggle.setAttribute('aria-label', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    });
  },

  // ---- Scroll Handlers (Sticky Nav & Top Button) ----
  handleScroll() {
    const navbar = document.querySelector('.navbar');
    const toTopBtn = document.querySelector('.floating-btn--top');

    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
      toTopBtn?.classList.add('visible');
    } else {
      toTopBtn?.classList.remove('visible');
    }
  },

  // ---- Setup Global Event Listeners ----
  setupGlobalListeners() {
    // Theme Toggle click
    document.querySelectorAll('.navbar__theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggleTheme());
    });

    // Hamburger Mobile Toggle click
    const hamburger = document.querySelector('.navbar__hamburger');
    hamburger?.addEventListener('click', () => this.toggleMobileMenu());

    // Back to top click
    const toTopBtn = document.querySelector('.floating-btn--top');
    toTopBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Handle standard anchor links that point to pages
    document.body.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[data-nav]');
      if (anchor) {
        e.preventDefault();
        const dest = anchor.getAttribute('data-nav');
        window.location.hash = `#${dest}`;
      }
    });
  },

  // ---- Mobile Overlay Management ----
  toggleMobileMenu() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    const isOpen = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active', isOpen);
    
    // Prevent background scrolling when mobile menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  },

  closeMobileMenu() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburger?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    document.body.style.overflow = '';
  },

  // ---- Sync Floating Buttons with Database Settings ----
  updateContactLinks() {
    const contact = DB.getContact();
    
    // WhatsApp Button
    const waBtn = document.querySelector('.floating-btn--whatsapp');
    if (waBtn && contact.whatsapp) {
      waBtn.href = `https://wa.me/${contact.whatsapp.replace(/\+/g, '')}`;
    }

    // Call Button
    const callBtn = document.querySelector('.floating-btn--call');
    if (callBtn && contact.phone) {
      callBtn.href = `tel:${contact.phone.replace(/\s/g, '')}`;
    }
  }
};
