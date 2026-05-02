/* ── WAIT FOR LIBS ── */
window.addEventListener('load', () => {

  /* ─── AOS Init ─── */
  document.body.classList.add('aos-ready');
  AOS.init({ duration: 750, easing: 'ease-out-cubic', once: true, offset: 60, disable: false });
  AOS.refresh();

  /* ─── GSAP Register ─── */
  gsap.registerPlugin(ScrollTrigger);

  /* ─── CUSTOM CURSOR ─── */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  (function animFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animFollower);
  })();

  /* ─── SCROLL PROGRESS ─── */
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  });

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));

  /* ─── HAMBURGER ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  }));

  /* ─── ACTIVE NAV LINK ─── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current && !a.classList.contains('btn-nav'));
    });
  }, { passive: true });

  /* ─── PARTICLES CANVAS ─── */
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '108,99,255' : '0,212,255';
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  // Connect nearby particles
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108,99,255,${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* ─── GSAP HERO ENTRANCE ─── */
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl
    .to('#hero-content', { opacity: 1, duration: 0 })
    .from('#hero-badge',  { opacity: 0, y: -30, duration: .6, ease: 'back.out(1.7)' })
    .from('#hero-title',  { opacity: 0, y: 60, duration: .8, ease: 'power3.out' }, '-=.2')
    .from('#hero-type',   { opacity: 0, y: 30, duration: .6, ease: 'power2.out' }, '-=.4')
    .from('#hero-sub',    { opacity: 0, y: 20, duration: .6, ease: 'power2.out' }, '-=.35')
    .from('#hero-cta',    { opacity: 0, y: 20, duration: .5, ease: 'power2.out' }, '-=.3')
    .from('#hero-socials',{ opacity: 0, y: 16, duration: .5, ease: 'power2.out' }, '-=.25')
    .from('.scroll-hint', { opacity: 0, duration: .5 }, '-=.1');

  /* ─── TYPED.JS ─── */
  new Typed('#typed-target', {
    strings: ['Angular Apps.', 'Scalable UIs.', 'ERP Systems.', 'LMS Platforms.', 'Clean Code.'],
    typeSpeed: 65,
    backSpeed: 40,
    backDelay: 1800,
    loop: true,
    smartBackspace: true,
  });

  /* ─── VANILLA TILT ─── */
  VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
    max: 8, speed: 400, glare: true, 'max-glare': 0.12,
    gyroscope: false, scale: 1.02,
  });

  /* ─── COUNTER ANIMATION ─── */
  const counters = document.querySelectorAll('.counter');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current) + suffix;
      }, 16);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  /* ─── GSAP SCROLL: Section titles split reveal ─── */
  document.querySelectorAll('.section-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: { trigger: title, start: 'top 88%' },
      opacity: 0, y: 50, duration: .9, ease: 'power3.out',
    });
  });

  /* ─── GSAP SCROLL: Timeline line draw ─── */
  gsap.from('.timeline::before', {
    scrollTrigger: { trigger: '.timeline', start: 'top 80%', end: 'bottom 30%', scrub: 1 },
    scaleY: 0, transformOrigin: 'top',
  });

  /* ─── GSAP SCROLL: Skill icons spin on enter ─── */
  document.querySelectorAll('.skill-icon').forEach(icon => {
    gsap.from(icon, {
      scrollTrigger: { trigger: icon, start: 'top 90%' },
      rotation: -180, opacity: 0, duration: .8, ease: 'back.out(1.4)',
    });
  });

  /* ─── MAGNETIC BUTTON EFFECT ─── */
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      gsap.to(el, { x: x * 0.28, y: y * 0.28, duration: .3, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1, 0.4)' });
    });
  });

  /* ─── GSAP SCROLL: Project cards stagger ─── */
  gsap.from('.project-card', {
    scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
    opacity: 0, y: 60, stagger: 0.12, duration: .8, ease: 'power3.out',
  });

  /* ─── CONTACT FORM ─── */
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    gsap.to(btn, { scale: 0.95, duration: .1, yoyo: true, repeat: 1 });
    btn.textContent = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    btn.style.boxShadow = '0 8px 30px rgba(34,197,94,.4)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message 🚀';
      btn.style.background = '';
      btn.style.boxShadow = '';
      btn.disabled = false;
      this.reset();
    }, 3500);
  });

  /* ─── INPUT LABEL FLOAT EFFECT ─── */
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => gsap.to(input.previousElementSibling, { color: '#6c63ff', duration: .2 }));
    input.addEventListener('blur', () => gsap.to(input.previousElementSibling, { color: '#8892a4', duration: .2 }));
  });

  /* ─── GSAP PARALLAX ORBS on mouse ─── */
  document.addEventListener('mousemove', e => {
    const xf = (e.clientX / window.innerWidth - 0.5) * 30;
    const yf = (e.clientY / window.innerHeight - 0.5) * 30;
    gsap.to('.orb1', { x: xf * 1.2, y: yf * 1.2, duration: 1.5, ease: 'power1.out' });
    gsap.to('.orb2', { x: -xf, y: -yf, duration: 2, ease: 'power1.out' });
    gsap.to('.orb3', { x: xf * 0.5, y: yf * 0.5, duration: 1.8, ease: 'power1.out' });
  });

});
