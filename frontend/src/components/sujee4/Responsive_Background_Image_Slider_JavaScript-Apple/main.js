const slides = document.querySelectorAll('.img-slide');
const navButtons = document.querySelectorAll('.nav-btn');
const contents = document.querySelectorAll('.content');


let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    navButtons[currentSlide].classList.remove('active');
    contents[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add('active');
    navButtons[currentSlide].classList.add('active');
    contents[currentSlide].classList.add('active');
}

setInterval(nextSlide, 5000); // Switch every 3 seconds

const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navigation.classList.toggle("active");
});

const btns = document.querySelectorAll(".nav-btn");

function sliderNav(manual) {
    btns.forEach((btn) => {
        btn.classList.remove("active");
    });

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    contents.forEach((content) => {
        content.classList.remove("active");
    });

    btns[manual].classList.add("active");
    slides[manual].classList.add("active");
    contents[manual].classList.add("active");
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        sliderNav(i);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const navLink = dropdown.querySelector('.nav-link');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        navLink.addEventListener('click', () => {
            // Hide all dropdowns
            hideAllDropdowns();

            // Toggle the visibility of the clicked dropdown
            dropdownContent.classList.toggle('active');
        });
    });

    // Hide all dropdowns when clicking anywhere on the page
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            hideAllDropdowns();
        }
    });

    function hideAllDropdowns() {
        const activeDropdowns = document.querySelectorAll('.dropdown-content.active');
        activeDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

