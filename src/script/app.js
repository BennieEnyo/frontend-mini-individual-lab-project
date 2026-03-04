// ── DATA ──
const projects = [
  {name:'Shadow & Light',category:'portrait',image:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=700&fit=crop&auto=format',description:'Portrait series',wide:true},
  {name:'Urban Geometry',category:'editorial',image:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=500&fit=crop&auto=format',description:'Editorial'},
  {name:'Golden Hour',category:'landscape',image:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop&auto=format',description:'Landscape'},
  {name:'The Gaze',category:'portrait',image:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face&auto=format',description:'Portrait',tall:true},
  {name:'City Nights',category:'event',image:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=400&fit=crop&auto=format',description:'Event',wide:true},
  {name:'Minimal Forms',category:'editorial',image:'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=500&fit=crop&auto=format',description:'Editorial'},
  {name:'Desert Dunes',category:'landscape',image:'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=500&fit=crop&auto=format',description:'Landscape'},
  {name:'Moments',category:'event',image:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=400&fit=crop&auto=format',description:'Event'},
];

const blogPosts = [
  {title:'The Art of Natural Light',date:'Jan 12, 2026',category:'Technique',excerpt:'Natural light is the most powerful tool in a photographer\'s arsenal. Learn how to harness it for stunning portraits.',img:'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&h=300&fit=crop&auto=format'},
  {title:'Composition Rules You Should Break',date:'Feb 3, 2026',category:'Creative',excerpt:'Rules are made to be broken. Discover when and how to subvert classic composition principles for dynamic results.',img:'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=300&fit=crop&auto=format'},
  {title:'Post-Processing Without Losing Soul',date:'Feb 22, 2026',category:'Editing',excerpt:'Retouching should enhance, not replace. Here\'s my minimal approach to editing that keeps authenticity intact.',img:'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=500&h=300&fit=crop&auto=format'},
];

// ── RENDER GALLERY ──
function renderGallery(filter='all'){
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML='';
  const filtered = filter==='all' ? projects : projects.filter(p=>p.category===filter);
  filtered.forEach(proj=>{
    const item = document.createElement('div');
    item.className='gallery-item'+(proj.wide?' wide':'')+(proj.tall?' tall':'');
    item.innerHTML=`
      <img src="${proj.image}" alt="${proj.name}" loading="lazy"/>
      <div class="gallery-overlay">
        <h3>${proj.name}</h3>
        <p>${proj.description}</p>
        <a href="#" class="lb-trigger" data-src="${proj.image}">View →</a>
      </div>`;
    grid.appendChild(item);
  });
  // lightbox triggers
  document.querySelectorAll('.lb-trigger').forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      document.getElementById('lightboxImg').src=a.dataset.src;
      document.getElementById('lightbox').classList.add('open');
    });
  });
}

// ── RENDER BLOG ──
function renderBlog(){
  const grid = document.getElementById('blogGrid');
  blogPosts.forEach(post=>{
    const card=document.createElement('div');
    card.className='blog-card reveal';
    card.innerHTML=`
      <img src="${post.img}" alt="${post.title}" loading="lazy"/>
      <div class="blog-body">
        <div class="blog-meta">${post.category} — ${post.date}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="#" class="blog-link">Read More →</a>
      </div>`;
    grid.appendChild(card);
  });
}

// ── FILTER TABS ──
document.getElementById('filterTabs').addEventListener('click',e=>{
  if(e.target.classList.contains('filter-tab')){
    document.querySelectorAll('.filter-tab').forEach(t=>t.classList.remove('active'));
    e.target.classList.add('active');
    renderGallery(e.target.dataset.filter);
  }
});

// ── NAV TOGGLE ──
const toggle=document.getElementById('navToggle');
const navList=document.getElementById('navList');
toggle.addEventListener('click',()=>navList.classList.toggle('open'));
navList.addEventListener('click',e=>{if(e.target.tagName==='A')navList.classList.remove('open');});

// ── SCROLL HEADER ──
window.addEventListener('scroll',()=>{
  document.getElementById('header').classList.toggle('scrolled',window.scrollY>60);
});

// ── ACTIVE LINKS ──
window.addEventListener('scroll',()=>{
  const sections=document.querySelectorAll('section[id]');
  const links=document.querySelectorAll('nav ul li a');
  let current='';
  sections.forEach(s=>{
    if(window.scrollY>=s.offsetTop-140) current=s.id;
  });
  links.forEach(l=>{
    l.classList.remove('active');
    if(l.getAttribute('href')==='#'+current) l.classList.add('active');
  });
});

// ── REVEAL ON SCROLL ──
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('visible');});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// ── LIGHTBOX ──
document.getElementById('lightboxClose').addEventListener('click',()=>{
  document.getElementById('lightbox').classList.remove('open');
});
document.getElementById('lightbox').addEventListener('click',e=>{
  if(e.target===e.currentTarget) e.currentTarget.classList.remove('open');
});

// ── CUSTOM CURSOR ──
const cur=document.getElementById('cursor');
const ring=document.getElementById('cursorRing');
document.addEventListener('mousemove',e=>{
  cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';
  ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px';
});

// ── CONTACT FORM ──
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const btn=e.target.querySelector('button');
  btn.textContent='Message Sent!';btn.style.background='#1a8a2a';
  setTimeout(()=>{btn.textContent='Send Message';btn.style.background='';},3000);
  e.target.reset();
});

// ── INIT ──
renderGallery();
renderBlog();
// observe dynamically added reveals
setTimeout(()=>{
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
},100);