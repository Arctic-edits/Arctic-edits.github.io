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

function renderWorks(){
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  works.forEach((w,i)=>{
    const el = document.createElement('div'); 
    el.className='work';
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

function openModal(i){
  const modal = document.getElementById('modal');
  const modalImages = document.getElementById('modalImages');
  modalImages.innerHTML = works[i].src.map(s=>`<img src='${s}' alt='${works[i].title}'>`).join('');
  document.getElementById('modalTitle').textContent = works[i].title + ' • ' + works[i].tag;
  modal.scrollTop = 0;
  modal.classList.add('show');
  document.body.classList.add('modal-open');
}

function closeModal(){ 
  document.getElementById('modal').classList.remove('show'); 
  document.body.classList.remove('modal-open');
}

document.getElementById('modal').addEventListener('click', e=>{
  if(e.target.id==='modal') closeModal();
});

function scrollToWorks(){ 
  document.getElementById('works').scrollIntoView({behavior:'smooth'}); 
}

document.addEventListener('DOMContentLoaded', () => {
  // Contact button → redirect to contact page
  const contactBtn = document.getElementById('contactBtn');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      window.location.href = 'contact.html';
    });
  }

  // Fix featured image click fullscreen & display
  const featuredImg = document.getElementById('featuredImage');
  if(featuredImg){
    featuredImg.style.backgroundSize = 'cover';
    featuredImg.style.backgroundPosition = 'center';
    featuredImg.style.borderRadius = '12px';
    featuredImg.addEventListener('click', () => {
      if (featuredImg.requestFullscreen) featuredImg.requestFullscreen();
      else if (featuredImg.webkitRequestFullscreen) featuredImg.webkitRequestFullscreen();
      else if (featuredImg.msRequestFullscreen) featuredImg.msRequestFullscreen();
    });
  }

  // Ripple effect
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      setTimeout(()=>ripple.remove(),600);
    });
  });

  renderWorks();
});
