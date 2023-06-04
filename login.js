const mybutton1 = document.getElementById("button");
mybutton1.addEventListener("click", () => {
  const mail = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  fetch("http://localhost:5502/mydata", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const user = data.find((el) => el.email === mail && el.password === pass);
      if (user) {
        // localStorage.setItem("token", JSON.stringify(Date.now()));
        localStorage.setItem("id", JSON.stringify(user.id));
        alert("Logged in");
        window.location.href = "./dashboard.html";
      } else {
        window.location.href = "./page1.html";
      }
    });
});
