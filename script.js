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
        <strong>${w.title}</strong>
        <div class="tag">${w.tag}</div>
        <button class='btn' onclick='openModal(${i})'>Open</button>
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

document.addEventListener('DOMContentLoaded', () => {
  renderWorks();

  // Fade-in animations
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {threshold:0.1});
  fadeEls.forEach(el=>observer.observe(el));

  // Featured image fullscreen
  const featuredImage = document.getElementById('featuredImage');
  featuredImage.addEventListener('click', () => {
    const overlay = document.createElement("div");
    overlay.style.position="fixed";
    overlay.style.inset="0";
    overlay.style.background="rgba(0,0,0,0.9)";
    overlay.style.display="flex";
    overlay.style.alignItems="center";
    overlay.style.justifyContent="center";
    overlay.style.zIndex="100";
    overlay.style.cursor="zoom-out";

    const img = document.createElement("img");
    img.src = featuredImage.style.backgroundImage.slice(5,-2);
    img.style.maxWidth="90%";
    img.style.maxHeight="90%";
    img.style.borderRadius="10px";
    img.style.boxShadow="0 0 30px rgba(0,0,0,0.6)";
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", ()=>overlay.remove());
  });
});
