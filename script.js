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
// 🌟 Easter Egg: Emoji Trail on Click
document.addEventListener("click", function (e) {
  const emojiList = ["✨", "💫", "🪄", "🌟", "🧠", "👾", "🚀", "🔥", "💥"];
  const emoji = document.createElement("div");

  emoji.innerHTML = emojiList[Math.floor(Math.random() * emojiList.length)];
  emoji.style.position = "absolute";
  emoji.style.left = `${e.pageX}px`;
  emoji.style.top = `${e.pageY}px`;
  emoji.style.fontSize = "20px";
  emoji.style.zIndex = "9999";
  emoji.style.pointerEvents = "none";
  emoji.style.animation = "fadeOutUp 1s ease-out forwards";
  
  document.body.appendChild(emoji);
  setTimeout(() => emoji.remove(), 1000);
});

// Add animation keyframe
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeOutUp {
  0% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-30px) scale(1.5);
  }
}`;
document.head.appendChild(style);

