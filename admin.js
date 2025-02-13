// Load questionsDB from localStorage
let questionsDB = JSON.parse(localStorage.getItem("quizQuestions"));

// DOM Elements for Admin Panel
const sectionSelect = document.getElementById("sectionSelect");
const questionList = document.getElementById("questionList");
const addQuestionForm = document.getElementById("addQuestionForm");

function renderQuestionList() {
  questionList.innerHTML = "";
  const selectedSection = sectionSelect.value;
  const questions = questionsDB[selectedSection];
  if (questions && questions.length > 0) {
    questions.forEach((q, index) => {
      const qDiv = document.createElement("div");
      qDiv.classList.add("question-item");
      qDiv.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question} 
        <br><em>Answer:</em> ${q.answer} 
        <button data-index="${index}" class="deleteBtn">Delete</button>`;
      questionList.appendChild(qDiv);
    });
  } else {
    questionList.textContent = "No questions available in this section.";
  }
}

// Listen for section change
sectionSelect.addEventListener("change", renderQuestionList);

// Initial render
renderQuestionList();

// Handle deletion of a question
questionList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const index = e.target.getAttribute("data-index");
    const selectedSection = sectionSelect.value;
    questionsDB[selectedSection].splice(index, 1);
    localStorage.setItem("quizQuestions", JSON.stringify(questionsDB));
    renderQuestionList();
  }
});

// Handle adding a new question
addQuestionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const section = document.getElementById("questionSection").value;
  const questionTextInput = document.getElementById("questionTextInput").value;
  const optionsInput = document.getElementById("optionsInput").value;
  const correctAnswerInput = document.getElementById("correctAnswerInput").value;

  // Convert comma-separated options into an array
  const options = optionsInput.split(",").map(opt => opt.trim());

  const newQuestion = {
    question: questionTextInput,
    options: options,
    answer: correctAnswerInput.trim()
  };

  // Add the new question to the selected section array
  if (!questionsDB[section]) {
    questionsDB[section] = [];
  }
  questionsDB[section].push(newQuestion);
  localStorage.setItem("quizQuestions", JSON.stringify(questionsDB));
  addQuestionForm.reset();
  // If the added question is for the currently selected section, re-render the list
  if (section === sectionSelect.value) {
    renderQuestionList();
  }
  alert("New question added successfully!");
});