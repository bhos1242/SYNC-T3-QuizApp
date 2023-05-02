// Define the quiz questions and answers
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Madrid", "Berlin", "London"],
    answer: "Paris"
  },
  {
    question: "What is the largest country in the world?",
    options: ["Russia", "Canada", "China", "USA"],
    answer: "Russia"
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yen", "Won", "Dollar", "Euro"],
    answer: "Yen"
  }
];

// Get references to DOM elements
const quiz = document.querySelector(".quiz");
const progress = document.getElementById("progress-bar");
const timer = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");

let currentQuestion = 0;
let score = 0;
let timeLeft = 60; // Set the time limit for the quiz

// Display the first question and start the timer
displayQuestion(currentQuestion);
startTimer();

// Display the current question
function displayQuestion(index) {
  const question = quizData[index];
  quiz.innerHTML = `<h2>${question.question}</h2>
                    <button class="btn">${question.options[0]}</button>
                    <button class="btn">${question.options[1]}</button>
                    <button class="btn">${question.options[2]}</button>
                    <button class="btn">${question.options[3]}</button>`;
  updateProgress();

  // Get references to the answer buttons and attach event listeners
  const options = document.querySelectorAll(".btn");
  options.forEach(option => {
    option.addEventListener("click", () => {
      // Check if the selected option is correct
      if (option.textContent === quizData[currentQuestion].answer) {
        score++;
      }

      // Move to the next question
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        displayQuestion(currentQuestion);
      } else {
        // Quiz is over, display the final score
        endQuiz();
      }
    });
  });
}

// Update the progress bar
function updateProgress() {
  progress.style.width = `${(currentQuestion / quizData.length) * 100}%`;
}

// Start the countdown timer
function startTimer() {
  const interval = setInterval(() => {
    timeLeft--;
    timer.textContent = `Time Left: ${formatTime(timeLeft)}`;
    if (timeLeft === 0) {
      clearInterval(interval);
      endQuiz();
    }
  }, 1000);
}

// End the quiz and display the final score
function endQuiz() {
  quiz.innerHTML = `<h2>Your Score: ${score}/${quizData.length}</h2>`;
  progress.style.width = "100%";
  nextBtn.style.display = "none";
}

// Format the time value as MM:SS
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${padZero(minutes)}:${padZero(seconds)}`;
}

// Pad a single digit number with a leading zero
function padZero(num) {
  return num < 10 ? `0${num}` : num;
}
