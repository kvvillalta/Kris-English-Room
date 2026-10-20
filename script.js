
/* ========================================
   AÑO DEL FOOTER
======================================== */

const footerYear = document.querySelector("#footer-year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}


/* ========================================
   BOTÓN VOLVER ARRIBA
======================================== */

const backToTop = document.querySelector("#back-to-top");

if (backToTop) {
    window.addEventListener("scroll", function () {
        backToTop.classList.toggle(
            "mostrar",
            window.scrollY > 300
        );
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* ========================================
   VALIDACIÓN DEL FORMULARIO
======================================== */

const form = document.querySelector("#contact-form");

if (form) {
        form.noValidate = true;
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const subject = form.querySelector("#subject-field");
    const message = form.querySelector("#message");
    const status = document.querySelector("#form-status");

    const fields = [
        {
            element: name,
            error: document.querySelector("#error-name")
        },
        {
            element: email,
            error: document.querySelector("#error-email")
        },
        {
            element: subject,
            error: document.querySelector("#error-subject")
        },
        {
            element: message,
            error: document.querySelector("#error-message")
        }
    ];

    
function setError(field, text) {
    field.element.setCustomValidity(text);

    if (text) {
        field.element.setAttribute("aria-invalid", "true");
    } else {
        field.element.removeAttribute("aria-invalid");
    }

    if (field.error) {
        field.error.textContent = text;
    }
}


    function validateName() {
        const value = name.value.trim();
        let error = "";

        if (!value) {
            error = "Please enter your name.";
        } else if (value.length < 2) {
            error = "Your name must contain at least 2 characters.";
        } else if (value.length > 80) {
            error = "Your name cannot exceed 80 characters.";
        }

        setError(fields[0], error);
        return error === "";
    }

    function validateEmail() {
        const value = email.value.trim();
        let error = "";

        if (!value) {
            error = "Please enter your email address.";
        } else if (value.length > 254) {
            error = "Your email cannot exceed 254 characters.";
        } else if (/\s/.test(value)) {
            error = "Your email cannot contain spaces.";
        } else if (email.validity.typeMismatch) {
            error = "Please enter a valid email address.";
        }

        setError(fields[1], error);
        return error === "";
    }

    function validateSubject() {
        const value = subject.value.trim();
        let error = "";

        if (!value) {
            error = "Please enter a subject.";
        } else if (value.length < 3) {
            error = "The subject must contain at least 3 characters.";
        } else if (value.length > 100) {
            error = "The subject cannot exceed 100 characters.";
        }

        setError(fields[2], error);
        return error === "";
    }

    function validateMessage() {
        const value = message.value.trim();
        let error = "";

        if (!value) {
            error = "Please enter your message.";
        } else if (value.length < 10) {
            error = "Your message must contain at least 10 characters.";
        } else if (value.length > 1000) {
            error = "Your message cannot exceed 1000 characters.";
        }

        setError(fields[3], error);
        return error === "";
    }

    const validators = [
        validateName,
        validateEmail,
        validateSubject,
        validateMessage
    ];

    function validateAllFields() {
        return validators.map(function (validate) {
            return validate();
        }).every(Boolean);
    }

    fields.forEach(function (field, index) {
        const element = field.element;

        if (!element) {
            return;
        }

        element.addEventListener("input", function () {
            validators[index]();

            if (status) {
                status.textContent = "";
            }
        });
    });

    form.addEventListener("submit", function (event) {
        if (!validateAllFields()) {
            event.preventDefault();

            if (status) {
                status.textContent =
                    "Please correct the indicated fields.";
            }

            const firstInvalid = fields.find(function (field) {
                return !field.element.validity.valid;
            });

            if (firstInvalid) {
                firstInvalid.element.focus();
                firstInvalid.element.reportValidity();
            }

            return;
        }

        name.value = name.value.trim();
        email.value = email.value.trim();
        subject.value = subject.value.trim();
        message.value = message.value.trim();

        if (status) {
            status.textContent = "Sending your message...";
        }

        /*
          El envío válido continúa normalmente hacia Web3Forms.
          Web3Forms gestiona el envío y la redirección configurada
          en el campo oculto "redirect".
        */
    });
}


/* ========================================
   MENÚ MÓVIL
======================================== */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".encabezado nav");

if (menuButton && navigation) {
    function closeMenu() {
        navigation.classList.remove("menu-abierto");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        const icon = menuButton.querySelector("span");

        if (icon) {
            icon.textContent = "☰";
        }
    }

    menuButton.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("menu-abierto");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        const icon = menuButton.querySelector("span");

        if (icon) {
            icon.textContent = isOpen ? "×" : "☰";
        }
    });

    navigation.querySelectorAll("a:not(.logo)").forEach(
        function (link) {
            link.addEventListener("click", closeMenu);
        }
    );

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            navigation.classList.contains("menu-abierto")
        ) {
            closeMenu();
            menuButton.focus();
        }
    });
}
