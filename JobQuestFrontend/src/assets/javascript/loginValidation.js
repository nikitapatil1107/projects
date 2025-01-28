const emailNode = document.getElementById("userEmail");

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("submitted");
    let isValid = true;

    // Reset error messages
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    // Validate email
    const email = document.getElementById("userEmail").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailNode.classList.add("error_effect");
      document.getElementById("emailError").textContent =
        "*Please enter a valid email address";
      isValid = false;
    } else {
      emailNode.classList.remove("error_effect");
    }

    // Validate password
    const password = document.getElementById("userPassword").value;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[^\w\d]).{8,}$/;
    if (!passwordRegex.test(password)) {
      document.getElementById("userPassword").classList.add("error_effect");
      document.getElementById("passwordError").textContent =
        "*Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      isValid = false;
    } else {
      document.getElementById("userPassword").classList.remove("error_effect");
    }

    if (isValid) {
      // If all fields are valid, submit the form
      event.target.submit();
    }
  });
