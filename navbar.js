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
