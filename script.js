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