const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const Redis = require("ioredis");
const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost", // Use the REDIS_HOST environment variable
  port: 6379,
  password: process.env.REDIS_PASS || null,
});
const bodyParser = require("body-parser");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));

// Store game state in Redis
const gameData = {
  questions: [
    { question: "What's the nickname I saved you in my phone?", answer: "Sob" },
    { question: "When is my birthday?", answer: "27" },
    { question: "When is your birthday?", answer: "9" },
    { question: "How many times did we video call?", answer: "2" },
    { question: "How many times have I told you a deep secret?", answer: "1" },
    { question: "How many songs have I sent you?", answer: "15" },
    { question: "What band did we first talk about?", answer: "127" },
    { question: "What day did we start our journey?", answer: "29 november" },
    { question: "How many times have I said 'I love you'?", answer: "19" },
  ],
};

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/start", async (req, res) => {
  await redis.set("game_stage", 0);
  res.redirect("/game");
});

app.get("/game", async (req, res) => {
  let stage = await redis.get("game_stage");
  stage = parseInt(stage);
  if (stage >= gameData.questions.length) {
    return res.redirect("/win"); // Redirect to /win when all stages are cleared
  }
  res.render("game", { stage, question: gameData.questions[stage].question });
});

app.post("/answer", async (req, res) => {
  let stage = await redis.get("game_stage");
  stage = parseInt(stage);

  if (
    req.body.answer.trim().toLowerCase() ===
    gameData.questions[stage].answer.toLowerCase()
  ) {
    // Store the number for the current stage
    const number = gameData.questions[stage].answer.match(/\d+/)?.[0]; // Extract numbers from the answer
    if (number) {
      await redis.lpush("collected_numbers", number); // Store in a Redis list
    }

    stage++;
    await redis.set("game_stage", stage);
  }
  res.redirect("/game");
});

app.get("/win", async (req, res) => {
  const numbers = await redis.lrange("collected_numbers", 0, -1); // Retrieve collected numbers
  res.render("win", { numbers: numbers.map(Number) }); // Pass numbers to the template
});

app.get("/get-numbers", async (req, res) => {
  const numbers = await redis.lrange("collected_numbers", 0, -1); // Retrieve all numbers
  res.json(numbers.map(Number)); // Convert to numbers and send as JSON
});

app.listen(3000, () => console.log("Game server running on port 3000"));
