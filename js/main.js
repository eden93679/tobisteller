(() => {
  'use strict';

  /* ── Year ─────────────────────────────────── */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ── Mobile Nav Toggle ────────────────────── */
  const nav    = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Active nav link ──────────────────────── */
  const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.site-nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    const active = href === currentFile || (currentFile === '' && href === 'index.html');
    a.classList.toggle('is-active', active);
  });

  /* ── Scroll reveal ────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ── Hours – today highlight ──────────────── */
  const dayKeys  = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const todayIdx = new Date().getDay();

  document.querySelectorAll('[data-live-day]').forEach(el => {
    el.textContent = dayNames[todayIdx];
  });

  document.querySelectorAll('.hours-row[data-day]').forEach(row => {
    if (row.dataset.day === dayKeys[todayIdx]) {
      row.classList.add('is-today');
    }
  });

  /* ── Menu filter + search ─────────────────── */
  const menuGrid   = document.getElementById('menuGrid');
  const filterBtns = document.querySelectorAll('.cat-pill');
  const searchInp  = document.getElementById('menuSearch');

  if (menuGrid && filterBtns.length) {
    const cards = Array.from(menuGrid.querySelectorAll('.menu-item'));

    const applyFilter = () => {
      const active = document.querySelector('.cat-pill.is-active')?.dataset.filter || 'all';
      const q      = (searchInp?.value || '').trim().toLowerCase();
      cards.forEach(card => {
        const cat  = (card.dataset.category || '').toLowerCase();
        const name = (card.dataset.name     || '').toLowerCase();
        const show = (active === 'all' || cat === active) && (!q || name.includes(q));
        card.style.display = show ? '' : 'none';
      });
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        applyFilter();
      });
    });

    searchInp?.addEventListener('input', applyFilter);
  }

  /* ── Contact form ─────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn[type="submit"]');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Gesendet ✓';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = orig;
          btn.disabled = false;
        }, 2200);
      }
      form.reset();
    });
  }

  /* ── Subtle header shadow on scroll ──────── */
  const header = document.querySelector('.site-header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.style.boxShadow = window.scrollY > 12
            ? '0 4px 24px rgba(26,20,16,0.08)'
            : '';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

})();
