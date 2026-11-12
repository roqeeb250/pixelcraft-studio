
/* =================================
   PIXELCRAFT STUDIO
   MAIN JAVASCRIPT
================================= */


/* =================================
   MOBILE NAVIGATION
================================= */

// GET THE MENU ELEMENTS
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// OPEN AND CLOSE THE MOBILE MENU
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // CLOSE MENU AFTER CLICKING A LINK
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


/* =================================
   CONTACT FORM - FORMSPREE
================================= */

// GET THE CONTACT FORM ELEMENTS
const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

// CONNECT THE FORM TO FORMSPREE
if (contactForm && formMessage) {

    contactForm.addEventListener("submit", async function (event) {

        // STOP THE DEFAULT FORM SUBMISSION
        event.preventDefault();

        // CHECK THAT REQUIRED FIELDS ARE VALID
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // GET THE SUBMIT BUTTON
        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        // SAVE THE ORIGINAL BUTTON TEXT
        const originalButtonText = submitButton
            ? submitButton.textContent
            : "";

        // SHOW SENDING MESSAGE
        formMessage.textContent = "Sending your message...";
        formMessage.classList.remove("success", "error");

        // PREVENT MULTIPLE SUBMISSIONS
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {

            // SEND THE FORM DATA TO FORMSPREE
            const response = await fetch(
                "https://formspree.io/f/mjywkegb",
                {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            // CHECK THE RESPONSE
            if (response.ok) {

                // SHOW SUCCESS MESSAGE
                formMessage.textContent =
                    "Thank you! Your message has been sent successfully. We will get back to you soon.";

                formMessage.classList.add("success");

                // CLEAR THE FORM
                contactForm.reset();

            } else {

                // SHOW FORMSPREE ERROR
                const result = await response.json();

                if (result.errors) {
                    formMessage.textContent =
                        result.errors.map(error => error.message).join(", ");
                } else {
                    formMessage.textContent =
                        "Sorry, your message could not be sent. Please try again.";
                }

                formMessage.classList.add("error");
            }

        } catch (error) {

            // HANDLE CONNECTION ERRORS
            formMessage.textContent =
                "Network error. Please check your internet connection and try again.";

            formMessage.classList.add("error");

        } finally {

            // RESTORE THE BUTTON
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}


/* =================================
   FOOTER CURRENT YEAR
================================= */

// UPDATE FOOTER YEAR AUTOMATICALLY
const footerYear = document.querySelector("#footer-year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}
