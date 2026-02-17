const works = [
  {
    title: 'METROPOLITAN PD (ER:LC) Commission',
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

const editingStory = `
  <p>
    I started editing for fun, testing ideas and learning what makes a clip feel impactful. What began as a hobby quickly turned into a real creative focus for me.
  </p>
  <p>
    I currently edit with <strong>After Effects 2024</strong>, where I build motion-heavy edits with strong pacing, clean transitions, and cinematic style. I enjoy turning raw footage into something polished and memorable.
  </p>
  <p>
    Check out my editing profile here: 
    <a href="https://www.tiktok.com/@holdkin" target="_blank" rel="noopener noreferrer">@holdkin on TikTok</a>.
  </p>
`;

const zone14Info = `
  <p>
    In <strong>Zone: 14 Occult Conflict</strong>, I work as a <strong>scripter</strong>, helping build gameplay systems and features.
  </p>
  <p>
    Play the game here:
    <a href="https://www.roblox.com/games/84207991479796/Zone-14-Occult-Conflict" target="_blank" rel="noopener noreferrer">Zone: 14 Occult Conflict on Roblox</a>.
  </p>
`;

let activeWorkIndex = 0;
let activeImageIndex = 0;

function renderWorks() {
  const grid = document.getElementById('grid');
  if (!grid) return;

  grid.innerHTML = '';
  works.forEach((w, i) => {
    const el = document.createElement('div');
    el.className = 'work fade-in';
    el.innerHTML = `
      <div class="thumb" style="background-image:url('${w.src[0]}')"></div>
      <div class="meta">
        <div>
          <strong>${w.title}</strong>
          <div class="tag">${w.tag}</div>
        </div>
        <div>
          <button class='btn' onclick='openModal(${i})'>Open</button>
        </div>
      </div>`;
    grid.appendChild(el);
  });
}

function updateModalImage() {
  const modalImages = document.getElementById('modalImages');
  const counter = document.getElementById('modalImageCounter');
  const controls = document.getElementById('modalGalleryControls');
  const images = works[activeWorkIndex].src;
  const current = images[activeImageIndex];

  modalImages.innerHTML = `<img src='${current}' alt='${works[activeWorkIndex].title}'>`;
  counter.textContent = `${activeImageIndex + 1} / ${images.length}`;
  controls.style.display = images.length > 1 ? 'flex' : 'none';

  document.getElementById('modalTitle').textContent = `${works[activeWorkIndex].title} • ${works[activeWorkIndex].tag}`;
}

function openModal(i) {
  const modal = document.getElementById('modal');
  activeWorkIndex = i;
  activeImageIndex = 0;
  updateModalImage();

  modal.classList.add('show');
  document.body.classList.add('modal-open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
  document.body.classList.remove('modal-open');
}

function showNextImage() {
  const images = works[activeWorkIndex].src;
  activeImageIndex = (activeImageIndex + 1) % images.length;
  updateModalImage();
}

function showPrevImage() {
  const images = works[activeWorkIndex].src;
  activeImageIndex = (activeImageIndex - 1 + images.length) % images.length;
  updateModalImage();
}

function openInfoModal(title, bodyHtml) {
  const titleEl = document.getElementById('infoModalTitle');
  const bodyEl = document.getElementById('infoModalBody');
  const modal = document.getElementById('infoModal');
  if (!titleEl || !bodyEl || !modal) return;

  titleEl.textContent = title;
  bodyEl.innerHTML = bodyHtml;
  modal.classList.add('show');
}

function closeInfoModal() {
  const modal = document.getElementById('infoModal');
  if (modal) modal.classList.remove('show');
}


function initReactiveBackground() {
  const updatePosition = (x, y) => {
    const px = `${(x / window.innerWidth) * 100}%`;
    const py = `${(y / window.innerHeight) * 100}%`;
    document.documentElement.style.setProperty('--mx', px);
    document.documentElement.style.setProperty('--my', py);
  };

  window.addEventListener('pointermove', e => updatePosition(e.clientX, e.clientY));
  window.addEventListener('touchmove', e => {
    if (!e.touches || !e.touches[0]) return;
    updatePosition(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
}

function scrollToWorks() {
  const worksEl = document.getElementById('works');
  if (worksEl) worksEl.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  renderWorks();
  initReactiveBackground();

  const modal = document.getElementById('modal');
  const infoModal = document.getElementById('infoModal');
  const nextBtn = document.getElementById('nextImageBtn');
  const prevBtn = document.getElementById('prevImageBtn');

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target.id === 'modal') closeModal();
    });
  }

  if (infoModal) {
    infoModal.addEventListener('click', e => {
      if (e.target.id === 'infoModal') closeInfoModal();
    });
  }

  if (nextBtn) nextBtn.addEventListener('click', showNextImage);
  if (prevBtn) prevBtn.addEventListener('click', showPrevImage);

  document.addEventListener('keydown', e => {
    if (!modal || !modal.classList.contains('show')) return;
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'Escape') closeModal();
  });

  document.querySelectorAll('[data-project]').forEach(btn => {
    btn.addEventListener('click', () => {
      const project = btn.getAttribute('data-project');
      if (project === 'after-effects') {
        openInfoModal('After Effects Editing', editingStory);
      } else if (project === 'zone-14') {
        openInfoModal('Zone: 14 Occult Conflict', zone14Info);
      }
    });
  });

  const featuredImg = document.getElementById('featuredImage');
  if (featuredImg) {
    featuredImg.addEventListener('click', () => {
      if (featuredImg.requestFullscreen) featuredImg.requestFullscreen();
    });
  }

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      setTimeout(() => ripple.remove(), 600);
    });
  });
});
