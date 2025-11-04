const works = [
  {title:'METROPOLITAN PD (ER:LC) Commission', tag:'Commission', src:['https://i.ibb.co/d0YZnR5f/room-00000.jpg']},
  {title:'Global Occult Coalition — Commission Set', tag:'Commission Series', src:[
    'https://i.ibb.co/KxSq5tXq/GOC-00000.png',
    'https://i.ibb.co/MkXQZSSG/dsada-00000.jpg',
    'https://i.ibb.co/przwPLYG/snow-00000.jpg',
    'https://i.ibb.co/h5MF8Kv/PTOLEMY-00000.jpg',
    'https://i.ibb.co/x8Hy4nZJ/bhgear-00000.jpg']},
  {title:'Zone: 14 Occult Conflict', tag:'Commission', src:['https://i.ibb.co/kg026g97/610-00000.png']},
  {title:'Chaos Insurgency — Commission Series', tag:'Commission Series', src:[
    'https://i.ibb.co/mrp0Z2rN/TCImr-00000.jpg',
    'https://i.ibb.co/zTBBgHnM/TCIHR-00000.jpg',
    'https://i.ibb.co/8nbGTHj7/TC3-I-00000.jpg',
    'https://i.ibb.co/SXBy3YzV/T2-CI-00000.jpg',
    'https://i.ibb.co/VcHmLMbV/TCI-00000.jpg']}
];

/* === renderWorks (unchanged behaviour) === */
function renderWorks(){
  const grid = document.getElementById('grid');
  if (!grid) return; // defensive
  grid.innerHTML = '';
  works.forEach((w,i)=>{
    const el = document.createElement('div'); 
    el.className='work';
    el.innerHTML = `
      <div class="thumb" style="background-image:url('${w.src[0] || ''}')"></div>
      <div class="meta">
        <div>
          <strong>${w.title}</strong>
          <div class="tag">${w.tag}</div>
        </div>
        <div>
          <button class='btn' data-index='${i}'>Open</button>
        </div>
      </div>`;
    grid.appendChild(el);
  });

  // attach open handlers (safer than inline onclick)
  grid.querySelectorAll('button.btn[data-index]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      if (!Number.isNaN(idx)) openModal(idx);
    });
  });
}

/* === openModal / closeModal (keeps original behaviour) === */
function openModal(i){
  const modal = document.getElementById('modal');
  const modalImages = document.getElementById('modalImages');
  if (!modal || !modalImages) return;

  // ensure modalImages can scroll inside the modal by using the class we defined
  if (!modalImages.classList.contains('modal-scroll')) {
    modalImages.classList.add('modal-scroll');
  }

  // populate images (or show message if empty)
  if (works[i] && Array.isArray(works[i].src) && works[i].src.length > 0){
    modalImages.innerHTML = works[i].src.map(s=>`<img src='${s}' alt='${escapeHtml(works[i].title)}'>`).join('');
  } else {
    modalImages.innerHTML = `<p style="color:var(--muted);text-align:center;padding:24px;">No images available — W.I.P.</p>`;
  }

  const modalTitleEl = document.getElementById('modalTitle');
  if (modalTitleEl) modalTitleEl.textContent = works[i].title + ' • ' + works[i].tag;

  // show modal and lock background scroll
  modal.classList.add('show');
  document.body.classList.add('modal-open');

  // ensure modal scroll position is top
  modal.scrollTop = 0;
}

function closeModal(){ 
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.classList.remove('show'); 
  document.body.classList.remove('modal-open');
}

/* === Utility: escape html for safety when inserting titles === */
function escapeHtml(unsafe){
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

/* === DOM-ready wiring === */
document.addEventListener('DOMContentLoaded', () => {
  // SAFE: now DOM elements exist — query them here
  const modal = document.getElementById('modal');
  const contactModal = document.getElementById('contactModal');
  const featuredImg = document.getElementById('featuredImage');
  const contactBtn = document.getElementById('contactBtn');
  const closeContact = document.getElementById('closeContact');

  // Render works into grid
  renderWorks();

  // If user clicked backdrop (modal element itself) close it
  if (modal) {
    modal.addEventListener('click', (e)=>{
      if (e.target === modal) closeModal();
    });
  }

  // Contact button behavior: go to contact page (works reliably)
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      window.location.href = 'contact.html';
    });
  }

  // If contact modal exists and user still wants modal behavior (kept from previous versions),
  // ensure we add scroll-lock behavior for it too (but this won't run unless contactModal exists)
  if (contactModal && closeContact){
    // open handled earlier elsewhere if you used it; just wire close
    closeContact.addEventListener('click', () => {
      contactModal.classList.remove('show');
      document.body.classList.remove('modal-open');
    });
    contactModal.addEventListener('click', (e)=>{
      if (e.target === contactModal) {
        contactModal.classList.remove('show');
        document.body.classList.remove('modal-open');
      }
    });
  }

  // Featured image: if it's a DIV with background-image or an IMG, clicking should fullscreen or open overlay
  if (featuredImg){
    featuredImg.style.cursor = 'zoom-in';
    featuredImg.addEventListener('click', () => {
      // try Fullscreen API
      if (featuredImg.requestFullscreen) {
        featuredImg.requestFullscreen().catch(()=>{});
      } else if (featuredImg.webkitRequestFullscreen){
        featuredImg.webkitRequestFullscreen();
      } else if (featuredImg.msRequestFullscreen){
        featuredImg.msRequestFullscreen();
      } else {
        // fallback overlay (works for DIVs or IMG)
        const bg = featuredImg.tagName.toLowerCase() === 'img' ? featuredImg.src : (featuredImg.style.backgroundImage || '');
        const match = bg.match(/url\(["']?(.+?)["']?\)/);
        const src = (featuredImg.tagName.toLowerCase() === 'img') ? featuredImg.src : (match ? match[1] : null);
        if (src) {
          const overlay = document.createElement('div');
          overlay.style.position = 'fixed';
          overlay.style.inset = '0';
          overlay.style.background = 'rgba(0,0,0,0.95)';
          overlay.style.display = 'flex';
          overlay.style.alignItems = 'center';
          overlay.style.justifyContent = 'center';
          overlay.style.zIndex = '99999';
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
    });
  }

  // Button ripple effect — safer coordinate math using getBoundingClientRect
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e){
      // create ripple span
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      this.appendChild(ripple);

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size/2}px`;
      ripple.style.top = `${e.clientY - rect.top - size/2}px`;

      setTimeout(()=> {
        if (ripple && ripple.parentNode) ripple.remove();
      }, 600);
    });
  });

  // keyboard ESC closes modal
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') {
      closeModal();
      if (contactModal) contactModal.classList.remove('show');
      document.body.classList.remove('modal-open');
    }
  });
});
