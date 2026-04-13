// ──────────────────────────────────────────
//  Quiz Data
// ──────────────────────────────────────────
const questions = [
  {
    question: "What is the primary focus of transitioning from experimentation to implementation of AI in financial practices?",
    answers: [
      "Creating sporadic AI usage",
      "Developing consistent workflows",
      "Enhancing trial and error methods"
    ],
    correct: 1,
    explanation: "Moving from experimentation to implementation means establishing repeatable, consistent workflows that integrate AI reliably into day-to-day financial processes."
  },
  {
    question: "Which of the following best describes a key benefit of AI-assisted financial analysis?",
    answers: [
      "Eliminating the need for human oversight",
      "Processing large datasets faster with reduced manual effort",
      "Replacing regulatory compliance requirements"
    ],
    correct: 1,
    explanation: "AI excels at processing and synthesising large volumes of data rapidly, freeing advisers to focus on higher-value client interactions while reducing manual data work."
  },
  {
    question: "When integrating AI tools into client-facing workflows, what is the most important consideration?",
    answers: [
      "Using the most advanced model available",
      "Ensuring outputs are reviewed and validated by a qualified professional",
      "Automating all client communications"
    ],
    correct: 1,
    explanation: "AI outputs must always be reviewed by a qualified professional before reaching clients. Accuracy, compliance, and client trust depend on human accountability."
  },
  {
    question: "What does 'prompt engineering' refer to in the context of AI tools?",
    answers: [
      "Writing code to build AI models",
      "Crafting inputs to guide AI outputs effectively",
      "Designing the visual interface of an AI product"
    ],
    correct: 1,
    explanation: "Prompt engineering is the practice of structuring your questions and instructions to an AI system to obtain more accurate, relevant, and useful responses."
  },
  {
    question: "Which risk is most associated with relying solely on AI-generated financial advice without human review?",
    answers: [
      "Increased processing speed",
      "Model hallucinations producing incorrect information",
      "Improved regulatory compliance"
    ],
    correct: 1,
    explanation: "AI models can 'hallucinate' — generating plausible-sounding but factually incorrect content. Human review is essential to catch these errors before they reach clients."
  },
  {
    question: "How should financial professionals approach data privacy when using AI tools?",
    answers: [
      "Share all client data freely to improve AI accuracy",
      "Anonymise or avoid inputting sensitive client information into third-party AI tools",
      "Use AI tools only for internal reporting"
    ],
    correct: 1,
    explanation: "Sensitive client data must be protected. Best practice is to anonymise data or avoid inputting personally identifiable information into AI tools not covered by appropriate data agreements."
  },
  {
    question: "What is a 'Continuing Professional Development (CPD)' activity in the context of AI adoption?",
    answers: [
      "A one-time onboarding session for new software",
      "Ongoing structured learning to build and maintain AI competency",
      "A government-mandated AI certification exam"
    ],
    correct: 1,
    explanation: "CPD in AI adoption means continuously updating your skills and knowledge as tools evolve — through structured activities such as courses, workshops, reading, and reflective practice."
  },
  {
    question: "Which statement best reflects responsible AI use in financial services?",
    answers: [
      "AI should make all final decisions to remove human bias",
      "AI is a tool that augments professional judgement, not a replacement for it",
      "AI adoption removes the need for ongoing training"
    ],
    correct: 1,
    explanation: "AI is most effective as an augmentation tool — enhancing the speed and quality of professional decision-making while keeping qualified humans accountable for all final decisions."
  }
];

// ──────────────────────────────────────────
//  State
// ──────────────────────────────────────────
let current = 0;
let selected = new Array(questions.length).fill(null);
let answered = new Array(questions.length).fill(false);

// ──────────────────────────────────────────
//  Initialise
// ──────────────────────────────────────────
function init() {
  document.getElementById("total-q").textContent = questions.length;
  renderQuestion();
}

// ──────────────────────────────────────────
//  Render
// ──────────────────────────────────────────
function renderQuestion() {
  const q = questions[current];
  const LETTERS = ["A", "B", "C", "D", "E"];

  // Header
  document.getElementById("current-q").textContent = current + 1;
  document.getElementById("progress-fill").style.width =
    ((current + 1) / questions.length * 100) + "%";

  // Question
  document.getElementById("q-number").textContent = `Question ${current + 1}`;
  document.getElementById("q-text").textContent = q.question;

  // Answers
  const container = document.getElementById("answers");
  container.innerHTML = "";

  q.answers.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.dataset.index = i;
    btn.onclick = () => selectAnswer(i);

    // State classes
    if (answered[current]) {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add("correct");
      if (i === selected[current] && i !== q.correct) btn.classList.add("incorrect");
    } else if (selected[current] === i) {
      btn.classList.add("selected");
    }

    btn.innerHTML = `
      <span class="answer-letter">${LETTERS[i]}</span>
      <span class="answer-text">${text}</span>
    `;
    container.appendChild(btn);
  });

  // Feedback
  const fb = document.getElementById("feedback-box");
  const fbIcon = document.getElementById("feedback-icon");
  const fbText = document.getElementById("feedback-text");

  if (answered[current]) {
    fb.classList.remove("hidden", "correct-fb", "incorrect-fb");
    const isCorrect = selected[current] === q.correct;
    fb.classList.add(isCorrect ? "correct-fb" : "incorrect-fb");
    fbIcon.textContent = isCorrect ? "✓" : "✗";
    fbText.textContent = q.explanation;
  } else {
    fb.classList.add("hidden");
    fb.classList.remove("correct-fb", "incorrect-fb");
  }

  // Buttons
  document.getElementById("btn-prev").disabled = current === 0;

  const nextBtn = document.getElementById("btn-next");
  const isLast = current === questions.length - 1;

  if (isLast) {
    nextBtn.innerHTML = `Submit <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    nextBtn.disabled = !answered[current];
  } else {
    nextBtn.innerHTML = `Next <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    nextBtn.disabled = !answered[current];
  }
}

// ──────────────────────────────────────────
//  Interactions
// ──────────────────────────────────────────
function selectAnswer(index) {
  if (answered[current]) return;

  selected[current] = index;
  answered[current] = true;

  renderQuestion();
}

function nextQuestion() {
  if (!answered[current]) return;

  if (current === questions.length - 1) {
    showResults();
    return;
  }

  current++;
  renderQuestion();
}

function prevQuestion() {
  if (current === 0) return;
  current--;
  renderQuestion();
}

// ──────────────────────────────────────────
//  Results
// ──────────────────────────────────────────
function showResults() {
  const correct = selected.reduce((sum, ans, i) => {
    return sum + (ans === questions[i].correct ? 1 : 0);
  }, 0);
  const total = questions.length;
  const pct = Math.round((correct / total) * 100);

  const overlay = document.getElementById("results-overlay");
  overlay.classList.remove("hidden");

  document.getElementById("results-icon").textContent = pct >= 75 ? "🎉" : pct >= 50 ? "📚" : "💡";
  document.getElementById("results-title").textContent =
    pct >= 75 ? "Well done!" : pct >= 50 ? "Good effort!" : "Keep learning!";
  document.getElementById("results-score").textContent = `${pct}%`;
  document.getElementById("results-message").textContent =
    pct >= 75
      ? `You answered ${correct} out of ${total} questions correctly. Great work on this CPD activity!`
      : `You answered ${correct} out of ${total} questions correctly. Review the explanations to strengthen your understanding.`;

  document.getElementById("results-breakdown").innerHTML = `
    <div class="breakdown-item">
      <span class="breakdown-num green">${correct}</span>
      <span class="breakdown-lbl">Correct</span>
    </div>
    <div class="breakdown-item">
      <span class="breakdown-num red">${total - correct}</span>
      <span class="breakdown-lbl">Incorrect</span>
    </div>
    <div class="breakdown-item">
      <span class="breakdown-num">${total}</span>
      <span class="breakdown-lbl">Total</span>
    </div>
  `;
}

function restartQuiz() {
  current = 0;
  selected = new Array(questions.length).fill(null);
  answered = new Array(questions.length).fill(false);
  document.getElementById("results-overlay").classList.add("hidden");
  renderQuestion();
}

// ──────────────────────────────────────────
//  Keyboard Navigation
// ──────────────────────────────────────────
document.addEventListener("keydown", (e) => {
  const LETTERS = { a: 0, b: 1, c: 2, d: 3 };
  const key = e.key.toLowerCase();

  if (key in LETTERS) {
    const idx = LETTERS[key];
    if (idx < questions[current].answers.length && !answered[current]) {
      selectAnswer(idx);
    }
  } else if (e.key === "ArrowRight" || e.key === "Enter") {
    if (answered[current]) nextQuestion();
  } else if (e.key === "ArrowLeft") {
    prevQuestion();
  }
});

// ──────────────────────────────────────────
//  Start
// ──────────────────────────────────────────
init();
