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
      title: 'Turn first-time buyers into loyal customers.',
      description: 'Bring online and in-store payments together, lift conversion and reduce fraud with one intelligent payment stack.',
      points: ['Smart checkout that converts', 'Unified multi-channel reporting', 'Built-in fraud protection'],
      count: '+ 70,000 businesses trust Laserpay',
      image: 'assets/images/industry-commerce.jpg',
      alt: 'E-commerce solution',
      metric: '₹ 24.8L',
      metricLabel: '+18.4% revenue'
    },
    education: {
      label: 'EDUCATION',
      title: 'Make every fee payment feel simple.',
      description: 'Collect course and institution fees, manage installments and pay your educators on time from one focused workspace.',
      points: ['Flexible fee collection', 'Automated reminders', 'Bulk educator payouts'],
      count: '+ 21,000 institutions grow with Laserpay',
      image: 'assets/images/industry-education.jpg',
      alt: 'Education payments solution',
      metric: '₹ 12.4L',
      metricLabel: '+9.8% collected'
    },
    bfsi: {
      label: 'BFSI',
      title: 'Build financial experiences that scale.',
      description: 'Streamline collections, automate recurring payments and reconcile every transaction with a secure, flexible stack.',
      points: ['Smart collection workflows', 'Real-time reconciliation', 'Risk-aware payment routing'],
      count: '+ 2,800 fintechs use Laserpay',
      image: 'assets/images/industry-finance.jpg',
      alt: 'Financial services solution',
      metric: '₹ 8.9L',
      metricLabel: '+22.1% efficiency'
    },
    saas: {
      label: 'SAAS',
      title: 'Make global growth feel local.',
      description: 'Accept payments in more than 100 currencies, support flexible subscriptions and manage vendor payouts without friction.',
      points: ['100+ currencies', 'Flexible subscriptions', 'Global vendor payouts'],
      count: '+ 13,500 software teams powered',
      image: 'assets/images/industry-saas.jpg',
      alt: 'SaaS team collaborating',
      metric: '$ 42.6K',
      metricLabel: '+31.4% global revenue'
    },
    freelancer: {
      label: 'FREELANCER',
      title: 'Get paid for the work you are proud of.',
      description: 'Accept payments without a website, create a branded storefront and get paid across the world with no extra setup.',
      points: ['No-code payment links', 'Your own payment page', 'Global currency support'],
      count: '+ 38,000 independent professionals',
      image: 'assets/images/hero-founder.jpg',
      alt: 'Independent professional',
      metric: '₹ 1.8L',
      metricLabel: '+16.2% earnings'
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

  // Auth dialog
  const dialog = $('#authDialog');
  const authTitle = $('#authTitle');
  const authSubtitle = $('#authSubtitle');
  const authEyebrow = $('#authEyebrow');
  const authSubmit = $('#authSubmit');
  let authMode = 'signup';
  function openModal(mode) {
    authMode = mode;
    const signup = mode === 'signup';
    authTitle.textContent = signup ? 'Create your account' : 'Welcome back';
    authSubtitle.textContent = signup ? 'Start accepting payments in minutes.' : 'Log in to your Laserpay workspace.';
    authEyebrow.textContent = signup ? 'WELCOME TO LASERPAY' : 'YOUR LASERPAY ACCOUNT';
    authSubmit.innerHTML = `${signup ? 'Create account' : 'Log in'} <svg><use href="#i-arrow"/></svg>`;
    if (dialog?.showModal) dialog.showModal();
  }
  $$('[data-modal]').forEach((button) => button.addEventListener('click', () => openModal(button.dataset.modal)));
  $('.auth-dialog__close')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });
  $('#authForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = $('#authSubmit');
    submit.disabled = true;
    submit.textContent = authMode === 'signup' ? 'Creating your account…' : 'Logging in…';
    window.setTimeout(() => {
      form.reset();
      submit.disabled = false;
      submit.innerHTML = `${authMode === 'signup' ? 'Create account' : 'Log in'} <svg><use href="#i-arrow"/></svg>`;
      dialog?.close();
      showToast(authMode === 'signup' ? 'Account request received' : 'Welcome back');
    }, 700);
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
  $('.ask-button')?.addEventListener('click', () => showToast('Laser is ready', 'Ask us anything about payments, payouts or banking.'));
  $('.icon-button')?.addEventListener('click', () => showToast('Language selector', 'More languages are coming soon.'));

  // Keep in-page actions feeling like a product, not dead links.
  $$('a[href="#footer"]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    showToast('Laserpay support', 'Our team is available 24/7 for your questions.');
  }));

  $('#year').textContent = new Date().getFullYear();
});
