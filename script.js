const works = [
  {title:'W.I.P', tag:'Project', src:[]},
  {title:'W.I.P', tag:'Project', src:[]},
  {title:'W.I.P', tag:'Project', src:[]}
];

function renderWorks(){
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  works.forEach((w,i)=>{
    const el = document.createElement('div'); 
    el.className='work';
    el.innerHTML = `
      <div class="thumb"></div>
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
  if(works[i].src.length === 0){
    modalImages.innerHTML = "<p style='color:var(--muted)'>No images yet. W.I.P</p>";
  } else {
    modalImages.innerHTML = works[i].src.map(s=>`<img src='${s}' alt='${works[i].title}'>`).join('');
  }
  document.getElementById('modalTitle').textContent = works[i].title + ' • ' + works[i].tag;
  modal.scrollTop = 0;
  modal.classList.add('show');
}

function closeModal(){ 
  document.getElementById('modal').classList.remove('show'); 
}

// Smooth scroll to works
function scrollToWorks(){ 
  document.getElementById('works').scrollIntoView({behavior:'smooth'}); 
}

// Contact modal logic
document.addEventListener('DOMContentLoaded', () => {
  const contactBtn = document.getElementById('contactBtn');
  const contactModal = document.getElementById('contactModal');
  const closeContact = document.getElementById('closeContact');

  contactBtn.addEventListener('click', () => contactModal.classList.add('show'));
  closeContact.addEventListener('click', () => contactModal.classList.remove('show'));

  // Featured image fullscreen
  const featuredImg = document.getElementById('featuredImage');
  if(featuredImg){
    featuredImg.addEventListener('click', () => {
      if (featuredImg.requestFullscreen) featuredImg.requestFullscreen();
      else if (featuredImg.webkitRequestFullscreen) featuredImg.webkitRequestFullscreen();
      else if (featuredImg.msRequestFullscreen) featuredImg.msRequestFullscreen();
    });
  }

  renderWorks();
});