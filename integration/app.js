let userId = null;

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    fetch("../backend/login.php", {
      method: "POST",
      body: new URLSearchParams({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
      })
    })
    .then(data => {
      if (data.status === "success") {
        showToast("Login berhasil");
        localStorage.setItem("user_id", data.user_id);
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1000);
      } else {
        showToast("Login gagal");
      }
    });
  });
}

// ABSEN
function absen() {
  userId = localStorage.getItem("user_id");

  fetch("../backend/attendance.php", {
    method: "POST",
    body: new URLSearchParams({
      user_id: userId
    })
  })
  .then(() => {
    showToast("Absen berhasil");
    loadData();
  });
}

// LOAD DATA
function loadData() {
  fetch("../backend/get_attendance.php")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      if (!list) return;

      list.innerHTML = "";

      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.username}</td>
          <td>${item.date}</td>
        `;
        list.appendChild(row);
      });
    });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

// AUTO LOAD
if (document.getElementById("list")) {
  loadData();
}