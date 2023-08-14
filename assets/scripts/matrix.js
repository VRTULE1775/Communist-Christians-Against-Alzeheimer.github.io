const root = document.querySelector(":root");
const colorToggle = document.getElementById("colorToggle");
const canvas = document.getElementById("matrix-rain");
const ctx = canvas.getContext("2d");

let matrix = "abcdefghijklmnopqrstuvwxyz0123456789".split("");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const font_size = 16;
const columns = canvas.width / font_size;
const drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

let fillColor = "#0F0";

function generateContrastColor(background) {
  const r = parseInt(background.substr(1, 2), 16);
  const g = parseInt(background.substr(3, 2), 16);
  const b = parseInt(background.substr(5, 2), 16);
  
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  const contrastWhite = (luminance + 0.05) / 1.05;
  const contrastBlack = 1.05 / (luminance + 0.05);

  return contrastWhite > contrastBlack ? "#FFF" : "#000";
}


function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = fillColor;
  ctx.font = font_size + "px monospace";

  root.style.setProperty("--primary-color-light", fillColor);

  for (let i = 0; i < drops.length; i++) {
    const text = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(text, i * font_size, drops[i] * font_size);

    if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

colorToggle.addEventListener("click", () => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const contrastColor = generateContrastColor(randomColor);
  fillColor = randomColor;
  ctx.fillStyle = contrastColor;
});
