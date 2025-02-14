// This script will handle the front-end game logic, like drawing the heart graph.
window.onload = function () {
  const canvas = document.getElementById("heartCanvas");
  const ctx = canvas.getContext("2d");
  let t = 0;
  const points = [];

  function heartEquation(t) {
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    return { x: x * 10, y: -y * 10 };
  }

  function drawHeart() {
    if (t > Math.PI * 2) return;

    let point = heartEquation(t);
    points.push(point);
    t += 0.05;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });

    ctx.stroke();
    requestAnimationFrame(drawHeart);
  }

  drawHeart();
};
