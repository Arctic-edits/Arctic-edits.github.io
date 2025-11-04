const works = [
  { title: 'METROPOLITAN PD (ER:LC) Commission', tag: 'Commission', src: ['https://i.ibb.co/d0YZnR5f/room-00000.jpg'] },
  { title: 'Global Occult Coalition — Commission Set', tag: 'Commission Series', src: [
    'https://i.ibb.co/KxSq5tXq/GOC-00000.png',
    'https://i.ibb.co/MkXQZSSG/dsada-00000.jpg',
    'https://i.ibb.co/przwPLYG/snow-00000.jpg',
    'https://i.ibb.co/h5MF8Kv/PTOLEMY-00000.jpg',
    'https://i.ibb.co/x8Hy4nZJ/bhgear-00000.jpg'
  ]},
  { title: 'Chaos Insurgency — Commission Series', tag: 'Commission Series', src: [
    'https://i.ibb.co/mrp0Z2rN/TCImr-00000.jpg',
    'https://i.ibb.co/zTBBgHnM/TCIHR-00000.jpg',
    'https://i.ibb.co/8nbGTHj7/TC3-I-00000.jpg',
    'https://i.ibb.co/SXBy3YzV/T2-CI-00000.jpg',
    'https://i.ibb.co/VcHmLMbV/TCI-00000.jpg'
  ]},
  { title: 'Other Projects — W.I.P.', tag: 'W.I.P.', src: [] }
];

function renderWorks() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  works.forEach((w, i) => {
    const el = document.createElement('div');
    el.className = 'work fade-in';
    el.innerHTML = `
      <div class="thumb" style="background-image:url('${w.src[0] || 'https://via.placeholder.com/400x200/111/fff?text=W.I.P.'}')"></div>
      <div class="meta">
        <div>
          <strong>${w.title}</strong>
          <div class="tag">${w.tag}</div>
        </div>
        <div><button class="btn" onclick="openModal(${i})">Open</button></div>
      </div>`;
    grid.appendChild(el);
  });
}

function openModal(i) {
  const modal = document.getElementById('modal');
  const modalImages = document.getElementById('modalImages');
  modalImages.innerHTML = works[i].src.length
    ? works[i].src.map(s => `<img src="${s}" alt="${works[i].title}">`).join('')
    : `<p style="color:#ccc;">No images available for this W.I.P. project.</p>`;
  document.getElementById('modalTitle').textContent = works[i].title;
  modal.scrollTop = 0;
  modal.classList.add('show');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

document.addEventListener('click', e => {
  if (e.target.id === 'modal') closeModal();
});

document.addEventListener('DOMContentLoaded', () => {
  renderWorks();

  // Fade in observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Button ripple
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      btn.appendChild(ripple);
      const x = e.clientX - btn.offsetLeft;
      const y = e.clientY - btn.offsetTop;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Contact button
  const contactBtn = document.getElementById('contactBtn');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      window.location.href = 'contact.html';
    });
  }

  // Star background animation
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let stars = [];
  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.2
    }));
  }
  resize();
  window.addEventListener('resize', resize);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    stars.forEach(s => {
      s.y += s.speed;
      if (s.y > canvas.height) s.y = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
});