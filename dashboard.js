const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});
modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";
  }
});

//DASHBOARD JAVASCRIPT

// DASHBOARD DETAILS JS NAVBAR

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
          alert("Logged out");
          localStorage.removeItem("id");
          window.location.href = "./login.html";
        });
      }
    });
} else {
  window.location.href = "./login.html";
}

//DASHBOARD DETAILS RIGHT JS
const advices = [
  "Follow a balanced diet, exercise regularly, and maintain a healthy weight ,Get regular check-ups and monitor your cholesterol, blood pressure, and other risk factors.Quit smoking and limit alcohol intake to reduce cardiovascular risks.",
  "Make nutritious food choices, exercise regularly, and manage stress effectively.Monitor your cholesterol and blood pressure, and discuss any concerns with your healthcare provider.Reduce or eliminate smoking, limit alcohol consumption, and maintain a healthy weight to mitigate potential risks.",
  "Continue to eat a balanced diet, engage in regular physical activity, and prioritize overall well-being.Monitor your cholesterol and blood pressure periodically, even if your risk is low.Avoid smoking, limit alcohol intake, and practice stress management techniques for optimal heart health.",
];
const userId = JSON.parse(localStorage.getItem("id"));
if (userId) {
  fetch(`http://localhost:5502/mydata/${userId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      const name = document.getElementById("name");
      name.innerText = data.name;
      const image12 = document.getElementById("image12");
      image12.src = data.profile_picture;
      const age = document.getElementById("age");
      age.innerText = `Age : ${data.age}`;
      const gender = document.getElementById("gender");
      // gender.innerText = data.gender.substring(0, 1).toUpperCase();
      gender.className =
        data.gender == "male" ? "fa-solid fa-mars" : "fa-solid fa-venus";
      const height = document.getElementById("height");
      height.innerText = data.height;
      const weight = document.getElementById("weight");
      weight.innerText = data.weight;
      const bpm = document.getElementById("bpm");
      bpm.innerText = data.bpm;
      const smoker = document.getElementById("smokerValue");
      smoker.className = data.smoker
        ? "fa-solid fa-check"
        : "fa-solid fa-xmark";
      smoker.style.color = "white";
      const cholesterol = document.getElementById("cholesterol");
      cholesterol.innerText = data.cholesterol;
      const systolic = document.getElementById("systolic");
      systolic.innerText = data.systolic;
      const diastolic = document.getElementById("diastolic");
      diastolic.innerText = data.diastolic;
      const result = predictHeartDisease(data);
      const cat = document.getElementById("riskCategory");
      const advice = document.getElementById("advice");
      if (result.riskCategory == "High") {
        advice.innerText = advices[0];
      } else if (result.riskCategory == "Moderate") {
        advice.innerText = advices[1];
      } else if (result.riskCategory == "Low") {
        advice.innerText = advices[2];
      }
      cat.innerText = `${result.riskCategory} RISK`;
      let circularProgress = document.querySelector(".circular-progress"),
        progressValue = document.querySelector(".progress-value");
      let progressStartValue = 0,
        progressEndValue = result.heartDiseaseRisk,
        speed = 30;

      let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        if (progressStartValue >= 51) {
          circularProgress.style.background = `conic-gradient(rgb(255, 0, 0) ${
            progressStartValue * 3.6
          }deg, #ededed 0deg)`;
          progressValue.style.color = "rgb(255, 0, 0)";
        } else {
          circularProgress.style.background = `conic-gradient(#006bff ${
            progressStartValue * 3.6
          }deg, #ededed 0deg)`;
          progressValue.style.color = "#006bff";
        }
        if (progressStartValue == progressEndValue) {
          clearInterval(progress);
        }
      }, speed);
      // const logbutton = document.getElementsByClassName("logout")[0];
      // logbutton.addEventListener("click", () => {
      //   localStorage.removeItem("token");
      //   window.location.href = "./login.html";
      // });
    });
} else {
  window.location.href = "./login.html";
}

function predictHeartDisease(data) {
  const age = data.age;
  const gender = data.gender.toLowerCase();
  const weight = data.weight;
  const height = data.height;
  const bpm = data.bpm;
  const smoker = data.smoker;
  const cholesterol = data.cholesterol;
  const systolicBP = data.systolic;
  const diastolicBP = data.diastolic;

  let heartDiseaseRisk = 0;

  // Age
  if (age >= 30 && age <= 35) {
    heartDiseaseRisk += 1;
  } else if (age >= 36 && age <= 39) {
    heartDiseaseRisk += 2;
  } else if (age >= 40 && age <= 44) {
    heartDiseaseRisk += 3;
  } else if (age >= 45 && age <= 49) {
    heartDiseaseRisk += 4;
  } else if (age >= 50 && age <= 55) {
    heartDiseaseRisk += 5;
  } else if (age >= 56 && age <= 60) {
    heartDiseaseRisk += 6;
  } else {
    heartDiseaseRisk += 7;
  }

  // Gender
  if (gender === "male") {
    heartDiseaseRisk += 1;
  }

  // Body Mass Index (BMI)
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi >= 25 && bmi <= 29.9) {
    heartDiseaseRisk += 1;
  } else if (bmi >= 30 && bmi <= 35) {
    heartDiseaseRisk += 2;
  } else if (bmi >= 30) {
    heartDiseaseRisk += 3;
  } else {
    heartDiseaseRisk += 3;
  }

  // Resting Heart Rate
  if (bpm >= 76 && bpm <= 85) {
    heartDiseaseRisk += 1;
  }
  if (bpm >= 85 && bpm <= 100) {
    heartDiseaseRisk += 2;
  }
  if (bpm >= 100) {
    heartDiseaseRisk += 3;
  } else {
    heartDiseaseRisk += 4;
  }

  // Smoking
  if (smoker) {
    heartDiseaseRisk += 2;
  }

  // Cholesterol
  if (cholesterol >= 200 && cholesterol <= 239) {
    heartDiseaseRisk += 1;
  } else {
    heartDiseaseRisk += (cholesterol - 200) / 40 + 1;
  }

  // Blood Pressure
  if (systolicBP >= 120 && systolicBP <= 129 && diastolicBP < 80) {
    heartDiseaseRisk += 1;
  } else if (
    (systolicBP >= 130 && systolicBP <= 139) ||
    (diastolicBP >= 80 && diastolicBP <= 89)
  ) {
    heartDiseaseRisk += 2;
  } else if (
    (systolicBP >= 140 && systolicBP <= 149) ||
    (diastolicBP >= 90 && diastolicBP <= 99)
  ) {
    heartDiseaseRisk += 2;
  } else {
    heartDiseaseRisk += 3;
  }

  // // Calculate probability
  // const probability = 100 * (1 - 0.98767 ** heartDiseaseRisk);
  // Predict the risk category
  let riskCategory;
  if (heartDiseaseRisk <= 10) {
    riskCategory = "Low";
  } else if (heartDiseaseRisk <= 20) {
    riskCategory = "Moderate";
  } else {
    riskCategory = "High";
  }
  heartDiseaseRisk *= 10;
  if (heartDiseaseRisk > 95) {
    heartDiseaseRisk = 95;
  }
  return { riskCategory, heartDiseaseRisk };
}
