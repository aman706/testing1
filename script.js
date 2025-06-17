// DARK MODE TOGGLE
const body = document.body;
const darkModeToggle = document.getElementById("darkModeToggle");
if (localStorage.getItem("dark-mode") === "true") body.classList.add("dark");

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("dark-mode", body.classList.contains("dark"));
});

// TYPING EFFECT
const typedElement = document.getElementById("typed");
const roles = ["Web Developer", "Designer", "Solar Designer", "Dreamer", "Tech Enthusiast"];
let wordIndex = 0, charIndex = 0, typing = true;

function typeEffect() {
  const current = roles[wordIndex];
  if (typing) {
    typedElement.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      typing = false;
      setTimeout(typeEffect, 1000);
    } else {
      setTimeout(typeEffect, 100);
    }
  } else {
    typedElement.textContent = current.substring(0, charIndex--);
    if (charIndex === 0) {
      typing = true;
      wordIndex = (wordIndex + 1) % roles.length;
      setTimeout(typeEffect, 500);
    } else {
      setTimeout(typeEffect, 50);
    }
  }
}
typeEffect();

// BACK TO TOP BUTTON
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// SECURELY SEND FORM TO TELEGRAM VIA NETLIFY FUNCTION
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  fetch("/.netlify/functions/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Message sent to Telegram!");
        this.reset();
      } else {
        alert("❌ Failed to send message.");
        console.error(data.error);
      }
    })
    .catch(err => {
      alert("❌ Failed to send message. Check console for errors.");
      console.error(err);
    });
});
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
});
