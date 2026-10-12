console.log("Welcome to Kris English Room!");

const footerYear = document.querySelector("#footer-year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

const backToTop = document.querySelector("#back-to-top");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTop.classList.add("mostrar");
        } else {
            backToTop.classList.remove("mostrar");
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

const buttons = document.querySelectorAll(".hero-boton, .boton-secundario");

buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        console.log("Thank you for visiting Kris English Room!");

    });

});

const form = document.querySelector("#contact-form");

if (form) {

    form.addEventListener("submit", function (event) {

        const name = document.querySelector("#name");
        const email = document.querySelector("#email");
        const message = document.querySelector("#message");

        if (
            name.value.trim() === "" ||
            email.value.trim() === "" ||
            message.value.trim() === ""
        ) {

            event.preventDefault();

            alert("Please complete all the required fields.");

        } else {

            alert("Thank you! Your message has been sent.");

        }

    });

}

const encabezado = document.querySelector(".encabezado");

console.log("Encabezado encontrado:", encabezado);


const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".encabezado nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("menu-abierto");

        menuButton.setAttribute("aria-expanded", String(isOpen));

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.querySelector("span").textContent = isOpen ? "×" : "☰";
    });

    navigation.querySelectorAll('a:not(.logo)').forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("menu-abierto");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.querySelector("span").textContent = "☰";
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" &&
            navigation.classList.contains("menu-abierto")) {
            navigation.classList.remove("menu-abierto");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.querySelector("span").textContent = "☰";
            menuButton.focus();
        }
    });
}
