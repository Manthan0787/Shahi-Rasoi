/* =============================================
   DATA LAYER — Default Data & LocalStorage Helpers
   ============================================= */

const DB = {
  // ---- Keys ----
  KEYS: {
    MENU: 'pankaj_menu',
    RESERVATIONS: 'pankaj_reservations',
    EVENTS: 'pankaj_events',
    GALLERY: 'pankaj_gallery',
    CONTACT: 'pankaj_contact',
    SETTINGS: 'pankaj_settings',
    ADMIN_AUTH: 'pankaj_admin_auth',
    THEME: 'pankaj_theme'
  },

  // ---- LocalStorage Helpers ----
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading localStorage:', e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error writing localStorage:', e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  // ---- Initialize with Defaults ----
  init() {
    // Only seed if data doesn't exist yet
    if (!this.get(this.KEYS.MENU)) {
      this.set(this.KEYS.MENU, DEFAULT_DATA.menu);
    }
    if (!this.get(this.KEYS.RESERVATIONS)) {
      this.set(this.KEYS.RESERVATIONS, []);
    }
    if (!this.get(this.KEYS.EVENTS)) {
      this.set(this.KEYS.EVENTS, DEFAULT_DATA.events);
    }
    if (!this.get(this.KEYS.GALLERY)) {
      this.set(this.KEYS.GALLERY, DEFAULT_DATA.gallery);
    }
    if (!this.get(this.KEYS.CONTACT)) {
      this.set(this.KEYS.CONTACT, DEFAULT_DATA.contact);
    }
    if (!this.get(this.KEYS.SETTINGS)) {
      this.set(this.KEYS.SETTINGS, DEFAULT_DATA.settings);
    }
  },

  // ---- CRUD Helpers ----
  getMenu() { return this.get(this.KEYS.MENU) || []; },
  setMenu(items) { this.set(this.KEYS.MENU, items); },

  getReservations() { return this.get(this.KEYS.RESERVATIONS) || []; },
  addReservation(reservation) {
    const list = this.getReservations();
    reservation.id = Date.now().toString();
    reservation.status = 'pending';
    reservation.createdAt = new Date().toISOString();
    list.push(reservation);
    this.set(this.KEYS.RESERVATIONS, list);
    return reservation;
  },
  updateReservation(id, updates) {
    const list = this.getReservations();
    const idx = list.findIndex(r => r.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      this.set(this.KEYS.RESERVATIONS, list);
    }
  },
  deleteReservation(id) {
    const list = this.getReservations().filter(r => r.id !== id);
    this.set(this.KEYS.RESERVATIONS, list);
  },

  getEvents() { return this.get(this.KEYS.EVENTS) || []; },
  setEvents(events) { this.set(this.KEYS.EVENTS, events); },

  getGallery() { return this.get(this.KEYS.GALLERY) || []; },
  setGallery(gallery) { this.set(this.KEYS.GALLERY, gallery); },

  getContact() { return this.get(this.KEYS.CONTACT) || DEFAULT_DATA.contact; },
  setContact(contact) { this.set(this.KEYS.CONTACT, contact); },

  getSettings() { return this.get(this.KEYS.SETTINGS) || DEFAULT_DATA.settings; },
  setSettings(settings) { this.set(this.KEYS.SETTINGS, settings); },

  // ---- Auth ----
  getAdminPassword() {
    const settings = this.getSettings();
    return settings.adminPassword || (typeof CONFIG !== 'undefined' ? CONFIG.adminPassword : 'admin123');
  },
  isAdminLoggedIn() {
    return this.get(this.KEYS.ADMIN_AUTH) === true;
  },
  loginAdmin() { this.set(this.KEYS.ADMIN_AUTH, true); },
  logoutAdmin() { this.remove(this.KEYS.ADMIN_AUTH); }
};

// ---- Default Data ----
const DEFAULT_DATA = {
  menu: [
    // Starters
    { id: '1', name: 'Veg Manchurian', category: 'Starters', price: '₹ 180', description: 'Crispy vegetable balls tossed in tangy Indo-Chinese Manchurian sauce', image: '' },
    { id: '2', name: 'Paneer Chilli', category: 'Starters', price: '₹ 220', description: 'Crispy paneer cubes with bell peppers in spicy chilli sauce', image: '' },
    { id: '3', name: 'Crispy Corn', category: 'Starters', price: '₹ 160', description: 'Golden fried corn kernels tossed with aromatic spices', image: '' },
    { id: '4', name: 'Spring Rolls', category: 'Starters', price: '₹ 150', description: 'Crispy rolls stuffed with seasoned vegetables and served with sweet chilli dip', image: '' },

    // Main Course
    { id: '5', name: 'Paneer Butter Masala', category: 'Main Course', price: '₹ 260', description: 'Soft paneer cubes in rich, creamy tomato-butter gravy', image: 'assets/images/food-paneer-masala.png' },
    { id: '6', name: 'Veg Kolhapuri', category: 'Main Course', price: '₹ 230', description: 'Mixed vegetables in a fiery Kolhapuri masala with authentic spices', image: '' },
    { id: '7', name: 'Dal Tadka', category: 'Main Course', price: '₹ 180', description: 'Yellow lentils tempered with cumin, garlic, and fresh coriander', image: '' },
    { id: '8', name: 'Jeera Rice', category: 'Main Course', price: '₹ 150', description: 'Fragrant basmati rice tempered with cumin seeds and ghee', image: '' },
    { id: '9', name: 'Veg Biryani', category: 'Main Course', price: '₹ 220', description: 'Aromatic basmati rice layered with spiced vegetables, saffron, and fried onions', image: 'assets/images/food-biryani.png' },

    // Indian Breads
    { id: '10', name: 'Butter Naan', category: 'Indian Breads', price: '₹ 50', description: 'Soft tandoor-baked naan brushed with butter', image: '' },
    { id: '11', name: 'Garlic Naan', category: 'Indian Breads', price: '₹ 60', description: 'Naan infused with fresh garlic and coriander', image: '' },
    { id: '12', name: 'Tandoori Roti', category: 'Indian Breads', price: '₹ 30', description: 'Whole wheat roti baked in traditional clay tandoor', image: '' },
    { id: '13', name: 'Kulcha', category: 'Indian Breads', price: '₹ 55', description: 'Soft, fluffy bread from the tandoor, lightly buttered', image: '' },

    // Desserts
    { id: '14', name: 'Gulab Jamun', category: 'Desserts', price: '₹ 80', description: 'Golden fried milk dumplings soaked in rose-scented sugar syrup', image: 'assets/images/desserts-gulab-jamun.png' },
    { id: '15', name: 'Ice Cream', category: 'Desserts', price: '₹ 100', description: 'Premium ice cream available in vanilla, chocolate, and mango flavors', image: '' },
    { id: '16', name: 'Rabdi', category: 'Desserts', price: '₹ 120', description: 'Traditional slow-cooked sweetened condensed milk with cardamom and saffron', image: '' },

    // Beverages
    { id: '17', name: 'Fresh Lime Soda', category: 'Beverages', price: '₹ 60', description: 'Refreshing lime soda — sweet, salt, or mixed', image: '' },
    { id: '18', name: 'Soft Drinks', category: 'Beverages', price: '₹ 40', description: 'Chilled carbonated beverages of your choice', image: '' },
    { id: '19', name: 'Tea', category: 'Beverages', price: '₹ 30', description: 'Hot masala chai brewed with fresh spices and milk', image: '' },
    { id: '20', name: 'Coffee', category: 'Beverages', price: '₹ 50', description: 'Rich hot coffee — freshly brewed', image: '' }
  ],

  events: [
    {
      id: '1',
      title: 'Weekend Family Buffet',
      description: 'Every Saturday & Sunday — enjoy an unlimited family buffet with over 30 dishes, live counters, and special dessert station. Perfect for families and groups.',
      badge: 'Every Weekend',
      icon: '🍽️'
    },
    {
      id: '2',
      title: 'Festival Special Menus',
      description: 'Celebrate Diwali, Holi, Navratri, and more with specially curated festival menus featuring traditional festive delicacies and sweets.',
      badge: 'Seasonal',
      icon: '🎉'
    },
    {
      id: '3',
      title: 'Birthday Celebrations',
      description: 'Make birthdays special! Book our private dining area for birthday parties with custom cakes, decorations, and a personalized menu.',
      badge: 'By Reservation',
      icon: '🎂'
    },
    {
      id: '4',
      title: 'Corporate Group Dining',
      description: 'Host your team lunches, corporate meetings, and business dinners with us. We offer custom packages for groups of 10 or more.',
      badge: 'Custom Packages',
      icon: '💼'
    },
    {
      id: '5',
      title: 'Seasonal Food Festivals',
      description: 'Join our themed food festivals featuring Maharashtrian Street Food, South Indian Week, Rajasthani Thali Fest, and many more culinary adventures.',
      badge: 'Limited Time',
      icon: '🎪'
    }
  ],

  gallery: [
    { id: '1', src: 'assets/images/restaurant-interior.png', caption: 'Elegant Dining Area', category: 'Dining Area' },
    { id: '2', src: 'assets/images/food-paneer-masala.png', caption: 'Paneer Butter Masala', category: 'Food Photography' },
    { id: '3', src: 'assets/images/food-biryani.png', caption: 'Veg Biryani Special', category: 'Special Dishes' },
    { id: '4', src: 'assets/images/hero-banner.png', caption: 'Restaurant Exterior', category: 'Restaurant Exterior' },
    { id: '5', src: 'assets/images/food-starters.png', caption: 'Delicious Starters Platter', category: 'Food Photography' },
    { id: '6', src: 'assets/images/desserts-gulab-jamun.png', caption: 'Signature Desserts', category: 'Special Dishes' }
  ],

  contact: {
    address: '75GH+M36, Pune - Bengaluru Hwy, Konyanpur, Karad, Maharashtra 415110',
    phone: '+91 98765 43210',
    email: 'contact@shahirasoi.com',
    lunchHours: '11:00 AM – 4:00 PM',
    dinnerHours: '6:00 PM – 11:00 PM',
    whatsapp: '+919876543210',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.0!2d74.18!3d17.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDE2JzQ4LjAiTiA3NMKwMTAnNDguMCJF!5e0!3m2!1sen!2sin!4v1'
  },

  settings: {
    adminPassword: (typeof CONFIG !== 'undefined' ? CONFIG.adminPassword : 'admin123'),
    heroTitle: 'Experience Authentic Taste and Warm Hospitality at Shahi Rasoi',
    heroSubtitle: 'Delicious Food, Memorable Moments — A perfect highway dining destination for families, travelers, and food lovers.',
    heroImage: 'assets/images/hero-banner.png'
  },

  reviews: [
    {
      id: '1',
      text: 'Excellent food and service. The Paneer Butter Masala was absolutely divine. Will definitely visit again!',
      author: 'Rajesh Patil',
      role: 'Regular Customer',
      rating: 5
    },
    {
      id: '2',
      text: 'Perfect stop while travelling on Pune-Bangalore Highway. Clean restaurant, fast service, and tasty food. Highly recommended!',
      author: 'Sneha Kulkarni',
      role: 'Traveler',
      rating: 5
    },
    {
      id: '3',
      text: 'Great place for family dining. The ambiance is warm and inviting, and the staff is very courteous. Kids loved the food!',
      author: 'Amit Deshmukh',
      role: 'Family Guest',
      rating: 5
    },
    {
      id: '4',
      text: 'We hosted our corporate team lunch here. The arrangements were perfect and the food was outstanding. Excellent value for money.',
      author: 'Priya Sharma',
      role: 'Corporate Event',
      rating: 5
    }
  ]
};

// Initialize on load
DB.init();
