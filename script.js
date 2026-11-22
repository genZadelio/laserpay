document.documentElement.classList.add('js');

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

document.addEventListener('DOMContentLoaded', () => {
  const header = $('#siteHeader');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Desktop dropdowns
  const navItems = $$('.nav-item');
  navItems.forEach((item) => {
    const trigger = $('.nav-link', item);
    trigger?.addEventListener('click', (event) => {
      event.stopPropagation();
      const wasOpen = item.classList.contains('is-open');
      navItems.forEach((other) => {
        other.classList.remove('is-open');
        $('.nav-link', other)?.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 980) {
        navItems.forEach((other) => other.classList.remove('is-open'));
        item.classList.add('is-open');
        trigger?.setAttribute('aria-expanded', 'true');
      }
    });
    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 980) {
        item.classList.remove('is-open');
        trigger?.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('click', () => {
    navItems.forEach((item) => {
      item.classList.remove('is-open');
      $('.nav-link', item)?.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      navItems.forEach((item) => item.classList.remove('is-open'));
      closeMobileMenu();
    }
  });

  // Mobile navigation
  const mobileMenu = $('#mobileMenu');
  const mobileToggle = $('.mobile-toggle');
  function closeMobileMenu() {
    mobileMenu?.classList.remove('is-open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    const icon = mobileToggle?.querySelector('use');
    if (icon) icon.setAttribute('href', '#i-menu');
  }
  mobileToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = mobileMenu.classList.toggle('is-open');
    mobileToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    const icon = mobileToggle.querySelector('use');
    if (icon) icon.setAttribute('href', open ? '#i-close' : '#i-menu');
  });
  $('.mobile-menu__close')?.addEventListener('click', closeMobileMenu);
  $$('#mobileMenu a').forEach((link) => link.addEventListener('click', closeMobileMenu));

  // Hero carousel
  const slides = $$('.hero-slide');
  const dotsWrap = $('.hero-dots');
  let activeSlide = 0;
  let heroTimer;
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show slide ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    dotsWrap?.appendChild(dot);
  });
  const dots = $$('.hero-dots button');
  function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === activeSlide));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === activeSlide));
  }
  function restartHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => showSlide(activeSlide + 1), 6500);
  }
  $('.hero-arrow--next')?.addEventListener('click', () => { showSlide(activeSlide + 1); restartHeroTimer(); });
  $('.hero-arrow--prev')?.addEventListener('click', () => { showSlide(activeSlide - 1); restartHeroTimer(); });
  $('.hero')?.addEventListener('mouseenter', () => clearInterval(heroTimer));
  $('.hero')?.addEventListener('mouseleave', restartHeroTimer);
  showSlide(0);
  restartHeroTimer();

  // Industry tabs
  const industryData = {
    commerce: {
      label: 'E-COMMERCE',
      title: 'Example: unify online and in-store payment views.',
      description: 'This fictional scenario illustrates how a merchant dashboard could arrange payments, reporting, and risk-control concepts.',
      points: ['Sample checkout layout', 'Illustrative reporting states', 'Fictional risk controls'],
      count: 'Illustrative commerce scenario — no customer data',
      image: 'assets/images/industry-commerce.jpg',
      alt: 'E-commerce solution',
      metric: 'Example',
      metricLabel: 'sample transaction'
    },
    education: {
      label: 'EDUCATION',
      title: 'Example: simplify course-fee workflows.',
      description: 'A fictional education scenario demonstrates layouts for fees, installments, reminders, and educator-payout summaries.',
      points: ['Sample fee layouts', 'Illustrative reminders', 'Fictional payout summaries'],
      count: 'Illustrative education scenario — no institution data',
      image: 'assets/images/industry-education.jpg',
      alt: 'Education payments solution',
      metric: 'Example',
      metricLabel: 'sample collection'
    },
    bfsi: {
      label: 'BFSI',
      title: 'Example: reconcile collection workflows.',
      description: 'A fictional finance scenario demonstrates how collections, recurring-payment states, and reconciliation labels could be presented.',
      points: ['Sample collection layouts', 'Illustrative reconciliation', 'Fictional routing states'],
      count: 'Illustrative finance scenario — no company data',
      image: 'assets/images/industry-finance.jpg',
      alt: 'Financial services solution',
      metric: 'Example',
      metricLabel: 'sample reconciliation'
    },
    saas: {
      label: 'SAAS',
      title: 'Example: present multi-currency subscriptions.',
      description: 'A fictional software scenario illustrates currency, subscription, and vendor-payout dashboard states.',
      points: ['Multi-currency example', 'Sample subscription states', 'Fictional vendor summaries'],
      count: 'Illustrative software scenario — no team data',
      image: 'assets/images/industry-saas.jpg',
      alt: 'SaaS team collaborating',
      metric: 'Example',
      metricLabel: 'sample volume'
    },
    freelancer: {
      label: 'FREELANCER',
      title: 'Example: create a sample payment request.',
      description: 'A fictional independent-work scenario illustrates payment-link, storefront, and currency interface layouts.',
      points: ['Sample payment-link layout', 'Illustrative storefront', 'Fictional currency states'],
      count: 'Illustrative freelancer scenario — no professional data',
      image: 'assets/images/hero-founder.jpg',
      alt: 'Independent professional',
      metric: 'Example',
      metricLabel: 'sample invoice'
    }
  };
  const industryPanel = $('#industryPanel');
  const industryImage = $('#industryImage');
  $$('.industry-tabs button').forEach((button) => {
    button.addEventListener('click', () => {
      const data = industryData[button.dataset.industry];
      if (!data || !industryPanel) return;
      $$('.industry-tabs button').forEach((tab) => {
        tab.classList.toggle('is-active', tab === button);
        tab.setAttribute('aria-selected', String(tab === button));
      });
      industryPanel.classList.add('is-switching');
      window.setTimeout(() => {
        $('.industry-panel__copy .eyebrow').textContent = data.label;
        $('.industry-panel__copy h3').textContent = data.title;
        $('.industry-panel__copy > p').textContent = data.description;
        const list = $('.industry-panel__copy ul');
        list.innerHTML = data.points.map((point) => `<li><svg><use href="#i-check"/></svg> ${point}</li>`).join('');
        $('.industry-panel__count').textContent = data.count;
        $('.industry-float strong').textContent = data.metric;
        $('.industry-float small').innerHTML = `<i></i> ${data.metricLabel}`;
        industryImage.src = data.image;
        industryImage.alt = data.alt;
        industryPanel.classList.remove('is-switching');
      }, 180);
    });
  });

  // Reveal on scroll
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Code language tabs
  $$('.code-tabs button').forEach((button) => {
    button.addEventListener('click', () => {
      $$('.code-tabs button').forEach((tab) => tab.classList.toggle('is-active', tab === button));
    });
  });

  // FAQ: one answer at a time
  const faqItems = $$('.faq__list details');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach((other) => { if (other !== item) other.open = false; });
    });
  });

  // Informational demo dialog. This project intentionally has no authentication form.
  const dialog = $('#authDialog');
  const authTitle = $('#authTitle');
  const authSubtitle = $('#authSubtitle');
  const authEyebrow = $('#authEyebrow');
  function openModal() {
    authTitle.textContent = 'Explore the interface';
    authSubtitle.textContent = 'Explore this non-transactional UI concept without creating an account.';
    authEyebrow.textContent = 'LASERPAY EDUCATIONAL CONCEPT';
    if (dialog?.showModal) dialog.showModal();
  }
  $$('[data-modal]').forEach((button) => button.addEventListener('click', openModal));
  $('.auth-dialog__close')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });

  // Small toast for utility actions
  const toast = $('#toast');
  let toastTimer;
  function showToast(title, message = 'We’ll be in touch shortly.') {
    if (!toast) return;
    $('strong', toast).textContent = title;
    $('small', toast).textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3600);
  }
  $('.ask-button')?.addEventListener('click', () => showToast('Example assistant', 'This local demo does not send questions to an AI or support service.'));
  $('.icon-button')?.addEventListener('click', () => showToast('Language selector', 'This control is illustrative in the demo.'));

  // Keep in-page actions feeling like a product, not dead links.
  $$('a[href="#footer"]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    showToast('Demo information', 'This educational concept has no live support or financial services.');
  }));

});
