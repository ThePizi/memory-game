const loadElementWithDelay = require("./otherJS/loader");
const startButton = document.getElementById("start-button");
const character = document.getElementById("character");
const dialogBox = document.getElementById("dialog-box");
const dialogText = document.getElementById("dialog-text");
const answerBox = document.getElementById("answer-box");
const answerInput = document.getElementById("answer-input");
const submitAnswer = document.getElementById("submit-answer");
const heartCanvas = document.getElementById("heart-canvas");

let stage = 0;

// Start the game
startButton.addEventListener("click", () => {
  const element = document.getElementById("start-button");
  loadElementWithDelay(element, 1000).then(() => {
    console.log("Element has finished loading!");
  });

  fetch("/start", { method: "POST" }).then(() => {
    window.location.href = "/game";
  });
});

// Submit answer
submitAnswer.addEventListener("click", () => {
  const answer = answerInput.value.trim();
  fetch("/answer", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `answer=${encodeURIComponent(answer)}`,
  }).then(() => {
    window.location.reload(); // Refresh the page to load the next stage
  });
});

if (window.location.pathname === "/win") {
  drawHeart();
}

function drawHeart() {
  const ctx = heartCanvas.getContext("2d");
  ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
  ctx.strokeStyle = "white";
  ctx.beginPath();

  const numbers = window.numbers || [27, 9, 1, 1, 15, 127, 29, 19]; // Use collected numbers or default
  const scaleX = heartCanvas.width / 127;
  const scaleY = heartCanvas.height / 127;

  for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    ctx.lineTo(
      x * scaleX + heartCanvas.width / 2,
      -y * scaleY + heartCanvas.height / 2
    );
  }

  ctx.stroke();
}

// Usage example
const element = document.getElementById("start-button");
loadElementWithDelay(element, 1000).then(() => {
  console.log("Element has finished loading!");
});

// // Draw heart-shaped graph (for the win screen)
// function drawHeart() {
//   const ctx = heartCanvas.getContext("2d");
//   ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
//   ctx.strokeStyle = "white";
//   ctx.beginPath();

//   const numbers = [27, 9, 1, 1, 15, 127, 29, 19]; // Replace with collected numbers
//   const scaleX = heartCanvas.width / 127;
//   const scaleY = heartCanvas.height / 127;

//   for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
//     const x = 16 * Math.pow(Math.sin(t), 3);
//     const y =
//       13 * Math.cos(t) -
//       5 * Math.cos(2 * t) -
//       2 * Math.cos(3 * t) -
//       Math.cos(4 * t);
//     ctx.lineTo(
//       x * scaleX + heartCanvas.width / 2,
//       -y * scaleY + heartCanvas.height / 2
//     );
//   }

//   ctx.stroke();
// }

// // Draw heart if on the win screen
// if (window.location.pathname === "/win") {
//   drawHeart();
// }
