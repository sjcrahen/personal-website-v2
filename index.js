// sendEmail listeners
const modalForm = document.querySelector("#modal-form");
modalForm.addEventListener("submit", event => sendEmail(event));

const form = document.querySelector("#form");
form.addEventListener("submit", event => sendEmail(event));

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

// reset form buttons
function resetFormSendButton() {
    const modalButton = document.querySelector("#modal-submit");
    modalButton.value = "Send";
    modalButton.style.color = "";

    const button = document.querySelector("#submit");
    button.value = "Send";
    button.style.color = "";
}

// open and close resume modal
function getResume() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth ||0);

    // for larger viewports show modal
    if (vw >= 992) {
        const resumeModal = document.querySelector("#resume-modal");
        const backdrop = document.querySelector("#backdrop");
        const downloadIcon = document.querySelector("#download-icon");
        const closeButton = document.querySelector("#close-resume-modal");

        //show modal
        resumeModal.style.display = "block";
        backdrop.style.display = "block";

        // download the resume
        downloadIcon.onclick = () => openResume();

        // allow closing the modal
        closeButton.onclick = () => {
            resumeModal.style.display = "none";
            backdrop.style.display = "none";
            resetFormSendButton();
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
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth ||0);

    if (vw >= 768) {
        const contactModal = document.querySelector("#contact-modal");
        const backdrop = document.querySelector("#backdrop");
        const closeButton = document.querySelector("#close-contact-modal");

        // show modal
        contactModal.style.display = "block";
        backdrop.style.display = "block";

        // allow closing the modal
        closeButton.onclick = () => {
            resetFormSendButton();
            contactModal.style.display = "none";
            backdrop.style.display = "none";
        }
    } else {
        location.href = "#contact";
    }
}