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

            if(entry.isIntersecting){
                entry.target.classList.add("show");
            }

        });

    },{
        threshold:0.2
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

        behavior:"smooth"

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

        if(link.getAttribute("href") === "#" + current){

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

    if(entries[0].isIntersecting){

        fills.forEach(fill=>{

            fill.style.width = fill.dataset.width;

        });

    }

},{
    threshold:0.4
});

skillObserver.observe(skillSection);

const projectCards = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.3
});

projectCards.forEach(card=>{

    projectObserver.observe(card);

});

const progress = document.querySelector(".progress-fill");

window.addEventListener("scroll",()=>{

    const scrollTop = window.scrollY;

    const height =
    document.documentElement.scrollHeight - window.innerHeight;

    const percent = (scrollTop / height) * 100;

    progress.style.width = percent + "%";

});