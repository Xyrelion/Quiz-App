// Default sample questions for demonstration (expand these as needed)
const defaultQuestions = {
  html: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyperlinking Text Management Language"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: ["<a>", "<link>", "<href>", "<hyperlink>"],
      answer: "<a>"
    },
    {
      question: "What is the purpose of the alt attribute in images?",
      options: [
        "Provide alternative text",
        "Specify image dimensions",
        "Link to another page",
        "Style the image"
      ],
      answer: "Provide alternative text"
    }
  ],
  css: [
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Creative Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets"
      ],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Which property is used to change the background color?",
      options: ["background-color", "color", "bgcolor", "background"],
      answer: "background-color"
    },
    {
      question: "How do you select an element with id 'header'?",
      options: ["#header", ".header", "header", "*header"],
      answer: "#header"
    }
  ],
  javascript: [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      options: ["<script>", "<js>", "<scripting>", "<javascript>"],
      answer: "<script>"
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      options: [
        "alert('Hello World');",
        "msg('Hello World');",
        "msgBox('Hello World');",
        "alertBox('Hello World');"
      ],
      answer: "alert('Hello World');"
    },
    {
      question: "Which operator is used to assign a value to a variable?",
      options: ["=", "==", "===", "=>"],
      answer: "="
    }
  ]
};

// Save default questions to localStorage if not already set
if (!localStorage.getItem("quizQuestions")) {
  localStorage.setItem("quizQuestions", JSON.stringify(defaultQuestions));
}

// Load questions from storage
let questionsDB = JSON.parse(localStorage.getItem("quizQuestions"));

// Variables for quiz state
let currentSection = "";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// DOM Elements
const homePage = document.getElementById("homePage");
const quizPage = document.getElementById("quizPage");
const resultPage = document.getElementById("resultPage");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextButton = document.getElementById("nextButton");
const scoreText = document.getElementById("scoreText");
const rewardSection = document.getElementById("rewardSection");
const rewardForm = document.getElementById("rewardForm");
const restartButton = document.getElementById("restartButton");
const homeBtn = document.getElementById("homeBtn");

// Handle quiz section selection
document.querySelectorAll(".quizSelect").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentSection = btn.getAttribute("data-section");
    // Clone the questions array (if more than 25 available, you can randomize and slice)
    currentQuestions = [...questionsDB[currentSection]];
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    homePage.classList.add("hidden");
    resultPage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    showQuestion();
  });
});

function showQuestion() {
  nextButton.disabled = true;
  optionsContainer.innerHTML = "";
  if (currentQuestionIndex < currentQuestions.length) {
    const currentQ = currentQuestions[currentQuestionIndex];
    questionText.textContent = `Question ${currentQuestionIndex + 1}: ${currentQ.question}`;
    // Create a button for each option
    currentQ.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.addEventListener("click", () => {
        // Mark selected option
        Array.from(optionsContainer.children).forEach((child) =>
          child.classList.remove("selected")
        );
        btn.classList.add("selected");
        nextButton.disabled = false;
        // Store user's answer
        userAnswers[currentQuestionIndex] = option;
      });
      optionsContainer.appendChild(btn);
    });
  }
}

// Next button event
nextButton.addEventListener("click", () => {
  // Check answer and update score
  const currentQ = currentQuestions[currentQuestionIndex];
  if (userAnswers[currentQuestionIndex] === currentQ.answer) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

// Display results after quiz completion
function showResults() {
  quizPage.classList.add("hidden");
  resultPage.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${currentQuestions.length}.`;
  // Check if eligible for reward (80% or more)
  if (score / currentQuestions.length >= 0.8) {
    rewardSection.classList.remove("hidden");
  } else {
    rewardSection.classList.add("hidden");
  }
}

// Reward form submission (simulate saving details)
rewardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const whatsapp = document.getElementById("whatsapp").value;
  const bankAccount = document.getElementById("bankAccount").value;
  alert(
    `Thank you! Details submitted:\nWhatsApp: ${whatsapp}\nBank Account: ${bankAccount}\nYou will receive ₦1,000 soon!`
  );
  rewardForm.reset();
});

// Restart button goes back to home page
restartButton.addEventListener("click", () => {
  resultPage.classList.add("hidden");
  homePage.classList.remove("hidden");
});

// Home button to return to section selection at any time
homeBtn.addEventListener("click", () => {
  quizPage.classList.add("hidden");
  resultPage.classList.add("hidden");
  homePage.classList.remove("hidden");
});