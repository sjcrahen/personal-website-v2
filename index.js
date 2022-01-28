// variables
const modalForm = document.querySelector("#modal-form");
const form = document.querySelector("#form");
const inputs = document.querySelectorAll("form > input, form > textarea");
const sendButtons = document.querySelectorAll(".submit-button");
const resumeModal = document.querySelector("#resume-modal");
const backdrop = document.querySelector("#backdrop");
const downloadIcon = document.querySelector("#download-icon");
const resumeCloseButton = document.querySelector("#close-resume-modal");
const contactModal = document.querySelector("#contact-modal");
const contactCloseButton = document.querySelector("#close-contact-modal");
const nav = document.querySelector("#nav");
const navContainer = document.querySelector("#nav-container");
const navLinks = document.querySelectorAll("#nav-container a");
const contactLink = document.querySelector("#contact-link");
const topLinks = document.querySelectorAll("div h2 a");
const resumeLink = document.querySelector(".about-flex-p a");

// listeners
modalForm.addEventListener("submit", sendEmail);
form.addEventListener("submit", sendEmail);
inputs.forEach(input => input.addEventListener("focus", resetSendButton));
window.addEventListener("resize", initResponsiveNav);
navLinks.forEach(link => link.addEventListener("click", showHideMenu));
contactLink.addEventListener("click", showContact);
topLinks.forEach(link => link.addEventListener("click", collapseMenu));
resumeLink.addEventListener("click", getResume);

//handle response nav bar on window size
function initResponsiveNav() {
    if (window.innerWidth < 601) {
        collapseMenu();
    } else {
        navContainer.style.backgroundColor = "rgba(2, 12, 27, .8)";
    }
}

// toggle menu for small screens
function showHideMenu() {
    if (nav.className === "main-nav") {
        nav.classList.add("responsive");
        navContainer.style.backgroundColor = "rgba(2, 12, 27, .8)";
    } else {
        collapseMenu();
    }
}

function collapseMenu() {
    if (window.innerWidth < 601) {
        nav.classList.remove("responsive");
        navContainer.style.backgroundColor = "rgba(2, 12, 27, 0)";
    }
}

// send email to aws api gateway -> aws lambda -> aws ses
function sendEmail(event) {
    event.preventDefault();

    const form = event.target;

    if (form.id === "modal-form") {
        var button = document.querySelector("#modal-submit");
    } else {
        var button = document.querySelector("#submit");
    }
    if (button) {
        button.value = "Sending ...";
    }

    const {name, email, subject, message} = event.target;
    const endpoint = "https://53wpstdce3.execute-api.us-east-1.amazonaws.com/default/sendEmail"

    const body = JSON.stringify({
        senderName: name.value,
        senderEmail: email.value,
        subject: subject.value,
        message: message.value
    });

    const requestOptions = {
        method: "POST",
        body
    };

    fetch(endpoint, requestOptions)
        .then((response) => {
        if (!response.ok) throw new Error("Error in fetch");
        return response.json();
    })
    .then((response) => {
        if (button) {
            button.value = "Thank you!";
            button.style.color = "";
            button.style.backgroundColor = ""
            form.reset();
        }
    })
    .catch((error) => {
        if (button) {
            button.value = "ERROR!";
            button.style.color = "red";
            button.style.backgroundColor = ""
            form.reset();
        }
    });
}

function resetSendButton() {
    sendButtons.forEach(btn => {
        btn.value = "Send";
        btn.style.color = ""
    });
}

// open and close resume modal
function getResume() {

    // for larger viewports show modal
    if (window.innerWidth >= 992) {

        //show modal
        resumeModal.style.display = "block";
        backdrop.style.display = "block";

        // download the resume
        downloadIcon.onclick = () => openResume();

        // allow closing the modal
        resumeCloseButton.onclick = () => {
            resumeModal.style.display = "none";
            backdrop.style.display = "none";
        }
    } else { // small viewports
        openResume(); 
    }
}

function openResume() {
    window.open("Shawn_Crahen_Resume_2022.pdf");
}

// show contact modal on large screens
function showContact() {
    if (window.innerWidth >= 992) {

        // show modal
        contactModal.style.display = "block";
        backdrop.style.display = "block";

        // allow closing the modal
        contactCloseButton.onclick = () => {
            contactModal.style.display = "none";
            backdrop.style.display = "none";
        }
    } else {
        location.href = "#contact";
    }
}