const loadingBox = document.getElementById("loadingBox");
const loadingBar = document.getElementById("loadingBar");
const intro = document.getElementById("intro");
const introLogo = document.getElementById("introLogo");
const mainContent = document.getElementById("mainContent");
const startBtn = document.getElementById("startBtn");
const carGroup = document.getElementById("carGroup");
const introCar = document.getElementById("introCar");
const hero = document.querySelector(".hero");
const initialising = document.getElementById("initialising");
document.addEventListener("DOMContentLoaded", () => {

    // Explore Button
    const exploreBtn = document.querySelector(".explore");

    exploreBtn.addEventListener("click", () => {
        document.getElementById("about").scrollIntoView({
            behavior: "smooth"
        });
    });

    // Scroll Reveal
    const hiddenElements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.2
    });

    hiddenElements.forEach(el => observer.observe(el));

});

const nextButtons = document.querySelectorAll(".next-btn");

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        const target = button.dataset.target;

        document.getElementById(target).scrollIntoView({

            behavior: "smooth"

        });

    });

});

const topBtn = document.querySelector(".top-btn");

topBtn.addEventListener("click", () => {

    document.getElementById("hero").scrollIntoView({

        behavior: "smooth"

    });

});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 18;
        const rotateX = (0.5 - y / rect.height) * 18;

        card.style.transform =
            `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    });

});

const skillSection = document.querySelector("#skills");
const fills = document.querySelectorAll(".fill");

const skillObserver = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting) {

        fills.forEach(fill => {

            fill.style.width = fill.dataset.width;

        });

    }

}, {
    threshold: 0.4
});

skillObserver.observe(skillSection);

const projectCards = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.3
});

projectCards.forEach(card => {

    projectObserver.observe(card);

});

const progress = document.querySelector(".progress-fill");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const height =
        document.documentElement.scrollHeight - window.innerHeight;

    const percent = (scrollTop / height) * 100;

    progress.style.width = percent + "%";

});

startBtn.addEventListener("click", () => {

    startBtn.style.opacity = "0";
    startBtn.style.pointerEvents = "none";

    carGroup.classList.add("engine-start");

    setTimeout(() => {

        carGroup.classList.remove("engine-start");

        // Move logo + car together
        carGroup.style.transition = "left 3.5s cubic-bezier(.22,1,.36,1)";
        if (window.innerWidth <= 768) {
            carGroup.style.left = "18%";
            } else {
                 carGroup.style.left = "30%";
            }

        // When they reach the center...
        setTimeout(() => {

            // Move ONLY the car forward
            introCar.style.transform = "translateX(120vw)";

            introLogo.classList.add("logo-glow");

            const text = "INITIALISING....";
            let i = 0;

            const typing = setInterval(() => {

                initialising.textContent += text[i];

                i++;

                if (i >= text.length) {

                    clearInterval(typing);

                    // Show loading bar
                    loadingBox.style.opacity = "1";

                    loadingBar.style.transition = "width 2.5s linear";
                    loadingBar.style.width = "100%";

                    // After loading completes
                    setTimeout(() => {

                        intro.style.transition = "opacity 1s";
                        intro.style.opacity = "0";

                        setTimeout(() => {

                            intro.style.display = "none";
                            mainContent.style.display = "block";
                            hero.classList.add("show");

                        }, 800);

                    }, 2500);

                }

            }, 120);

        }, 2500);

    }, 700);

});
