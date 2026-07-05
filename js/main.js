// MyKids - shared site behaviour

// ---------- Smooth anchor scrolling: cross-page pending hash ----------
// Cross-page links to an anchor (e.g. birthday.html#packages) land instantly with
// no animation by default - the hash-strip in <head> defers the jump to here so we
// can animate it instead. We wait for the full "load" event (not just
// DOMContentLoaded) because images above the target haven't finished loading yet at
// DOMContentLoaded - if they load afterward and shift the layout, an early scroll
// lands short/long of the real target. Re-snapping once after "load" fixes that.
function scrollToPendingHash() {
  if (!window.__pendingScrollHash) return;
  const target = document.querySelector(window.__pendingScrollHash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  window.__pendingScrollHash = null;
}
if (document.readyState === "complete") {
  setTimeout(scrollToPendingHash, 60);
} else {
  window.addEventListener("load", () => setTimeout(scrollToPendingHash, 60));
}

document.addEventListener("DOMContentLoaded", () => {
  // Same-page anchor links (dropdown nav, "Подробнее" etc. when already on that page)
  // get an explicit smooth scroll too, for consistent easing across browsers.
  document.querySelectorAll('a[href*="#"]').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    link.addEventListener("click", (e) => {
      const [path, hash] = href.split("#");
      if (!hash) return;
      const samePage = !path || path === location.pathname.split("/").pop() || path === location.pathname;
      if (!samePage) return;
      const target = document.getElementById(hash);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", `#${hash}`);
    });
  });

  // Desktop dropdown nav
  const navItems = document.querySelectorAll(".nav-item");
  const setNavItemsClosed = () => {
    navItems.forEach((i) => {
      i.classList.remove("is-open");
      i.querySelector(".nav-link")?.setAttribute("aria-expanded", "false");
    });
  };
  navItems.forEach((item) => {
    const link = item.querySelector(".nav-link");
    if (!link || !item.querySelector(".dropdown")) return;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const wasOpen = item.classList.contains("is-open");
      setNavItemsClosed();
      if (!wasOpen) {
        item.classList.add("is-open");
        link.setAttribute("aria-expanded", "true");
      }
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) setNavItemsClosed();
  });

  // Mobile nav drawer
  const burger = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileClose = document.querySelector(".mobile-nav__close");
  if (burger && mobileNav) {
    burger.addEventListener("click", () => {
      mobileNav.classList.add("is-open");
      burger.setAttribute("aria-expanded", "true");
    });
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      burger?.setAttribute("aria-expanded", "false");
    });
  }

  // FAQ accordion
  // max-height is set from the actual content height (not a guessed fixed value) so
  // long answers never get clipped, however much text they contain.
  document.querySelectorAll(".faq-item__q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("is-open");
      item.parentElement.querySelectorAll(".faq-item").forEach((i) => {
        i.classList.remove("is-open");
        i.querySelector(".faq-item__q")?.setAttribute("aria-expanded", "false");
        const a = i.querySelector(".faq-item__a");
        if (a) a.style.maxHeight = "";
      });
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        const answer = item.querySelector(".faq-item__a");
        if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Header shadow on scroll
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow = window.scrollY > 8 ? "0 4px 16px rgba(0,0,0,0.06)" : "none";
    });
  }

  // Horizontal carousel controls
  document.querySelectorAll("[data-carousel]").forEach((wrap) => {
    const track = wrap.querySelector(".carousel");
    const prev = wrap.querySelector("[data-prev]");
    const next = wrap.querySelector("[data-next]");
    if (!track) return;
    const scrollBy = () => track.clientWidth * 0.8;
    if (prev) prev.addEventListener("click", () => track.scrollBy({ left: -scrollBy(), behavior: "smooth" }));
    if (next) next.addEventListener("click", () => track.scrollBy({ left: scrollBy(), behavior: "smooth" }));
  });

  // Contact / enquiry forms - prevent real submit in this preview build
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    const email = form.querySelector("#email");
    const emailConfirm = form.querySelector("#email-confirm");
    if (email && emailConfirm) {
      const checkEmailsMatch = () => {
        emailConfirm.setCustomValidity(
          emailConfirm.value && emailConfirm.value !== email.value ? "Адреса электронной почты не совпадают" : ""
        );
      };
      email.addEventListener("input", checkEmailsMatch);
      emailConfirm.addEventListener("input", checkEmailsMatch);
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (email && emailConfirm && email.value !== emailConfirm.value) {
        emailConfirm.setCustomValidity("Адреса электронной почты не совпадают");
        emailConfirm.reportValidity();
        return;
      }
      alert("Спасибо! Форма получена (демо-режим - подключите обработку на сервере).");
      form.reset();
      if (emailConfirm) emailConfirm.setCustomValidity("");
    });
  });

  // Social posts carousel (главная, по макету)
  document.querySelectorAll(".social-carousel").forEach((wrap) => {
    const track = wrap.querySelector(".social-carousel__track");
    const prev = wrap.querySelector(".social-carousel__nav--prev");
    const next = wrap.querySelector(".social-carousel__nav--next");
    if (!track) return;
    const step = () => {
      const img = track.querySelector("img");
      return img ? img.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
    };
    prev?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  });

  // ---------- Location / booking modal ----------
  const modal = document.getElementById("location-modal");
  if (modal && typeof MYKIDS_LOCATIONS !== "undefined") {
    const cityListEl = modal.querySelector("#location-city-list");
    const parkViewEl = modal.querySelector("#location-park-list");
    const parkCardsEl = modal.querySelector("#location-park-cards");
    const backBtn = modal.querySelector(".modal__back");
    const closeBtn = modal.querySelector(".modal__close");

    function renderCities() {
      cityListEl.innerHTML = MYKIDS_LOCATIONS.map((c, i) => `
        <button class="modal__city" data-city-index="${i}">
          <span>${c.city}</span>
          <span class="modal__city-count">${c.parks.length} парк${c.parks.length > 1 ? "а" : ""} <svg class="icon icon-sm"><use href="#i-arrow-right"/></svg></span>
        </button>`).join("");
      cityListEl.querySelectorAll(".modal__city").forEach((btn) => {
        btn.addEventListener("click", () => showParks(Number(btn.dataset.cityIndex)));
      });
    }

    // Package/context of the trigger that opened the modal, used to prefill the WhatsApp message.
    let pendingPackage = null;
    // Mode of the trigger that opened the modal: null = normal booking, "price" = choosing
    // a park just to unlock the prices page (see #price-gate below).
    let modalMode = null;

    function whatsappMessage(parkName) {
      return pendingPackage
        ? `Здравствуйте! Хочу забронировать пакет ${pendingPackage} в парке «${parkName}».`
        : `Здравствуйте! Хочу узнать про бронирование в парке «${parkName}».`;
    }
    function whatsappHref(p) {
      const phoneDigits = p.phoneHref.replace(/[^\d]/g, "");
      return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(whatsappMessage(p.name))}`;
    }

    // ---------- Price gate (prices.html only) ----------
    const priceGate = document.getElementById("price-gate");
    const priceContent = document.getElementById("price-content");
    const priceSelectedBar = document.getElementById("price-selected-bar");
    const priceSelectedName = document.getElementById("price-selected-name");
    const priceChangeBtn = document.getElementById("price-change-park");
    const PRICE_PARK_KEY = "mykids_price_park";

    function revealPrices(parkName) {
      if (!priceGate || !priceContent) return;
      priceGate.hidden = true;
      priceContent.hidden = false;
      if (priceSelectedBar && priceSelectedName) {
        priceSelectedName.textContent = parkName;
        priceSelectedBar.hidden = false;
      }
    }
    function selectParkForPrices(parkName) {
      try { localStorage.setItem(PRICE_PARK_KEY, parkName); } catch (e) { /* storage unavailable */ }
      revealPrices(parkName);
      closeModal();
    }
    if (priceGate && priceContent) {
      let savedParkForPrices = null;
      try { savedParkForPrices = localStorage.getItem(PRICE_PARK_KEY); } catch (e) { /* storage unavailable */ }
      const parkStillExists = savedParkForPrices
        && MYKIDS_LOCATIONS.some((c) => c.parks.some((p) => p.name === savedParkForPrices));
      if (parkStillExists) {
        revealPrices(savedParkForPrices);
      } else if (savedParkForPrices) {
        try { localStorage.removeItem(PRICE_PARK_KEY); } catch (e) { /* storage unavailable */ }
      }
      priceChangeBtn?.addEventListener("click", () => {
        pendingPackage = null;
        modalMode = "price";
        openModal();
      });
    }

    function showParks(cityIndex) {
      const city = MYKIDS_LOCATIONS[cityIndex];
      parkCardsEl.innerHTML = city.parks.map((p) => `
        <div class="park-card">
          <div class="park-card__name">${p.name}</div>
          <div class="park-card__row"><svg class="icon icon-sm"><use href="#i-map"/></svg><a href="${p.map}" target="_blank" rel="noopener">${p.address}</a></div>
          ${p.hours ? `<div class="park-card__row"><svg class="icon icon-sm"><use href="#i-clock"/></svg><span>${p.hours}</span></div>` : ""}
          <div class="park-card__row"><svg class="icon icon-sm"><use href="#i-phone"/></svg><a href="tel:${p.phoneHref}">${p.phone}</a></div>
          <div class="park-card__row"><svg class="icon icon-sm"><use href="#i-instagram"/></svg><a href="${p.instagram}" target="_blank" rel="noopener">${p.instagramLabel}</a></div>
          <div class="park-card__actions">
            ${modalMode === "price"
              ? `<button type="button" class="btn btn--pink btn--sm btn--block price-select-btn" data-park="${p.name}">Смотреть цены для этого парка</button>`
              : `
            <a href="${whatsappHref(p)}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--sm"><svg class="icon icon-sm"><use href="#i-whatsapp"/></svg>Написать в WhatsApp</a>
            <a href="tel:${p.phoneHref}" class="btn btn--outline btn--sm"><svg class="icon icon-sm"><use href="#i-phone"/></svg>Позвонить</a>
            <a href="${p.map}" target="_blank" rel="noopener" class="btn btn--outline btn--sm"><svg class="icon icon-sm"><use href="#i-map"/></svg>На карте</a>`}
          </div>
        </div>`).join("");
      cityListEl.hidden = true;
      parkViewEl.hidden = false;
      if (modalMode === "price") {
        parkCardsEl.querySelectorAll(".price-select-btn").forEach((btn) => {
          btn.addEventListener("click", () => selectParkForPrices(btn.dataset.park));
        });
      }
    }

    function resetToCities() {
      cityListEl.hidden = false;
      parkViewEl.hidden = true;
    }

    function openModal() {
      resetToCities();
      renderCities();
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.documentElement.classList.add("modal-locked");
    }
    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.documentElement.classList.remove("modal-locked");
      pendingPackage = null;
      modalMode = null;
    }

    document.querySelectorAll('[data-open-modal="location"]').forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        pendingPackage = trigger.dataset.package || null;
        modalMode = trigger.dataset.modalMode || null;
        openModal();
        if (trigger.dataset.city) {
          const idx = MYKIDS_LOCATIONS.findIndex((c) => c.city === trigger.dataset.city);
          if (idx > -1) showParks(idx);
        }
        document.querySelector(".mobile-nav")?.classList.remove("is-open");
        document.querySelector(".burger")?.setAttribute("aria-expanded", "false");
      });
    });
    backBtn?.addEventListener("click", resetToCities);
    closeBtn?.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

    // Populate footer city list, if present on this page
    const footerCityList = document.getElementById("footer-city-list");
    if (footerCityList) {
      footerCityList.innerHTML = MYKIDS_LOCATIONS.map((c) => `
        <li><button type="button" data-open-modal="location" data-city="${c.city}">${c.city}</button></li>
      `).join("");
      footerCityList.querySelectorAll("[data-open-modal]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          pendingPackage = null;
          modalMode = null;
          openModal();
          const idx = MYKIDS_LOCATIONS.findIndex((c) => c.city === btn.dataset.city);
          if (idx > -1) showParks(idx);
        });
      });
    }
  }

  // ---------- Scroll reveal ----------
  // Two independent triggers (IntersectionObserver + manual scroll check) so content
  // never stays stuck invisible if either mechanism fails to fire in some browser/environment.
  (function () {
    const revealSelectors = ".feature-card, .pkg-card, .tile, .value-chip, .menu-card, .faq-item, .contact-list > li, .stat, .promo, .proof, .park-card";
    const revealEls = [...document.querySelectorAll(revealSelectors)];
    if (!revealEls.length) return;
    revealEls.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--reveal-delay", `${Math.min(i % 4, 3) * 0.08}s`);
    });

    const isInView = (el) => el.getBoundingClientRect().top < window.innerHeight - 40;
    const reveal = (el) => el.classList.add("is-visible");
    const checkAll = () => revealEls.forEach((el) => !el.classList.contains("is-visible") && isInView(el) && reveal(el));

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && reveal(entry.target)),
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => revealObserver.observe(el));
    }

    // Fallback: manual scroll/resize check catches anything IntersectionObserver misses.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { checkAll(); ticking = false; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    checkAll();
    // Final safety net: guarantee nothing stays invisible forever.
    setTimeout(() => revealEls.forEach(reveal), 4000);
  })();

  // ---------- Animated stat counters ----------
  document.querySelectorAll(".stat__num").forEach((el) => {
    const raw = el.textContent.trim();
    const digits = raw.replace(/\D/g, "");
    if (!digits) return;
    const target = parseInt(digits, 10);
    const suffix = raw.replace(/^[\d\s]+/, "");
    el.textContent = "0" + suffix;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const duration = 1200;
      const start = performance.now();
      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = value.toLocaleString("ru-RU") + suffix;
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    };
    const isInView = () => el.getBoundingClientRect().top < window.innerHeight - 40;
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && run()),
        { threshold: 0.5 }
      );
      obs.observe(el);
    }
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { if (isInView()) run(); ticking = false; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    if (isInView()) run();
    setTimeout(run, 4000);
  });

  // ---------- Slideshow ----------
  document.querySelectorAll(".slideshow").forEach((slideshow) => {
    const track = slideshow.querySelector(".slideshow__track");
    const slides = [...slideshow.querySelectorAll(".slideshow__slide")];
    const dotsWrap = slideshow.querySelector(".slideshow__dots");
    const prevBtn = slideshow.querySelector(".slideshow__nav--prev");
    const nextBtn = slideshow.querySelector(".slideshow__nav--next");
    if (!track || slides.length < 2 || !dotsWrap) return;
    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "slideshow__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Слайд ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = [...dotsWrap.querySelectorAll(".slideshow__dot")];

    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    }
    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
      restart();
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }
    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, 5500);
    }

    nextBtn?.addEventListener("click", next);
    prevBtn?.addEventListener("click", prev);
    slideshow.addEventListener("mouseenter", () => timer && clearInterval(timer));
    slideshow.addEventListener("mouseleave", restart);

    // swipe support
    let touchStartX = null;
    track.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
      touchStartX = null;
    });

    render();
    restart();
  });

  // ---------- Enquiry forms -> WhatsApp ----------
  // The site has no backend, so these forms don't "submit" anywhere on their own -
  // instead we build a WhatsApp message from the filled fields and open a wa.me link,
  // consistent with how booking already works everywhere else on the site.
  document.querySelectorAll(".enquiry-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const phone = form.dataset.phone;
      const lines = [];
      form.querySelectorAll("[data-field-label]").forEach((field) => {
        const value = field.value.trim();
        if (value) lines.push(`${field.dataset.fieldLabel}: ${value}`);
      });
      const text = `Здравствуйте! Заполнил(а) форму на сайте.\n${lines.join("\n")}`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      form.reset();
    });
  });
});
