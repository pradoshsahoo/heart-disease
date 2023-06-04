var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var joinus = document.getElementById("joinus");
var signup = document.getElementById("signup");
var nextButton = document.getElementById("next-button");

nextButton.addEventListener("click", function () {
  if (validateForm(form1)) {
    form1.style.display = "none";
    form2.style.display = "block";
    joinus.style.display = "none";
    signup.style.display = "none";
  }
});

form2.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm(form2)) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm-password").value;
    var profile_picture = document.getElementById("profile-picture").value;
    var age = document.getElementById("age").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value;
    var bpm = document.getElementById("bpm").value;
    var smoker = document.getElementById("smoker").checked;
    var cholesterol = document.getElementById("cholesterol").value;
    var systolic = document.getElementById("systolic").value;
    var diastolic = document.getElementById("diastolic").value;

    var formData = {
      name: name,
      email: email,
      password: password,
      confirm_password: confirm_password,
      profile_picture: profile_picture,
      age: age,
      gender: gender,
      weight: weight,
      height: height,
      bpm: bpm,
      smoker: smoker,
      cholesterol: cholesterol,
      systolic: systolic,
      diastolic: diastolic,
    };

    fetch(" http://localhost:5502/mydata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        if (response.ok) {
          alert("Signup Successful!");
          // form1.reset();
          // form2.reset();
          // form1.style.display = 'block';
          // form2.style.display = 'none';
          window.location.href = "./login.html";
        } else {
          showError("An error occurred. Please try again.");
        }
      })
      .catch(function (error) {
        showError("An error occurred. Please try again.");
        console.error(error);
      });
  }
});

function validateForm(form) {
  var inputs = form.getElementsByTagName("input");

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].hasAttribute("required") && inputs[i].value === "") {
      showError("Please fill in all fields.");
      return false;
    }
  }

  if (form.id === "form1") {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return false;
    }
  }

  return true;
}

function showError(message) {
  var errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}
