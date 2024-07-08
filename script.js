const quizData = [
  {
      question: "Which language runs in a web browser?",
      a: "Java",
      b: "C",
      c: "Python",
      d: "JavaScript",
      correct: "d",
  },
  {
      question: "What does CSS stand for?",
      a: "Central Style Sheets",
      b: "Cascading Style Sheets",
      c: "Cascading Simple Sheets",
      d: "Cars SUVs Sailboats",
      correct: "b",
  },
  {
      question: "What does HTML stand for?",
      a: "Hypertext Markup Language",
      b: "Hypertext Markdown Language",
      c: "Hyperloop Machine Language",
      d: "Helicopters Terminals Motorboats Lamborginis",
      correct: "a",
  },
  {
      question: "What year was JavaScript launched?",
      a: "1996",
      b: "1995",
      c: "1994",
      d: "none of the above",
      correct: "b",
  },
]

let quiz = document.getElementById('quiz')
let answerEls = document.querySelectorAll('.answer')
let questionElm = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
let submitBtn = document.getElementById('submit')
const timerElem = document.getElementById('timer')

let currentQuiz = 0
let score = 0
let timeLimit = 5
let countDown

function loadQuiz() {
  deselectAnswers()

  const currentQuizData = quizData[currentQuiz]
  questionElm.innerText = currentQuizData.question
  a_text.innerText = currentQuizData.a
  b_text.innerText = currentQuizData.b
  c_text.innerText = currentQuizData.c
  d_text.innerText = currentQuizData.d  

  clearInterval(countDown)
  startTimer()
}

function startTimer() {
  let timeLeft = timeLimit
  timerElem.innerText = timeLeft

  countDown = setInterval(() => {
      timeLeft--
      timerElem.innerText = timeLeft
      if (timeLeft === 0) {
          clearInterval(countDown)
          handleTimeout()
      }
  }, 1000)
}

function handleTimeout() {
  currentQuiz++
  if (currentQuiz < quizData.length) {
      loadQuiz()
  } else {
      endQuiz()
  }
}

function endQuiz() {
  clearInterval(countDown)
  quiz.innerHTML = `<h2>Score: ${score} / ${quizData.length}</h2>
      <button onclick="location.reload()">Reload</button>`
}

function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
  let answer
  answerEls.forEach(answerEl => {
      if (answerEl.checked) {
          answer = answerEl.id
      }
  })
  return answer
}

submitBtn.addEventListener('click', () => {
  const answer = getSelected()

  if (answer === quizData[currentQuiz].correct) {
          score++
  }

  currentQuiz++

  if (currentQuiz < quizData.length) {
      loadQuiz()
  } else {
      endQuiz()
  }
})

loadQuiz()
