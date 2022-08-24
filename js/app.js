/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

let sections = document.querySelectorAll("section");
let ul = document.querySelector("#navbar__list");
let fragment = document.createDocumentFragment();
let scrollTop = document.querySelector(".scrolltotop-btn");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNav() {
  sections.forEach((section) => {
    let li = document.createElement("li");
    let a = document.createElement("a");

    a.classList.add("menu__link");
    a.setAttribute("href", `#${section.id}`);
    a.textContent = section.dataset.nav;
    li.appendChild(a);
    fragment.appendChild(li);

    // Scroll to section on link click
    li.addEventListener("click", (e) => {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth" });
    });
    ul.appendChild(fragment);
  });
}

buildNav();

// Add class 'active' to section when near top of viewport

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.8,
};

let observer = new IntersectionObserver((entries) => {
  let activeLink = document.querySelector(`a[href="#${entries[0].target.id}"]`);

  if (entries[0].isIntersecting) {
    entries[0].target.classList.add("active");
    activeLink.classList.add("active");
  } else {
    entries[0].target.classList.remove("active");
    activeLink.classList.remove("active");
  }
}, options);

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

window.addEventListener("scroll", () => {
  sections.forEach((section) => {
    observer.observe(section);
  });
  window.scrollY > 1000
    ? (scrollTop.style.opacity = 1)
    : (scrollTop.style.opacity = 0);
});

scrollTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/**
 * End Events
 **/
