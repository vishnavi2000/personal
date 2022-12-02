const form = document.getElementById("googleForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const message = document.getElementById("message"); 

const setSuccess = (element) => {
  const inputElement = element.parentElement.querySelector(".form-control");
  const errorDisplay = element.parentElement.querySelector(".form-error");
  errorDisplay.innerText = "";
  inputElement.classList.add("success");
  inputElement.classList.remove("error");
};

const setError = (element, message) => {
  const inputElement = element.parentElement.querySelector(".form-control");
  const errorDisplay = element.parentElement.querySelector(".form-error");
  errorDisplay.innerText = message;
  inputElement.classList.add("error");
  inputElement.classList.remove("success");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInput = () => {
  const nameValue = fullname.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();
  if (nameValue === "") {
    setError(fullname, "Full name is required");
  } else {
    setSuccess(fullname);
  }
  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }
  if (messageValue === "") {
    setError(message, "Message is required");
  } else {
    setSuccess(message);
  }
};

const onSubmitForm = (e) => {
  e.preventDefault();
  validateInput();
  if (!email.classList.contains("error")) {
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbzNVcP-hnAfq0waQEPXZRKsuKCnDQ0TRAshTI6dz3_k9qQf8ee0sWjDagihXEzSwa3T/exec",
      data: $("#googleForm").serialize(),
      method: "post",
      success: function (response) {
        alert("Form submitted successfully");
        window.location.reload();
      },
      error: function (err) {
        alert("Something Went Wrong");
      },
    });
  }
};

form.addEventListener("submit", onSubmitForm);
