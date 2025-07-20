async function loadElementWithDelay(element, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let opacity = 0;
      const interval = setInterval(() => {
        if (opacity >= 100) {
          clearInterval(interval);
          resolve();
        } else {
          opacity += 1;
          element.style.opacity = opacity / 100;
        }
      }, 10); // Adjust the interval time for smoother or faster transitions
    }, delay);
  });
}

module.exports = { loadElementWithDelay };
