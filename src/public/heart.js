document.addEventListener("DOMContentLoaded", async () => {
  const canvas = document.getElementById("heartCanvas");
  const ctx = canvas.getContext("2d");

  // Fetch collected numbers from Redis via an API endpoint
  const response = await fetch("/get-numbers");
  const numbers = await response.json();

  // Draw the heart using the numbers
  drawHeart(ctx, numbers);
});

function drawHeart(ctx, numbers) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  // Use the numbers to scale or adjust the heart
  const scaleX = numbers[0] / 27; // Scale based on the first number
  const scaleY = numbers[1] / 9; // Scale based on the second number

  for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
    const x = 16 * Math.pow(Math.sin(t), 3) * scaleX;
    const y =
      (13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)) *
      scaleY;

    // Scale and position the heart
    const scaledX = x * 5 + canvas.width / 2;
    const scaledY = -y * 5 + canvas.height / 2;

    if (t === 0) {
      ctx.moveTo(scaledX, scaledY);
    } else {
      ctx.lineTo(scaledX, scaledY);
    }
  }

  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.stroke();
}
