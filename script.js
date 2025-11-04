/* ==========================================================================
   script.js — full site logic: works, modal, featured fullscreen, animations,
   ripple effect, scrollable modal content, contact redirect.
   ========================================================================== */

/* === Works data (images you provided) === */
const works = [
  {
    title: 'METROPOLITON PD (ER:LC) Commission',
    tag: 'Commission',
    src: ['https://i.ibb.co/d0YZnR5f/room-00000.jpg']
  },
  {
    title: 'Global Occult Coalition — Commission Set',
    tag: 'Commission Series',
    src: [
      'https://i.ibb.co/KxSq5tXq/GOC-00000.png',
      'https://i.ibb.co/MkXQZSSG/dsada-00000.jpg',
      'https://i.ibb.co/przwPLYG/snow-00000.jpg',
      'https://i.ibb.co/h5MF8Kv/PTOLEMY-00000.jpg',
      'https://i.ibb.co/x8Hy4nZJ/bhgear-00000.jpg'
    ]
  },
  {
    title: 'Zone: 14 Occult Conflict',
    tag: 'Commission',
    src: ['https://i.ibb.co/kg026g97/610-00000.png']
  },
  {
    title: 'Chaos Insurgency — Commission Series',
    tag: 'Commission Series',
    src: [
      'https://i.ibb.co/mrp0Z2rN/TCImr-00000.jpg',
      'https://i.ibb.co/zTBBgHnM/TCIHR-00000.jpg',
      'https://i.ibb.co/8nbGTHj7/TC3-I-00000.jpg',
      'https://i.ibb.co/SXBy3YzV/T2-CI-00000.jpg',
      'https://i.ibb.co/VcHmLMbV/TCI-00000.jpg'
    ]
  }
];

/* === Utility: find main grid element (supporting multiple HTML variants) === */
function getGridElement() {
  return document.getElementById('grid') || document.getElementById('workGrid') || document.getElementById('otherGrid');
}

/* === Utility: find modal element (supporting multiple ids) === */
function getModalElement() {
  return document.getElementById('modal') || document.getElementById('commissionModal') || document.getElementById('modalContainer');
}

/* === Render works into the grid === */
function renderWorks() {
  const grid = getGridElement();
  if (!grid) {
    console.warn('renderWorks: no grid element found (expected #grid or #workGrid or #otherGrid).');
    return;
  }
  grid.innerHTML = ''; // reset

  works.forEach((w, i) => {
    const workEl = document.createElement('div');
    workEl.className = 'work';

    // thumbnail — if there is an image, show it; otherwise show placeholder
    const thumbUrl = w.src && w.src.length ? w.src[0] : '';
    const thumbHTML = thumbUrl
      ? `<div class="thumb" style="background-image:url('${thumbUrl}')"></div>`
      : `<div class="thumb" style="background:#111;display:flex;align-items:center;justify-content:center;color:var(--muted)">W.I.P</div>`;

    workEl.innerHTML = `
      ${thumbHTML}
      <div class="meta">
        <div>
          <strong>${escapeHtml(w.title)}</strong>
          <div class="tag">${escapeHtml(w.tag)}</div>
        </div>
        <div>
          <button class="btn open-btn" data-index="${i}">Open</button>
        </div>
      </div>
    `;
    grid.appendChild(workEl);
  });

  // wire open buttons
  grid.querySelectorAll('.open-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      openModal(idx);
    });
  });
}

/* === Escape HTML helper === */
function escapeHtml(unsafe) {
  return String(unsafe).replace(/[&<>"'`=\/]/g, function (s) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    })[s];
  });
}

/* === Modal open/close logic === */
function openModal(i) {
  const modal = getModalElement();
  if (!modal) {
    console.warn('openModal: modal element not found.');
    return;
  }

  // find container spots (support a few id/class name variants)
  const modalImages = document.getElementById('modalImages') || document.querySelector('#modal .modal-card') || modal.querySelector('.modal-card');
  const modalTitle = document.getElementById('modalTitle') || modal.querySelector('#modalTitle') || modal.querySelector('.modal-title') || modal.querySelector('h3');

  // populate images (stacked, scrollable)
  if (modalImages) {
    if (works[i].src && works[i].src.length) {
      modalImages.innerHTML = works[i].src.map(s => {
        return `<img src="${s}" alt="${escapeHtml(works[i].title)}" style="width:100%;display:block;border-radius:8px;margin-bottom:12px">`;
      }).join('');
    } else {
      modalImages.innerHTML = `<p style="color:var(--muted)">No images available for this work (W.I.P).</p>`;
    }
  }

  if (modalTitle) {
    const tEl = typeof modalTitle.tagName === 'undefined' ? modal.querySelector('#modalTitle') : modalTitle;
    // if modalTitle is a node that accepts text
    if (modalTitle.textContent !== undefined) {
      modalTitle.textContent = `${works[i].title} • ${works[i].tag}`;
    }
  }

  // ensure modal is scrollable and visible
  modal.classList.add('show');
  modal.style.display = 'flex';
  // lock page scroll under modal
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  // scroll modal to top
  modal.scrollTop = 0;
}

/* Close modal */
function closeModal() {
  const modal = getModalElement();
  if (!modal) return;
  modal.classList.remove('show');
  modal.style.display = 'none';
  // restore page scroll
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

/* Click outside modal content closes it (if modal uses backdrop element) */
function addModalBackdropClose() {
  const modal = getModalElement();
  if (!modal) return;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* === Featured image fullscreen (works on desktop & mobile where allowed) === */
function wireFeaturedFullscreen() {
  const featured = document.getElementById('featuredImage') || document.querySelector('.featured-img');
  if (!featured) return;

  // If the featured is an <img>, handle differently than background-image
  featured.style.cursor = 'zoom-in';
  featured.addEventListener('click', () => {
    // if it's an <img> element we can show a full screen overlay
    if (featured.tagName && featured.tagName.toLowerCase() === 'img') {
      // try Fullscreen API first
      if (featured.requestFullscreen) {
        featured.requestFullscreen().catch(()=>{/* ignore */});
      } else {
        // fallback create overlay
        openImageOverlay(featured.src);
      }
    } else {
      // background-image case: extract url from style
      const bg = featured.style.backgroundImage || window.getComputedStyle(featured).backgroundImage;
      const match = bg.match(/url\(["']?(.+?)["']?\)/);
      if (match && match[1]) openImageOverlay(match[1]);
    }
  });

  function openImageOverlay(src) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.95)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.cursor = 'zoom-out';

    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '95%';
    img.style.maxHeight = '95%';
    img.style.borderRadius = '8px';
    overlay.appendChild(img);

    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  }
}

/* === Ripple effect on buttons === */
function wireButtonRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      // create ripple span
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      // position
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* === Fade-in on scroll === */
function wireFadeInOnScroll() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

/* === Contact button handling: redirect to contact.html (works every time) === */
function wireContactRedirect() {
  const contactBtn = document.getElementById('contactBtn') || document.querySelector('.contact-btn') || document.querySelector('.btn.contact');
  if (!contactBtn) {
    // if not found, nothing to wire
    return;
  }
  // use onclick to avoid multiple-attaching issues
  contactBtn.onclick = () => {
    window.location.href = 'contact.html';
  };
}

/* === Initialization on DOM ready === */
document.addEventListener('DOMContentLoaded', () => {
  // render works into grid
  renderWorks();

  // wire modal backdrop close behavior
  addModalBackdropClose();

  // wire featured fullscreen
  wireFeaturedFullscreen();

  // ripple + fade-in
  wireButtonRipple();
  wireFadeInOnScroll();

  // contact redirect
  wireContactRedirect();

  // wire close buttons with class names we've used
  const closeSelectors = ['.closeModal', '.close-btn', '#closeModal', '.close'];
  closeSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(btn => {
      btn.addEventListener('click', closeModal);
    });
  });

  // also wire ESC to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});

/* === expose functions globally (so inline onclicks still work) === */
window.openModal = openModal;
window.closeModal = closeModal;