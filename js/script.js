document.addEventListener("DOMContentLoaded", () => {
  // One navigation controller that supports both the main-site and article-page markup.
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links") || document.querySelector("#site-navigation");

  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove("open", "is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
      document.body.classList.remove("nav-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.contains("open") || menu.classList.contains("is-open");
      menu.classList.toggle("open", !isOpen);
      menu.classList.toggle("is-open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      document.body.classList.toggle("nav-open", !isOpen);
    });

    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const articleCards = document.querySelectorAll(".article-card[data-category]");
  if (filterButtons.length && articleCards.length) {
    filterButtons.forEach(btn => btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      filterButtons.forEach(b => b.setAttribute("aria-selected", String(b === btn)));
      articleCards.forEach(card => {
        card.hidden = !(category === "all" || card.dataset.category === category);
      });
    }));
  }

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
