var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var nextButton = document.getElementById("next-button");
const id = JSON.parse(localStorage.getItem("id"));
if (id) {
  fetch("http://localhost:5502/mydata", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((login) => {
      const user = login.find((item) => item.id === id);
      if (user) {
        const name = document.getElementsByClassName("name")[0];
        name.innerText = user.name;
        const image = document.getElementsByClassName("image")[0];
        image.getElementsByTagName("img")[0].src = user.profile_picture;

        const logbutton = document.getElementsByClassName("logout")[0];
        logbutton.addEventListener("click", () => {
          localStorage.removeItem("id");
          window.location.href = "./login.html";
        });
      }
    });
} else {
  window.location.href = "./login.html";
}
fetch("http://localhost:5502/mydata", {
  method: "GET",
})
  .then((res) => res.json())
  .then((login) => {
    const user = login.find((item) => item.id === id);
    if (user) {
      var name = document.getElementById("name");
      name.value = user.name;
      var email = document.getElementById("email");
      email.value = user.email;

      var password = document.getElementById("password");
      password.value = user.password;
      var profile_picture = document.getElementById("profile-picture");
      profile_picture.value = user.profile_picture;
      var age = document.getElementById("age");
      age.value = user.age;
      var gender = document.querySelector('input[name="gender"]:checked');

      var weight = document.getElementById("weight");
      weight.value = weight;
      var height = document.getElementById("height");
      height.value = user.height;
      var bpm = document.getElementById("bpm");
      bpm.value = user.bpm;
      var smoker = document.getElementById("smoker");
      var cholesterol = document.getElementById("cholesterol");
      cholesterol.value = user.cholesterol;
      var systolic = document.getElementById("systolic");
      systolic.value = user.systolic;
      var diastolic = document.getElementById("diastolic");
      diastolic.value = diastolic;
    }
  });

nextButton.addEventListener("click", function () {
  if (validateForm(form1)) {
    form1.style.display = "none";
    form2.style.display = "block";
  }
});

form2.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validateForm(form2)) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
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

    fetch(`http://localhost:5502/mydata/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        if (response.ok) {
          alert("update Successful!");
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
