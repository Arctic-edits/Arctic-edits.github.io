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
}

function closeModal(){ 
  document.getElementById('modal').classList.remove('show'); 
}

document.getElementById('modal').addEventListener('click', e=>{
  if(e.target.id==='modal') closeModal();
});

function scrollToWorks(){ 
  document.getElementById('works').scrollIntoView({behavior:'smooth'}); 
}

// Contact Modal Logic
document.addEventListener('DOMContentLoaded', () => {
  const hireBtn = document.getElementById('hireBtn');
  const contactModal = document.getElementById('contactModal');
  const closeContact = document.getElementById('closeContact');

  hireBtn.addEventListener('click', () => contactModal.classList.add('show'));
  closeContact.addEventListener('click', () => contactModal.classList.remove('show'));

  // Featured image fullscreen
  const featuredImage = document.getElementById('featuredImage');
  featuredImage.addEventListener('click', () => {
    if (featuredImage.requestFullscreen) {
      featuredImage.requestFullscreen();
    } else if (featuredImage.webkitRequestFullscreen) { // Safari
      featuredImage.webkitRequestFullscreen();
    } else if (featuredImage.msRequestFullscreen) { // IE11
      featuredImage.msRequestFullscreen();
    }
  });

  renderWorks();
});
document.addEventListener("DOMContentLoaded", () => {
  // Fade in animation on load
  document.querySelectorAll("section, .header").forEach((el, i) => {
    setTimeout(() => el.classList.add("fade-in"), i * 200);
  });

  // Featured image fullscreen
  const featuredImg = document.querySelector(".featured-img");
  if (featuredImg) {
    featuredImg.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.background = "rgba(0,0,0,0.9)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = "100";
      overlay.style.cursor = "zoom-out";

      const img = document.createElement("img");
      img.src = featuredImg.src;
      img.style.maxWidth = "90%";
      img.style.maxHeight = "90%";
      img.style.borderRadius = "10px";
      img.style.boxShadow = "0 0 30px rgba(0,0,0,0.6)";

      overlay.appendChild(img);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => overlay.remove());
    });
  }

  // Smooth button click feedback
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("clicked");
      setTimeout(() => btn.classList.remove("clicked"), 200);
    });
  });
});

