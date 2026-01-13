/* ========= FORM PAGE CODE ========= */
const form = document.getElementById("idForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const name = formData.get("name");
    const father = formData.get("father");
    const course = formData.get("course");
    const photo = formData.get("photo");

    const studentId = Math.floor(100000 + Math.random() * 900000);

    if (!photo || photo.size === 0) {
      alert("Please upload a photo");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      localStorage.setItem("name", name);
      localStorage.setItem("father", father);
      localStorage.setItem("course", course);
      localStorage.setItem("id", studentId);
      localStorage.setItem("photo", reader.result);

      window.location.href = "id-card.html";
    };

    reader.readAsDataURL(photo);
  });
}

/* ========= CARD PAGE CODE ========= */
const outName = document.getElementById("outName");

if (outName) {
  const name = localStorage.getItem("name");
  const father = localStorage.getItem("father");
  const course = localStorage.getItem("course");
  const id = localStorage.getItem("id");
  const photo = localStorage.getItem("photo");

  document.getElementById("outName").innerText = name;
  document.getElementById("outFather").innerText = father;
  document.getElementById("outCourse").innerText = course;
  document.getElementById("outId").innerText = id;
  document.getElementById("outPhoto").src = photo;

  const qrData = `Name: ${name}\nFather: ${father}\nID: ${id}\nCourse: ${course}`;

  document.getElementById("qrCode").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=" +
    encodeURIComponent(qrData);
}
