'use strict';

// selecting elements

const startEl = document.getElementById('start');

const startBtn = document.getElementById('start-btn');

const infoSec = document.getElementById('info-section');

const exitBtn = document.getElementById('exit-btn');

const continueBtn = document.getElementById('continue-btn');

const questionEl = document.getElementById('question-section');

const QuestEl = document.getElementById('question-sec');

const timeCount = document.getElementById('time-sec');

const timeText = document.getElementById('time-left-txt');

const optionList = document.getElementById('option-sec');

const nextBtn = document.getElementById('next-que');

const resultSection = document.getElementById('result');

const QuestionNumber = document.getElementById('question-number');

const resultText = document.getElementById('result-para');

const quitBtn = document.getElementById('quit-quiz');

const restartBtn = document.getElementById('restart');
// console.log(timeText);

// golbal variables
let questionCount = 0;

let userScore = 0;

let queNum = 1;

let counter;

let timeValue = 15;

// init function

function init() {
  startEl.classList.add('activate');
}

init();

// start section to info section

startBtn.addEventListener('click', () => {
  startEl.classList.remove('activate');
  infoSec.classList.add('activate');
});

// info to starting section
exitBtn.addEventListener('click', () => {
  infoSec.classList.remove('activate');
  startEl.classList.add('activate');
});

// player will continue the game

continueBtn.addEventListener('click', () => {
  infoSec.classList.remove('activate');
  questionEl.classList.add('activate');

  showQuestion(0);

  queCounter(queNum);

  startTimer(15);
  // questionCounter(1);
});

// next button

nextBtn.addEventListener('click', () => {
  if (questionCount < questions.length - 1) {
    console.log(questionCount);
    console.log(true);

    questionCount++;
    queNum++;

    console.log(questionCount);
    showQuestion(questionCount);
    queCounter(queNum);
    clearInterval(counter);

    startTimer(15);
  } else {
    console.log(false);
    clearInterval(counter);
    showResult();
  }

  // startTimer(15);
  // questionCounter(1);
});
// quit button
quitBtn.addEventListener('click', () => {
  window.location.reload();
});

// restart button

restartBtn.addEventListener('click', () => {
  console.log(questionCount);
  questionCount = 0;
  queNum = 1;

  userScore = 0;

  timeValue = 15;

  counter;
  resultSection.classList.remove('activate');

  questionEl.classList.add('activate');

  showQuestion(questionCount);
  queCounter(queNum);
  clearInterval(counter);
  startTimer(timeValue);
});

// functions
// show questiob function
function showQuestion(index) {
  // console.log(index);
  let queTag = `<span>${questions[index].numb}.${questions[index].question}</span>`;

  // console.log(questions[index].numb);

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
          <div class="option"><span>${questions[index].options[1]}</span></div>
          <div class="option"><span>${questions[index].options[2]}</span></div>
          <div class="option"><span>${questions[index].options[3]}</span></div>`;

  const optionEl = document.getElementById('option-sec');

  optionEl.innerHTML = optionTag;

  const option = document.querySelectorAll('.option');

  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');

    // console.log(this);
  }
  // console.log(option);

  QuestEl.innerHTML = queTag;
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// selecting the option function
function optionSelected(answer) {
  console.log(answer);
  // console.log(answer);
  clearInterval(counter);

  let userAnswer = answer.textContent;

  let correctAnswer = questions[questionCount].answer;

  const allOption = optionList.children.length;

  // validating the answer
  let answerOption = answer;
  // console.log(answer);

  if (userAnswer == correctAnswer) {
    console.log(`correct answer`);
    userScore += 1;

    clearInterval(counter);

    answer.classList.add('correct');
    answer.insertAdjacentHTML('beforeend', tickIconTag);

    console.log(answer);
  } else {
    // console.log(allOption);

    clearInterval(counter);

    // console.log(`wrong answer`);
    answer.classList.add('incorrect');
    answer.insertAdjacentHTML('beforeend', crossIconTag);
    // console.log(`auto selected`);

    // console.log(allOption);

    for (let i = 0; i < allOption; i++) {
      // console.log(`hiii`);
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute('class', 'option correct');

        optionList.children[i].insertAdjacentHTML('beforeend', tickIconTag);

        console.log(`auto selected answer`);
      }
    }
  }
  for (let i = 0; i < allOption; i++) {
    console.log(`disbaled`);
    optionList.children[i].classList.add('disabled');

    console.log(`pointer events none`);
  }
}

// time function

function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    timeCount.textContent = time;
    time--;

    if (time < 10) {
      time = `0` + time;
    }
    if (time < 1) {
      clearInterval(counter);
      timeText.textContent = `Time off`;

      const allOption = optionList.children.length;

      for (let i = 0; i < allOption; i++) {
        let correctAnswer = questions[questionCount].answer;
        console.log(`hiii`);
        if (optionList.children[i].textContent == correctAnswer) {
          optionList.children[i].setAttribute('class', 'option correct');

          optionList.children[i].insertAdjacentHTML('beforeend', tickIconTag);

          console.log(`auto selected answer`);
        }
      }
    }
  }
}

// result function

function showResult() {
  questionEl.classList.remove('activate');
  resultSection.classList.add('activate');

  if (userScore > 8) {
    resultText.innerHTML = `<span>
    you have completed this quiz! <br />
    <span>and congrats! 🎉, You got ${userScore} out of 10</span>
  </span>;`;
  } else if (userScore < 8 && userScore > 5) {
    resultText.innerHTML = `<span>
    you have completed this quiz! <br />
    <span>and nice 😎, You got ${userScore} out of ${questions.length}</span>
  </span>;`;
  } else {
    resultText.innerHTML = `<span>
    you have completed this quiz! <br />
    <span>sorry 😐, You got only ${userScore} out of ${questions.length}</span>
  </span>;`;
  }
}

//

function queCounter(index) {
  QuestionNumber.innerText = `${index}`;
}

init();
