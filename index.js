window.onload = new (function () {
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
  const nav = document.querySelector("#mobile-nav");
  const navContainer = document.querySelector(".mobile-nav-container");
  const navLinks = document.querySelectorAll("a.mobile.navlink");
  const contactLink = document.querySelector("#contact-link");
  const topLinks = document.querySelectorAll("div h2 a");
  const resumeLink = document.querySelector(".about-flex-p a");
  const hamburger = document.querySelector("#hamburger");

  if (window.innerWidth > 600) {
    console.log("test");
    navContainer.classList.remove("transparent");
  }

  // listeners
  modalForm.addEventListener("submit", sendEmail);
  form.addEventListener("submit", sendEmail);
  inputs.forEach((input) => input.addEventListener("focus", resetSendButton));
  window.addEventListener("resize", initResponsiveNav);
  navLinks.forEach((link) => link.addEventListener("click", showHideMenu));
  contactLink.addEventListener("click", showContact);
  topLinks.forEach((link) => link.addEventListener("click", collapseMenu));
  resumeLink.addEventListener("click", getResume);
  hamburger.addEventListener("click", toggleHamburger);

  //handle response nav bar on window size
  function initResponsiveNav() {
    if (window.innerWidth < 601) {
      collapseMenu();
    } else {
      navContainer.classList.remove("transparent");
    }
  }

  // toggle menu for small screens
  function showHideMenu() {
    if (nav.className !== "mobile-nav open") {
      nav.classList.add("open");
      navLinks.forEach((e) => e.classList.add("responsive"));
      navContainer.classList.remove("transparent");
    } else {
      collapseMenu();
    }
  }

  function collapseMenu() {
    if (window.innerWidth < 601) {
      nav.classList.remove("open");
      navLinks.forEach((e) => e.classList.remove("responsive"));
      navContainer.classList.add("transparent");
    } else {
      navContainer.classList.remove("transparent");
    }
    hamburger.classList.remove("open");
    navContainer.classList.remove("large");
  }

  function toggleHamburger() {
    if (hamburger.classList.contains("open")) {
      hamburger.classList.remove("open");
    } else {
      hamburger.classList.add("open");
    }
    showHideMenu();
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
    const {
      name,
      email,
      subject,
      message,
      namedc6e35a706d68e5e7908150245876d24a6208f0f,
      emaildc6e35a706d68e5e7908150245876d24a6208f0f,
      subjectdc6e35a706d68e5e7908150245876d24a6208f0f,
      messagedc6e35a706d68e5e7908150245876d24a6208f0f,
    } = event.target;
    if (
      name.value !== "" ||
      email.value !== "" ||
      subject.value !== "" ||
      message.value !== ""
    ) {
      return;
    }
    const endpoint =
      "https://53wpstdce3.execute-api.us-east-1.amazonaws.com/default/sendEmail";
    const body = JSON.stringify({
      senderName: namedc6e35a706d68e5e7908150245876d24a6208f0f.value,
      senderEmail: emaildc6e35a706d68e5e7908150245876d24a6208f0f.value,
      subject: subjectdc6e35a706d68e5e7908150245876d24a6208f0f.value,
      message: messagedc6e35a706d68e5e7908150245876d24a6208f0f.value,
    });
    const requestOptions = {
      method: "POST",
      body,
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
          button.style.backgroundColor = "";
          form.reset();
        }
      })
      .catch((error) => {
        if (button) {
          button.value = "ERROR!";
          button.style.color = "red";
          button.style.backgroundColor = "";
          form.reset();
        }
      });
  }

  function resetSendButton() {
    sendButtons.forEach((btn) => {
      btn.value = "Send";
      btn.style.color = "";
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
      };
    } else {
      // small viewports
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
      };
    } else {
      location.href = "#contact";
    }
  }
})();
