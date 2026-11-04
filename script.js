/* Behaviour only. All content is written directly in index.html. */
$(function(){
 $('#yr').text(new Date().getFullYear());

 // FAQ accordion
 $('.faq').on('click','.faq-q',function(){const o=$(this).attr('aria-expanded')!=='true';$(this).attr('aria-expanded',o).parent().next().toggleClass('open',o)});

 // Portfolio filter
 $('.filters').on('click','button',function(){
  const f=$(this).data('f');
  $('.filters button').attr('aria-selected',false);$(this).attr('aria-selected',true);
  $('#grid .item').each(function(){const show=f==='all'||$(this).data('type')===f;$(this).toggleClass('hide',!show)});
 });

 // Modal
 let last;const $m=$('#modal');
 const close=()=>{$m.prop('hidden',true);$('#mBody').empty();last&&last.focus()};
 $('#grid').on('click','.item',function(){
  last=this;const d=$(this).data();let h;
  if(d.video&&/youtube|youtu\.be|instagram/.test(d.video))h=`<iframe src="${d.video}" title="${d.title}" allowfullscreen></iframe>`;
  else if(d.video)h=`<video src="${d.video}" controls autoplay playsinline></video>`;
  else h=`<img src="${d.src}" alt="${d.title}" onerror="this.replaceWith(document.createTextNode('Add your file at ${d.src}'))">`;
  $('#mBody').html(h+`<p><strong>${d.title}</strong><br>${d.desc}</p>`);
  $m.prop('hidden',false);$('#mClose').focus();
 });
 $('#mClose').on('click',close);$m.on('click',e=>{if(e.target===$m[0])close()});
 $(document).on('keydown',e=>{
  if(e.key==='Escape'){if(!$m.prop('hidden'))close();closeMenu()}
  if(e.key==='Tab'&&!$m.prop('hidden')){e.preventDefault();$('#mClose').focus()}
 });

 // Theme
 const t=()=>document.documentElement.dataset.theme;
 const lab=()=>{$('#theme').attr('aria-label',t()==='dark'?'Switch to light theme':'Switch to dark theme').find('i').attr('class',t()==='dark'?'bi bi-sun':'bi bi-moon-stars')};lab();
 $('#theme').on('click',()=>{const n=t()==='dark'?'light':'dark';document.documentElement.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}lab()});

 // Mobile menu
 function closeMenu(){$('#menu').removeClass('open');$('#burger').attr('aria-expanded',false).attr('aria-label','Open menu').find('i').attr('class','bi bi-list');$('body').removeClass('lock')}
 $('#burger').on('click',function(){
  const o=!$('#menu').hasClass('open');
  $('#menu').toggleClass('open',o);$('body').toggleClass('lock',o);
  $(this).attr('aria-expanded',o).attr('aria-label',o?'Close menu':'Open menu').find('i').attr('class',o?'bi bi-x-lg':'bi bi-list');
 });
 $('#menu a').on('click',closeMenu);

 // Reveal on scroll
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

 // Active nav link
 const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$('#menu > a').removeClass('active').filter(`[href="#${e.target.id}"]`).addClass('active')}),{rootMargin:'-45% 0px -50% 0px'});
 document.querySelectorAll('main section[id]').forEach(s=>so.observe(s));

 // Counters
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);
  const n=+e.target.dataset.count;if(reduce){e.target.textContent=n;return}
  const s=performance.now();(function f(now){const p=Math.min((now-s)/1200,1);e.target.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(s);
 }),{threshold:.6});
 document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

 // Scroll progress (header bar + experience line)
 $(window).on('scroll',()=>{
  const h=document.documentElement;$('#bar').css('width',(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%');
  const r=document.getElementById('path').getBoundingClientRect();
  $('#pathFill').css('height',Math.max(0,Math.min(1,(innerHeight*.6-r.top)/r.height))*100+'%');
 }).trigger('scroll');
});


// Use this JavaScript code to remove the ID from the URL bar
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function () {
        setTimeout(() => {
            history.replaceState(
                null,
                '',
                window.location.pathname + window.location.search
            );
        }, 0);
    });
});