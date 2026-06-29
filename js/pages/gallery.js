/* =============================================
   GALLERY PAGE (with Lightbox)
   ============================================= */

function renderGalleryPage() {
  const gallery = DB.getGallery();
  const categories = ['All', ...new Set(gallery.map(img => img.category))];

  return `
    <section class="section">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">Visual Journey</span>
          <h1 class="section__title">Photo Gallery</h1>
          <p class="section__subtitle">Take a visual tour of our restaurant, cuisine, and dining experiences.</p>
        </div>

        <!-- Filter Tabs -->
        <div class="tabs reveal" id="gallery-tabs">
          ${categories.map((cat, i) => `
            <button class="tab ${i === 0 ? 'active' : ''}" data-category="${cat === 'All' ? 'all' : Utils.escapeHTML(cat)}">${Utils.escapeHTML(cat)}</button>
          `).join('')}
        </div>

        <!-- Gallery Grid -->
        <div class="gallery-grid" id="gallery-grid">
          ${gallery.map((img, i) => `
            <div class="gallery-item reveal stagger-${(i % 6) + 1}" data-category="${Utils.escapeHTML(img.category)}" data-index="${i}">
              <img src="${Utils.imgSrc(img.src, img.caption, 20 + i * 40)}" alt="${Utils.escapeHTML(img.caption)}" class="gallery-item__image" loading="lazy">
              <div class="gallery-item__overlay">
                <span class="gallery-item__label">${Utils.escapeHTML(img.caption)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <div class="lightbox" id="lightbox">
      <button class="lightbox__close" id="lightbox-close">✕</button>
      <button class="lightbox__nav lightbox__nav--prev" id="lightbox-prev">❮</button>
      <button class="lightbox__nav lightbox__nav--next" id="lightbox-next">❯</button>
      <img src="" alt="" class="lightbox__image" id="lightbox-img">
      <div class="lightbox__caption" id="lightbox-caption"></div>
    </div>
  `;
}

function initGalleryPage() {
  const gallery = DB.getGallery();
  let currentIndex = 0;
  let filteredGallery = [...gallery];

  // Filter tabs
  const tabs = document.querySelectorAll('#gallery-tabs .tab');
  const items = document.querySelectorAll('#gallery-grid .gallery-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.category;

      filteredGallery = category === 'all'
        ? [...gallery]
        : gallery.filter(img => img.category === category);

      items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = '';
          item.classList.remove('visible');
          requestAnimationFrame(() => item.classList.add('visible'));
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  function openLightbox(index) {
    currentIndex = index;
    const img = filteredGallery[currentIndex];
    if (!img) return;
    lightboxImg.src = Utils.imgSrc(img.src, img.caption, currentIndex * 40);
    lightboxImg.alt = img.caption;
    lightboxCaption.textContent = img.caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + filteredGallery.length) % filteredGallery.length;
    const img = filteredGallery[currentIndex];
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = Utils.imgSrc(img.src, img.caption, currentIndex * 40);
      lightboxImg.alt = img.caption;
      lightboxCaption.textContent = img.caption;
      lightboxImg.style.opacity = '1';
    }, 200);
  }

  // Gallery item click
  items.forEach(item => {
    item.addEventListener('click', () => {
      const category = document.querySelector('#gallery-tabs .tab.active')?.dataset.category;
      if (category === 'all') {
        filteredGallery = [...gallery];
      } else {
        filteredGallery = gallery.filter(img => img.category === category);
      }

      // Find the index in filtered gallery
      const originalIndex = parseInt(item.dataset.index);
      const filteredIndex = filteredGallery.findIndex(img => img === gallery[originalIndex]);
      openLightbox(filteredIndex !== -1 ? filteredIndex : 0);
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => navigateLightbox(-1));
  nextBtn?.addEventListener('click', () => navigateLightbox(1));

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}
